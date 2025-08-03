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
exports.activate = activate;
exports.deactivate = deactivate;
exports.activateDecorations = activateDecorations;
const vscode = __importStar(require("vscode"));
const decorations = __importStar(require("./utils/decorations"));
function activate(context) {
    console.log('Расширение "Novel Editor" активировано');
    // Регистрация команды для открытия предпросмотра
    let openPreviewCommand = vscode.commands.registerCommand('noveleditor.openPreview', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('Откройте файл новеллы для предпросмотра');
            return;
        }
        const panel = vscode.window.createWebviewPanel('novelPreview', 'Предпросмотр новеллы', vscode.ViewColumn.Two, { enableScripts: true });
        // Здесь будет логика предпросмотра
        panel.webview.html = getWebviewContent(editor.document.getText());
    });
    // Регистрация команды для отображения графа сюжета
    let showStoryGraphCommand = vscode.commands.registerCommand('noveleditor.showStoryGraph', () => {
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
function deactivate() { }
function activateDecorations(editor) {
    if (editor.document.languageId === 'markdown') {
        decorations.applyDecorations(editor);
    }
}
function getWebviewContent(markdownContent) {
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
//# sourceMappingURL=extension.js.map