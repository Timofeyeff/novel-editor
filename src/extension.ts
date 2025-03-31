import * as vscode from 'vscode';
import * as path from 'path';
import { parseDialogue } from './parser';
import { GraphViewProvider } from './graphViewProvider';

export function activate(context: vscode.ExtensionContext) {
    let panel: vscode.WebviewPanel | undefined;

    // Регистрация вьюшки в Activity Bar
    const graphViewProvider = new GraphViewProvider(context.extensionUri);
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(
            'novel-editor.graphView', // ID из package.json
            graphViewProvider
        )
    );

    // Регистрация команды с префиксом novel-editor
    const showGraphCommand = vscode.commands.registerCommand('novel-editor.showGraph', () => {
        panel = vscode.window.createWebviewPanel(
            'novelEditorGraph', // Уникальный идентификатор
            'Dialogue Flow',
            vscode.ViewColumn.Two,
            {}
        );
		
		vscode.window.onDidChangeActiveTextEditor(editor => {
			if (editor?.document.languageId === 'novel-markdown') {
				graphViewProvider.updateGraph(editor.document.getText());
			}
		});

        panel.webview.html = getWebviewContent(context.extensionPath);

        // Обновление графа при изменении текста
        vscode.workspace.onDidChangeTextDocument((e) => {
            if (e.document.languageId === 'novel-markdown' && panel) {
                const content = e.document.getText();
                const nodes = parseDialogue(content);
                panel.webview.postMessage({ type: 'update', nodes });
            }
        });
		
		// При получении сообщения от WebView
		panel.webview.onDidReceiveMessage((message) => {
			if (message.type === 'jumpToNode') {
				const editor = vscode.window.activeTextEditor;
				if (editor && editor.document.languageId === 'novel-markdown') {
					const text = editor.document.getText();
					const pattern = new RegExp(`^#+\\s+${message.nodeId}\\s*$`, 'm');
					const match = pattern.exec(text);
					
					if (match) {
						const position = editor.document.positionAt(match.index);
						editor.selection = new vscode.Selection(position, position);
						editor.revealRange(new vscode.Range(position, position));
					}
				}
			}
		});

	});

    context.subscriptions.push(showGraphCommand);
}

function getWebviewContent(extensionPath: string): string {
    const htmlPath = path.join(extensionPath, 'media', 'graph.html');
    return require('fs').readFileSync(htmlPath, 'utf8');
}

