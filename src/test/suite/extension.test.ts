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
        
        await extension.activate(context as any);
        
        assert.ok(registerCommandStub.called);
        assert.ok(registerCommandStub.calledWith('noveleditor.openPreview'));
        
        registerCommandStub.restore();
    });
    
    test('should apply correct decorations for novel syntax', async () => {
        // Создаём mock для редактора
        const editor = {
            document: {
                getText: () => '@Персонаж\nРеплика персонажа',
                lineAt: (line: number) => ({
                    text: line === 0 ? '@Персонаж' : 'Реплика персонажа',
                    range: new vscode.Range(
                        new vscode.Position(line, 0),
                        new vscode.Position(line, line === 0 ? 9 : 17)
                    )
                })
            },
            setDecorations: sinon.spy()
        };
        
        // Активация декораторов
        await extension.activateDecorations(editor as any);
        
        // Проверка, что метод setDecorations был вызван
        assert.ok(editor.setDecorations.called);
    });
});