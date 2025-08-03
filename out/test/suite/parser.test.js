"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const assert = __importStar(require("assert"));
// Удаляем неиспользуемые импорты или используем их
// import * as path from 'path';
// import * as fs from 'fs';
const parser = __importStar(require("../../parser/markdownParser"));
suite('Markdown Parser Tests', () => {
    test('should correctly identify scene headers', () => {
        const content = '# Сцена: Гостиная\n\nТекст сцены.';
        const scenes = parser.parseScenes(content);
        assert.strictEqual(scenes[0].title, 'Гостиная');
    });
    test('should parse background command', () => {
        const line = '[background: library.jpg]';
        const command = parser.parseCommand(line);
        assert.deepStrictEqual(command, { type: 'background', value: 'library.jpg' });
    });
    test('should identify character dialogue', () => {
        const lines = '@Михаил [emotion: happy]\nПривет! Как у тебя дела?';
        const dialogue = parser.parseDialogue(lines);
        // Проверяем, что dialogue не null перед доступом к свойствам
        assert.ok(dialogue, 'Dialogue should not be null');
        assert.strictEqual(dialogue.character, 'Михаил');
        assert.strictEqual(dialogue.emotion, 'happy');
        assert.strictEqual(dialogue.text, 'Привет! Как у тебя дела?');
    });
    test('should parse choices with their effects', () => {
        const choiceText = '- [Рассказать о своем дне](#section-day) +1 дружба';
        const choice = parser.parseChoice(choiceText);
        // Проверяем, что choice не null перед доступом к свойствам
        assert.ok(choice, 'Choice should not be null');
        assert.strictEqual(choice.text, 'Рассказать о своем дне');
        assert.strictEqual(choice.target, 'section-day');
        assert.deepStrictEqual(choice.effects[0], { variable: 'дружба', value: 1 });
    });
});
//# sourceMappingURL=parser.test.js.map