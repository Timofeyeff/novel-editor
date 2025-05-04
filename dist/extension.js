/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.activate = activate;
exports.deactivate = deactivate;
exports.activateDecorations = activateDecorations;
const vscode = __importStar(__webpack_require__(1));
const decorations = __importStar(__webpack_require__(2));
function activate(context) {
    console.log('Расширение "Novel Editor" активировано');
    // Регистрация команды для открытия предпросмотра
    let openPreviewCommand = vscode.commands.registerCommand('novel-editor.openPreview', () => {
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


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.applyDecorations = applyDecorations;
const vscode = __importStar(__webpack_require__(1));
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
function applyDecorations(editor) {
    const document = editor.document;
    if (document.languageId !== 'markdown') {
        return;
    }
    const text = document.getText();
    const lines = text.split('\n');
    const characterDecorations = [];
    const emotionDecorations = [];
    const commandDecorations = [];
    const choiceDecorations = [];
    const sectionDecorations = [];
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


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=extension.js.map