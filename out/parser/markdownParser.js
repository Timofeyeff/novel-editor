"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseScenes = parseScenes;
exports.parseCommand = parseCommand;
exports.parseDialogue = parseDialogue;
exports.parseChoice = parseChoice;
/**
 * Анализирует текст Markdown и извлекает сцены
 */
function parseScenes(content) {
    const scenes = [];
    const lines = content.split('\n');
    let currentScene = null;
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
            }
            else {
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
function parseCommand(line) {
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
function parseDialogue(text) {
    const lines = text.split('\n');
    // Строка с именем персонажа: @Имя [emotion: состояние]
    const characterLine = lines[0];
    const characterMatch = characterLine.match(/^@([^\[]+)(?:\s*\[emotion:\s*([^\]]+)\])?/);
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
function parseChoice(line) {
    // Формат: - [Текст выбора](#секция) +1 переменная
    const choiceMatch = line.match(/^- \[([^\]]+)\]\(#([^)]+)\)(.*)$/);
    if (choiceMatch) {
        const text = choiceMatch[1].trim();
        const target = choiceMatch[2].trim();
        const effectsText = choiceMatch[3].trim();
        // Парсинг эффектов: "+1 дружба -2 страх"
        const effects = [];
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
//# sourceMappingURL=markdownParser.js.map