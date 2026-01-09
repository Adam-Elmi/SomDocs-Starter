import fs from 'fs';
import path from 'path';

const PAGES_DIR = path.resolve('src/pages');

function walk(dir: string): string[] {
    let results: string[] = [];
    if (!fs.existsSync(dir)) return results;

    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(fullPath));
        } else {
            if (fullPath.endsWith('.md') || fullPath.endsWith('.mdx')) {
                results.push(fullPath);
            }
        }
    });
    return results;
}

function extractHeadings() {
    console.log('🔍 Scanning MDX documentation for headings...\n');

    if (!fs.existsSync(PAGES_DIR)) {
        console.error('Error: Pages directory not found at ' + PAGES_DIR);
        return;
    }

    const files = walk(PAGES_DIR);

    files.forEach(fullPath => {
        const relativePath = path.relative(PAGES_DIR, fullPath);
        let content = fs.readFileSync(fullPath, 'utf-8');

        content = content.replace(/^---[\s\S]*?---/, '');

        content = content.replace(/```[\s\S]*?```/g, '');
        content = content.replace(/`[\s\S]*?`/g, '');

        const headings: { depth: number; text: string }[] = [];

        const markdownRegex = /^\s*(#{1,6})\s+(.+)$/gm;
        let match;
        while ((match = markdownRegex.exec(content)) !== null) {
            headings.push({
                depth: match[1].length,
                text: match[2].trim()
            });
        }

        const htmlRegex = /<(h[1-6])[\s\S]*?>([\s\S]*?)<\/\1>/gi;
        while ((match = htmlRegex.exec(content)) !== null) {
            headings.push({
                depth: parseInt(match[1][1]),
                text: match[2].replace(/<[^>]*>?/gm, '').trim()
            });
        }

        console.log(relativePath);
        if (headings.length === 0) {
            console.log('No headers found');
        } else {
            headings.forEach(h => {
                const indent = '  '.repeat(h.depth - 1);
                const icon = h.depth === 1 ? 'H1' : h.depth === 2 ? 'H2' : h.depth === 3 ? 'H3' : h.depth === 4 ? 'H4' : h.depth === 5 ? 'H5' : 'H6';
                console.log(`${indent}${icon} ${h.text}`);
            });
        }
    });
}

try {
    extractHeadings();
} catch (error) {
    console.error('Error extracting headings:', error);
}
