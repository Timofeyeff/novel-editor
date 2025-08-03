"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildStoryGraph = buildStoryGraph;
exports.findDeadEnds = findDeadEnds;
exports.findUnreachableSections = findUnreachableSections;
/**
 * Создает граф истории из Markdown документа
 */
function buildStoryGraph(content) {
    const nodes = [];
    const edges = [];
    const lines = content.split('\n');
    // Временные карты для хранения информации
    const sectionMap = new Map();
    const choiceMap = new Map();
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
                }
                else {
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
function findDeadEnds(content) {
    const graph = buildStoryGraph(content);
    const issues = [];
    // Найти узлы без исходящих ребер (не являющиеся концом истории)
    const nodesWithOutgoing = new Set(graph.edges.map(e => e.source));
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
function findUnreachableSections(content) {
    const graph = buildStoryGraph(content);
    const issues = [];
    // Найти узлы без входящих рёбер (кроме начальной сцены)
    const nodesWithIncoming = new Set(graph.edges.map(e => e.target));
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
//# sourceMappingURL=storyAnalyzer.js.map