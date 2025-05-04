import * as assert from 'assert';
// Удаляем неиспользуемые импорты или используем их
// import * as path from 'path';
// import * as fs from 'fs';
import * as parser from '../../parser/markdownParser';

suite('Markdown Parser Tests', () => {
    test('should correctly identify scene headers', () => {
        const content = '# Сцена: Гостиная\n\nТекст сцены.';
        const scenes = parser.parseScenes(content);
        assert.strictEqual(scenes[0].title, 'Гостиная');
    });

    test('should parse background command', () => {
        const line = '[background: library.jpg]';
        const command = parser.parseCommand(line);
        assert.deepStrictEqual(command, {type: 'background', value: 'library.jpg'});
    });

    test('should identify character dialogue', () => {
        const lines = '@Михаил [emotion: happy]\nПривет! Как у тебя дела?';
        const dialogue = parser.parseDialogue(lines);
        
        // Проверяем, что dialogue не null перед доступом к свойствам
        assert.ok(dialogue, 'Dialogue should not be null');
        assert.strictEqual(dialogue!.character, 'Михаил');
        assert.strictEqual(dialogue!.emotion, 'happy');
        assert.strictEqual(dialogue!.text, 'Привет! Как у тебя дела?');
    });

    test('should parse choices with their effects', () => {
        const choiceText = '- [Рассказать о своем дне](#section-day) +1 дружба';
        const choice = parser.parseChoice(choiceText);
        
        // Проверяем, что choice не null перед доступом к свойствам
        assert.ok(choice, 'Choice should not be null');
        assert.strictEqual(choice!.text, 'Рассказать о своем дне');
        assert.strictEqual(choice!.target, 'section-day');
        assert.deepStrictEqual(choice!.effects[0], {variable: 'дружба', value: 1});
    });
});