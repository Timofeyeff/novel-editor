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
const assert = __importStar(require("assert"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const analyzer = __importStar(require("../../analyzer/storyAnalyzer"));
function loadTestDocument(filename) {
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
//# sourceMappingURL=analyzer.test.js.map