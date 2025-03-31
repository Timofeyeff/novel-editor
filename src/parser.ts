export interface NovelNode {
    id: string;
    text: string;
    links: { text: string; target: string }[];
}

export function parseDialogue(content: string): NovelNode[] {
    const sections = content.split(/^#+\s+/m).filter(s => s.trim());
    return sections.map(section => {
        const [id, ...lines] = section.split('\n').filter(l => l.trim());
        const text = lines.join('\n').replace(/-\s*\[.*?\]\(.*?\)/g, '').trim();
        const links = Array.from(
            lines.join('\n').matchAll(/-\s*\[(.*?)\]\((.*?)\)/g)
        ).map(match => ({ text: match[1], target: match[2] }));

        return { id, text, links };
    });
}