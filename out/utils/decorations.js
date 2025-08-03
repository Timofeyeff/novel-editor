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
exports.applyDecorations = applyDecorations;
const vscode = __importStar(require("vscode"));
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
//# sourceMappingURL=decorations.js.map