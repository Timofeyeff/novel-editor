import * as assert from 'assert';
import * as path from 'path';
import * as fs from 'fs';
import * as analyzer from '../../analyzer/storyAnalyzer';

function loadTestDocument(filename: string): string {
    const filePath = path.join(__dirname, '..', 'fixtures', filename);
    return fs.readFileSync(filePath, 'utf8');
}

suite('Story Structure Analyzer Tests', () => {
    test('should build complete story graph', () => {
        const document = loadTestDocument('simple_branching.md');
        const graph = analyzer.buildStoryGraph(document);
        assert.strictEqual(graph.nodes.length, 3); // Начальная сцена + 2 ветки
        assert.strictEqual(graph.edges.length, 2); // 2 связи между сценами
    });
    
    test('should detect dead ends', () => {
        const document = loadTestDocument('with_dead_end.md');
        const issues = analyzer.findDeadEnds(document);
        assert.strictEqual(issues.length, 1);
        assert.strictEqual(issues[0].type, 'deadEnd');
    });
    
    test('should detect unreachable sections', () => {
        const document = loadTestDocument('with_orphan_section.md');
        const issues = analyzer.findUnreachableSections(document);
        assert.strictEqual(issues.length, 1);
        assert.strictEqual(issues[0].type, 'unreachable');
    });
});