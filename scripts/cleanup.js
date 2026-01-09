const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '../src/pages/docs');

console.log('Starting cleanup of documentation examples...');

if (fs.existsSync(docsDir)) {
    try {
        const files = fs.readdirSync(docsDir);

        files.forEach(file => {
            const curPath = path.join(docsDir, file);
            fs.rmSync(curPath, { recursive: true, force: true });
            console.log(`Deleted: ${file}`);
        });

        const placeholderPath = path.join(docsDir, 'index.mdx');
        const placeholderContent = `---
layout: "../../layout/DocLayout.astro"
title: Introduction
description: Welcome to your new documentation site.
---

# Welcome

This is your new documentation site. Start adding content to \`src/pages/docs\`!
`;

        fs.writeFileSync(placeholderPath, placeholderContent);
        console.log('Created fresh index.mdx');
        console.log('Cleanup complete! You can now start adding your own content.');

    } catch (err) {
        console.error(`Error during cleanup: ${err.message}`);
    }
} else {
    console.log('Docs directory not found, nothing to clean.');
}
