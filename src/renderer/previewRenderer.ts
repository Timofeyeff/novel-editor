interface Scene {
    title: string;
    background?: string;
    music?: string;
    dialogues?: any[];
}

interface Choice {
    text: string;
    target: string;
}

// Текущая секция в предпросмотре
export let currentSection: string = '';

/**
 * Рендерит сцену в предпросмотре
 */
export async function renderScene(scene: Scene): Promise<void> {
    // В реальном приложении здесь будет сложная логика рендеринга
    // Для тестов делаем упрощенную версию
    
    const container = document.createElement('div');
    container.className = 'scene';
    
    // Заголовок сцены
    const title = document.createElement('div');
    title.className = 'scene-title';
    title.textContent = scene.title;
    container.appendChild(title);
    
    // Фон
    if (scene.background) {
        const bg = document.createElement('div');
        bg.className = 'scene-bg';
        bg.style.backgroundImage = `url(${scene.background})`;
        container.appendChild(bg);
    }
    
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
export async function renderChoices(choices: Choice[]): Promise<void> {
    const container = document.createElement('div');
    container.className = 'choices';
    
    for (const choice of choices) {
        const choiceElement = document.createElement('div');
        choiceElement.className = 'choice';
        choiceElement.textContent = choice.text;
        
        // Добавляем обработчик клика для выбора
        choiceElement.addEventListener('click', () => {
            currentSection = choice.target;
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