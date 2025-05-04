import * as vscode from 'vscode';

// Типы декораторов для разных элементов новеллы
const decorationTypes = {
    character: vscode.window.createTextEditorDecorationType({
        color: '#0066cc',
        fontWeight: 'bold'
    }),
    emotion: vscode.window.createTextEditorDecorationType({
        color: '#9933cc',
        fontStyle: 'italic'
    }),
    command: vscode.window.createTextEditorDecorationType({
        color: '#669900'
    }),
    choice: vscode.window.createTextEditorDecorationType({
        color: '#ff6600'
    }),
    section: vscode.window.createTextEditorDecorationType({
        color: '#663399',
        fontWeight: 'bold'
    })
};

/**
 * Применяет декорации синтаксиса к редактору
 */
export function applyDecorations(editor: vscode.TextEditor): void {
    const document = editor.document;
    if (document.languageId !== 'markdown') {
        return;
    }
    
    const text = document.getText();
    const lines = text.split('\n');
    
    const characterDecorations: vscode.DecorationOptions[] = [];
    const emotionDecorations: vscode.DecorationOptions[] = [];
    const commandDecorations: vscode.DecorationOptions[] = [];
    const choiceDecorations: vscode.DecorationOptions[] = [];
    const sectionDecorations: vscode.DecorationOptions[] = [];
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // Поиск персонажей
        const characterMatch = line.match(/^@([^\[]+)/);
        if (characterMatch) {
            const startPos = new vscode.Position(i, 0);
            const endPos = new vscode.Position(i, characterMatch[0].length);
            characterDecorations.push({
                range: new vscode.Range(startPos, endPos)
            });
        }
        
        // Поиск эмоций
        const emotionMatch = line.match(/\[emotion: ([^\]]+)\]/);
        if (emotionMatch) {
            const start = line.indexOf(emotionMatch[0]);
            const startPos = new vscode.Position(i, start);
            const endPos = new vscode.Position(i, start + emotionMatch[0].length);
            emotionDecorations.push({
                range: new vscode.Range(startPos, endPos)
            });
        }
        
        // Поиск команд
        const commandMatch = line.match(/^\[([\w-]+): (.+)\]$/);
        if (commandMatch) {
            const startPos = new vscode.Position(i, 0);
            const endPos = new vscode.Position(i, line.length);
            commandDecorations.push({
                range: new vscode.Range(startPos, endPos)
            });
        }
        
        // Поиск выборов
        const choiceMatch = line.match(/^- \[([^\]]+)\]\(#([^)]+)\)(.*)$/);
        if (choiceMatch) {
            const startPos = new vscode.Position(i, 0);
            const endPos = new vscode.Position(i, line.length);
            choiceDecorations.push({
                range: new vscode.Range(startPos, endPos)
            });
        }
        
        // Поиск секций
        const sectionMatch = line.match(/^### #([a-zA-Z0-9_-]+)$/);
        if (sectionMatch) {
            const startPos = new vscode.Position(i, 0);
            const endPos = new vscode.Position(i, line.length);
            sectionDecorations.push({
                range: new vscode.Range(startPos, endPos)
            });
        }
    }
    
    // Применяем декораторы к редактору
    editor.setDecorations(decorationTypes.character, characterDecorations);
    editor.setDecorations(decorationTypes.emotion, emotionDecorations);
    editor.setDecorations(decorationTypes.command, commandDecorations);
    editor.setDecorations(decorationTypes.choice, choiceDecorations);
    editor.setDecorations(decorationTypes.section, sectionDecorations);
}