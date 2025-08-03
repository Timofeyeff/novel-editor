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
const jsdom = __importStar(require("jsdom"));
const renderer = __importStar(require("../../renderer/previewRenderer"));
suite('Preview Renderer Tests', () => {
    let document;
    setup(() => {
        const dom = new jsdom.JSDOM('<html><body><div id="novel-container"></div></body></html>');
        document = dom.window.document;
        // Установка глобального document для тестов
        global.document = document;
    });
    test('should render scene with correct elements', async () => {
        const scene = {
            title: 'Библиотека',
            background: 'library.jpg',
            dialogues: [ /* данные диалога */]
        };
        await renderer.renderScene(scene);
        const titleElement = document.querySelector('.scene-title');
        assert.ok(titleElement, 'Элемент заголовка не найден');
        assert.strictEqual(titleElement.textContent, 'Библиотека');
        const bgElement = document.querySelector('.scene-bg');
        assert.ok(bgElement, 'Элемент фона не найден');
        assert.ok(bgElement.style.backgroundImage.includes('library.jpg'));
    });
    test('should handle choice selection', async () => {
        const choices = [
            { text: 'Вариант А', target: 'section-a' },
            { text: 'Вариант Б', target: 'section-b' }
        ];
        await renderer.renderChoices(choices);
        // Имитация выбора пользователя
        const choiceElement = document.querySelector('.choice:first-child');
        assert.ok(choiceElement, 'Элемент выбора не найден');
        choiceElement.click();
        assert.strictEqual(renderer.currentSection, 'section-a');
    });
});
//# sourceMappingURL=renderer.test.js.map