"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentSection = void 0;
exports.renderScene = renderScene;
exports.renderChoices = renderChoices;
// Текущая секция в предпросмотре
exports.currentSection = '';
/**
 * Рендерит сцену в предпросмотре
 */
async function renderScene(scene) {
    // В реальном приложении здесь будет сложная логика рендеринга
    // Для тестов делаем упрощенную версию
    const container = document.createElement('div');
    container.className = 'scene';
    // Создание заголовка сцены
    const titleElement = document.createElement('div');
    titleElement.className = 'scene-title'; // Важно использовать правильный класс
    titleElement.textContent = scene.title;
    document.body.appendChild(titleElement);
    // Создание фонового элемента
    const bgElement = document.createElement('div');
    bgElement.className = 'scene-bg';
    bgElement.style.backgroundImage = `url(${scene.background})`;
    document.body.appendChild(bgElement);
    // Добавляем на страницу
    const novelContainer = document.getElementById('novel-container');
    if (novelContainer) {
        novelContainer.innerHTML = '';
        novelContainer.appendChild(container);
    }
    return Promise.resolve();
}
/**
 * Рендерит выборы в предпросмотре
 */
async function renderChoices(choices) {
    const container = document.createElement('div');
    container.className = 'choices';
    for (const choice of choices) {
        const choiceElement = document.createElement('div');
        choiceElement.className = 'choice';
        choiceElement.textContent = choice.text;
        // Добавляем обработчик клика для выбора
        choiceElement.addEventListener('click', () => {
            exports.currentSection = choice.target;
            // В реальном приложении здесь будет переход к соответствующей секции
        });
        container.appendChild(choiceElement);
    }
    // Добавляем на страницу
    const novelContainer = document.getElementById('novel-container');
    if (novelContainer) {
        novelContainer.appendChild(container);
    }
    return Promise.resolve();
}
//# sourceMappingURL=previewRenderer.js.map