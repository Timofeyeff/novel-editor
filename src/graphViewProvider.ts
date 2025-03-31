import * as vscode from 'vscode';
import * as path from 'path';
import { parseDialogue } from './parser';

export class GraphViewProvider implements vscode.WebviewViewProvider {
    private _view?: vscode.WebviewView;

    constructor(private readonly _extensionUri: vscode.Uri) {}

    public resolveWebviewView(
        webviewView: vscode.WebviewView,
        context: vscode.WebviewViewResolveContext,
        _token: vscode.CancellationToken
    ) {
        this._view = webviewView;

        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this._extensionUri]
        };

        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
        
        // Обновление при изменении текста
        vscode.workspace.onDidChangeTextDocument((e) => {
            if (e.document.languageId === 'novel-markdown') {
                this.updateGraph(e.document.getText());
            }
        });
    }

    private _getHtmlForWebview(webview: vscode.Webview): string {
        const scriptUri = webview.asWebviewUri(
            vscode.Uri.joinPath(this._extensionUri, 'media', 'graph.js')
        );
        const styleUri = webview.asWebviewUri(
            vscode.Uri.joinPath(this._extensionUri, 'media', 'graph.css')
        );

        return `
            <!DOCTYPE html>
            <html>
            <head>
                <link href="${styleUri}" rel="stylesheet">
                <script src="https://d3js.org/d3.v7.min.js"></script>
            </head>
            <body>
                <div id="graph"></div>
                <script src="${scriptUri}"></script>
            </body>
            </html>
        `;
    }

    public updateGraph(content: string) {
        if (this._view) {
            const nodes = parseDialogue(content);
            this._view.webview.postMessage({ type: 'update', nodes });
        }
    }
}