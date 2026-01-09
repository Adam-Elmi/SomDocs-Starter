import fs from 'fs/promises';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONFIG_FILE = path.resolve(__dirname, '../../somdocs.config.json');
const PAGES_DIR = path.resolve(__dirname, '../pages');
const METADATA_FILE = path.resolve(__dirname, '../data/metadata.json');

let REPO_OWNER = '';
let REPO_NAME = '';


function fetch(url, token = process.env.GITHUB_TOKEN) {
    return new Promise((resolve, reject) => {
        const options = {
            headers: {
                'User-Agent': 'SomDocs-Metadata-Fetcher',
                ...(token && { 'Authorization': `token ${token}` })
            }
        };

        https.get(url, options, (res) => {
            if (res.statusCode === 403 || res.statusCode === 429) {
                resolve({ rateLimited: true });
                return;
            }

            if (res.statusCode !== 200) {
                reject(new Error(`Request failed with status ${res.statusCode}`));
                res.resume();
                return;
            }

            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

async function findFiles(dir, fileList = []) {
    const files = await fs.readdir(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = await fs.stat(filePath);
        if (stat.isDirectory()) {
            await findFiles(filePath, fileList);
        } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
            fileList.push(filePath);
        }
    }
    return fileList;
}

async function main() {
    console.log('Starting metadata fetch...');

    let metadata = {};
    try {
        const existing = await fs.readFile(METADATA_FILE, 'utf-8');
        metadata = JSON.parse(existing);
    } catch (e) {
        console.log('No existing metadata found, starting fresh.');
    }

    try {
        const configRaw = await fs.readFile(CONFIG_FILE, 'utf-8');
        const config = JSON.parse(configRaw);
        if (config.repo_url) {
            const parts = config.repo_url.split('/');
            REPO_NAME = parts.pop() || parts.pop();
            REPO_OWNER = parts.pop();
        } else {
            console.error('repo_url not found in somdocs.config.json');
            return;
        }
    } catch (e) {
        console.error('Failed to load somdocs.config.json:', e);
        return;
    }

    const files = await findFiles(PAGES_DIR);
    let rateLimitHit = false;

    for (const file of files) {
        const relativePath = path.relative(path.resolve(__dirname, '..'), file);
        const repoPath = `src/${relativePath}`;
        const key = relativePath;

        if (rateLimitHit) {
            console.log(`Rate limit active. Skipping ${key} (using cached if available).`);
            continue;
        }

        console.log(`Fetching metadata for: ${repoPath}`);

        try {
            const commits = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/commits?path=${encodeURIComponent(repoPath)}&page=1&per_page=1`);

            if (commits.rateLimited) {
                console.warn('GitHub API Rate Limit Hit! Stopping fetch.');
                rateLimitHit = true;
                continue;
            }

            if (commits && commits.length > 0) {
                const commit = commits[0];
                const authorDate = commit.commit.author.date;
                let authorName = commit.commit.author.name;
                const authorUrl = commit.author ? commit.author.html_url : null;
                const commitUrl = commit.html_url;

                metadata[key] = {
                    lastUpdated: authorDate,
                    updatedBy: authorName,
                    proflieUrl: authorUrl,
                    commitUrl: commitUrl,
                    hash: commit.sha
                };
            } else {
                console.log(`No history found for ${repoPath}, using existing or defaults.`);
            }

        } catch (error) {
            console.error(`Error fetching ${repoPath}:`, error.message);
        }

        await new Promise(r => setTimeout(r, 200));
    }

    await fs.mkdir(path.dirname(METADATA_FILE), { recursive: true });

    await fs.writeFile(METADATA_FILE, JSON.stringify(metadata, null, 2));
    console.log(`Metadata saved to ${METADATA_FILE}`);
}

main().catch(console.error);
