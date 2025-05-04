interface Scene {
    title: string;
    content: string;
    startLine: number;
    endLine: number;
}

interface Command {
    type: string;
    value: string;
}

interface Dialogue {
    character: string;
    emotion?: string;
    text: string;
}

interface Choice {
    text: string;
    target: string;
    effects: Array<{variable: string; value: number}>;
}

/**
 * Анализирует текст Markdown и извлекает сцены
 */
export function parseScenes(content: string): Scene[] {
    const scenes: Scene[] = [];
    const lines = content.split('\n');
    
    let currentScene: Scene | null = null;
    let lineIndex = 0;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // Находим заголовки сцен (# Сцена: Название)
        const sceneMatch = line.match(/^# Сцена: (.+)$/);
        if (sceneMatch) {
            // Если уже была сцена, закрываем её
            if (currentScene) {
                currentScene.endLine = i - 1;
                scenes.push(currentScene);
            }
            
            // Создаём новую сцену
            currentScene = {
                title: sceneMatch[1],
                content: '',
                startLine: i,
                endLine: -1
            };
            continue;
        }
        
        // Добавляем контент к текущей сцене
        if (currentScene) {
            if (currentScene.content) {
                currentScene.content += '\n' + line;
            } else {
                currentScene.content = line;
            }
        }
    }
    
    // Добавляем последнюю сцену, если она есть
    if (currentScene) {
        currentScene.endLine = lines.length - 1;
        scenes.push(currentScene);
    }
    
    return scenes;
}

/**
 * Анализирует команду в формате [тип: значение]
 */
export function parseCommand(line: string): Command | null {
    const commandMatch = line.match(/^\[([\w-]+): (.+)\]$/);
    
    if (commandMatch) {
        return {
            type: commandMatch[1],
            value: commandMatch[2]
        };
    }
    
    return null;
}

/**
 * Анализирует диалог персонажа
 */
export function parseDialogue(text: string): Dialogue | null {
    const lines = text.split('\n');
    
    // Строка с именем персонажа: @Имя [emotion: состояние]
    const characterLine = lines[0];
    const characterMatch = characterLine.match(/^@([^\[]+)(?:\s+\[emotion: ([^\]]+)\])?/);
    
    if (characterMatch) {
        const character = characterMatch[1].trim();
        const emotion = characterMatch[2] ? characterMatch[2].trim() : undefined;
        
        // Собираем реплику персонажа из оставшихся строк
        const dialogueText = lines.slice(1).join('\n').trim();
        
        return {
            character,
            emotion,
            text: dialogueText
        };
    }
    
    return null;
}

/**
 * Анализирует строку выбора
 */
export function parseChoice(line: string): Choice | null {
    // Формат: - [Текст выбора](#секция) +1 переменная
    const choiceMatch = line.match(/^- \[([^\]]+)\]\(#([^)]+)\)(.*)$/);
    
    if (choiceMatch) {
        const text = choiceMatch[1].trim();
        const target = choiceMatch[2].trim();
        const effectsText = choiceMatch[3].trim();
        
        // Парсинг эффектов: "+1 дружба -2 страх"
        const effects: Array<{variable: string; value: number}> = [];
        const effectMatches = effectsText.matchAll(/([+-]\d+)\s+([^\s+-][^\s+-]*)/g);
        
        for (const match of effectMatches) {
            effects.push({
                value: parseInt(match[1]),
                variable: match[2].trim()
            });
        }
        
        return {
            text,
            target,
            effects
        };
    }
    
    return null;
}