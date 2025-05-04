import * as assert from 'assert';
import * as jsdom from 'jsdom';
import * as renderer from '../../renderer/previewRenderer';

suite('Preview Renderer Tests', () => {
    let document: Document;
    
    setup(() => {
        const dom = new jsdom.JSDOM('<html><body></body></html>');
        document = dom.window.document;
        // Установка глобального document для тестов
        (global as any).document = document;
    });
    
    test('should render scene with correct elements', async () => {
        const scene = {
            title: 'Библиотека', 
            background: 'library.jpg',
            dialogues: [/* данные диалога */]
        };
        
        await renderer.renderScene(scene);
        
        const titleElement = document.querySelector('.scene-title');
        assert.ok(titleElement, 'Элемент заголовка не найден');
        assert.strictEqual(titleElement!.textContent, 'Библиотека');
        
        const bgElement = document.querySelector('.scene-bg');
        assert.ok(bgElement, 'Элемент фона не найден');
        assert.ok((bgElement as HTMLElement).style.backgroundImage.includes('library.jpg'));
    });
    
    test('should handle choice selection', async () => {
        const choices = [
            {text: 'Вариант А', target: 'section-a'},
            {text: 'Вариант Б', target: 'section-b'}
        ];
        
        await renderer.renderChoices(choices);
        
        // Имитация выбора пользователя
        const choiceElement = document.querySelector('.choice:first-child');
        assert.ok(choiceElement, 'Элемент выбора не найден');
        (choiceElement as HTMLElement).click();
        
        assert.strictEqual(renderer.currentSection, 'section-a');
    });
});