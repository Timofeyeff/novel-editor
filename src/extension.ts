import * as vscode from 'vscode';
import * as markdownParser from './parser/markdownParser';
import * as storyAnalyzer from './analyzer/storyAnalyzer';
import * as decorations from './utils/decorations';

export function activate(context: vscode.ExtensionContext) {
    console.log('Расширение "Novel Editor" активировано');

    // Регистрация команды для открытия предпросмотра
    let openPreviewCommand = vscode.commands.registerCommand('novel-editor.openPreview', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('Откройте файл новеллы для предпросмотра');
            return;
        }
        
        const panel = vscode.window.createWebviewPanel(
            'novelPreview',
            'Предпросмотр новеллы',
            vscode.ViewColumn.Two,
            { enableScripts: true }
        );

        // Здесь будет логика предпросмотра
        panel.webview.html = getWebviewContent(editor.document.getText());
    });

    // Регистрация команды для отображения графа сюжета
    let showStoryGraphCommand = vscode.commands.registerCommand('novel-editor.showStoryGraph', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('Откройте файл новеллы для анализа сюжета');
            return;
        }

        // Здесь будет логика анализа и отображения графа
    });

    // Активация декораторов при изменении активного редактора
    vscode.window.onDidChangeActiveTextEditor(editor => {
        if (editor) {
            activateDecorations(editor);
        }
    });

    // Активация декораторов для текущего редактора при старте
    if (vscode.window.activeTextEditor) {
        activateDecorations(vscode.window.activeTextEditor);
    }

    context.subscriptions.push(openPreviewCommand, showStoryGraphCommand);
}

export function deactivate() {}

export function activateDecorations(editor: vscode.TextEditor) {
    if (editor.document.languageId === 'markdown') {
        decorations.applyDecorations(editor);
    }
}

function getWebviewContent(markdownContent: string): string {
    // Простой вариант предпросмотра
    return `<!DOCTYPE html>
    <html lang="ru">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Предпросмотр новеллы</title>
        <style>
            body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; }
            .scene { margin-bottom: 20px; }
            .scene-title { font-size: 24px; margin-bottom: 10px; }
            .character { font-weight: bold; color: #0066cc; }
            .dialogue { margin-left: 20px; margin-bottom: 10px; }
            .choices { margin-top: 20px; }
            .choice { padding: 8px 16px; margin: 5px; background: #f0f0f0; cursor: pointer; border-radius: 4px; }
            .choice:hover { background: #e0e0e0; }
        </style>
    </head>
    <body>
        <div id="novel-container">
            <!-- Здесь будет отображаться содержимое -->
            <p>Загрузка предпросмотра...</p>
        </div>
        <script>
            // Здесь будет логика интерактивного предпросмотра
        </script>
    </body>
    </html>`;
}
