interface StoryNode {
    id: string;
    title: string;
    type: 'scene' | 'section';
    line: number;
}

interface StoryEdge {
    source: string;
    target: string;
    label?: string;
}

interface StoryGraph {
    nodes: StoryNode[];
    edges: StoryEdge[];
}

interface StoryIssue {
    type: 'deadEnd' | 'unreachable' | 'cycle';
    nodeId: string;
    line: number;
    message: string;
}

/**
 * Создает граф истории из Markdown документа
 */
export function buildStoryGraph(content: string): StoryGraph {
    const nodes: StoryNode[] = [];
    const edges: StoryEdge[] = [];
    const lines = content.split('\n');
    
    // Временные карты для хранения информации
    const sectionMap = new Map<string, { id: string, line: number }>();
    const choiceMap = new Map<string, { targets: string[], source: string }>(); 
    
    // Найти все сцены и секции
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Сцена
        const sceneMatch = line.match(/^# Сцена: (.+)$/);
        if (sceneMatch) {
            const title = sceneMatch[1];
            const id = `scene_${nodes.length}`;
            nodes.push({
                id,
                title,
                type: 'scene',
                line: i
            });
            continue;
        }
        
        // Секция
        const sectionMatch = line.match(/^### #([a-zA-Z0-9_-]+)$/);
        if (sectionMatch) {
            const id = sectionMatch[1];
            sectionMap.set(id, { id, line: i });
            nodes.push({
                id,
                title: id,
                type: 'section',
                line: i
            });
            continue;
        }
        
        // Ссылка выбора
        const choiceMatch = line.match(/^- \[([^\]]+)\]\(#([^)]+)\)(.*)$/);
        if (choiceMatch) {
            const target = choiceMatch[2];
            const sourceId = [...nodes].reverse().find(node => node.line < i)?.id || '';
            
            if (sourceId) {
                if (choiceMap.has(sourceId)) {
                    choiceMap.get(sourceId)?.targets.push(target);
                } else {
                    choiceMap.set(sourceId, {
                        targets: [target],
                        source: sourceId
                    });
                }
            }
        }
    }
    
    // Создать рёбра графа
    for (const [sourceId, data] of choiceMap.entries()) {
        for (const target of data.targets) {
            edges.push({
                source: sourceId,
                target,
                label: ''
            });
        }
    }
    
    return { nodes, edges };
}

/**
 * Находит "мертвые" концы в графе истории
 */
export function findDeadEnds(content: string): StoryIssue[] {
    const graph = buildStoryGraph(content);
    const issues: StoryIssue[] = [];
    
    // Найти узлы без исходящих ребер (не являющиеся концом истории)
    const nodesWithOutgoing = new Set<string>(graph.edges.map(e => e.source));
    
    for (const node of graph.nodes) {
        // Пропускаем узлы, которые имеют исходящие ребра
        if (nodesWithOutgoing.has(node.id)) {
            continue;
        }
        
        // Проверяем, не является ли это намеренный конец
        // (в будущем можно добавить специальную метку для концовок)
        issues.push({
            type: 'deadEnd',
            nodeId: node.id,
            line: node.line,
            message: `Тупик сюжета: "${node.title}" не имеет продолжения`
        });
    }
    
    return issues;
}

/**
 * Находит недостижимые секции в графе истории
 */
export function findUnreachableSections(content: string): StoryIssue[] {
    const graph = buildStoryGraph(content);
    const issues: StoryIssue[] = [];
    
    // Найти узлы без входящих рёбер (кроме начальной сцены)
    const nodesWithIncoming = new Set<string>(graph.edges.map(e => e.target));
    
    for (const node of graph.nodes) {
        // Пропускаем узлы, которые имеют входящие ребра
        if (nodesWithIncoming.has(node.id)) {
            continue;
        }
        
        // Пропускаем первую сцену
        if (node.type === 'scene' && node === graph.nodes[0]) {
            continue;
        }
        
        issues.push({
            type: 'unreachable',
            nodeId: node.id,
            line: node.line,
            message: `Недостижимая секция: "${node.title}" не имеет входящих связей`
        });
    }
    
    return issues;
}