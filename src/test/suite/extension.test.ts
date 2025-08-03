import * as assert from 'assert';
import * as vscode from 'vscode';
import * as sinon from 'sinon';
import * as extension from '../../extension';

suite('Extension Integration Tests', () => {
    test('should register all commands on activation', async () => {
        const context = {
            subscriptions: [],
            workspaceState: {
                get: () => undefined,
                update: () => Promise.resolve()
            },
            extensionUri: vscode.Uri.parse('file:///path/to/extension')
        };
        
        const registerCommandStub = sinon.stub(vscode.commands, 'registerCommand').returns({
            dispose: () => {}
        });
        
        extension.activate(context as any);
        
        assert.ok(registerCommandStub.called);
        assert.ok(registerCommandStub.calledWith('noveleditor.openPreview'));
        
        registerCommandStub.restore();
    });
    
    test('should apply correct decorations for novel syntax', () => {
        // Создаём mock для редактора
        const editor = {
            document: {
                languageId: 'markdown',
                getText: () => '@Персонаж [emotion: happy]\nРеплика персонажа',
                lineAt: (line: number) => ({
                    text: line === 0 ? '@Персонаж [emotion: happy]' : 'Реплика персонажа'
                })
            },
            setDecorations: sinon.spy()
        };
        
        // Активация декораторов
        extension.activateDecorations(editor as any);
        
        // Проверка, что метод setDecorations был вызван
        assert.ok(editor.setDecorations.called);
    });
});