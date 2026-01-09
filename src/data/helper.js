import fs from "fs/promises";
import path from "path";

const PAGES_DIR = path.join(".", "src", "pages");
const OUTPUT_PATH = path.join(".", "src", "data", "output.json");
const HEADINGS_OUTPUT_PATH = path.join(".", "src", "data", "headings.json");
const CONFIG_PATH = path.join(".", "somdocs.config.json");

let onTop = [];

function prioritySort(a, b) {
  const aIndex = onTop.indexOf(a.name);
  const bIndex = onTop.indexOf(b.name);

  if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
  if (aIndex !== -1) return -1;
  if (bIndex !== -1) return 1;

  return 0;
}

async function getTitle(filePath) {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    const match = content.match(/^title:\s*(.+)$/m);
    if (match) {
      return match[1].trim().replace(/^["']|["']$/g, "");
    }
  } catch (e) {
    console.error(`Error reading title from ${filePath}:`, e);
  }
  return null;
}

function parseHeaders(content) {
  let cleanContent = content.replace(/^---[\s\S]*?---/, '');

  cleanContent = cleanContent.replace(/```[\s\S]*?```/g, '');
  cleanContent = cleanContent.replace(/`[\s\S]*?`/g, '');

  const headers = [];

  const markdownRegex = /^\s*(#{1,6})\s+(.+)$/gm;
  let match;
  while ((match = markdownRegex.exec(cleanContent)) !== null) {
    headers.push({
      depth: match[1].length,
      text: match[2].trim()
    });
  }

  const htmlRegex = /<(h[1-6])[\s\S]*?>([\s\S]*?)<\/\1>/gi;
  while ((match = htmlRegex.exec(cleanContent)) !== null) {
    headers.push({
      depth: parseInt(match[1][1]),
      text: match[2].replace(/<[^>]*>?/gm, '').trim()
    });
  }

  return headers;
}

async function processDirectory(dir, relativePath = "") {
  const items = await fs.readdir(dir);
  const tree = [];
  const headings = [];

  for (const item of items) {
    if (item.startsWith(".") || item === "node_modules" || item === "api") continue;

    const fullPath = path.join(dir, item);
    const itemRelativePath = path.join(relativePath, item);
    const stats = await fs.stat(fullPath);

    if (stats.isDirectory()) {
      const result = await processDirectory(fullPath, itemRelativePath);
      if (result.tree.length > 0) {
        const label = item.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
        tree.push({
          type: "folder",
          name: item,
          label: label,
          path: itemRelativePath,
          children: result.tree.sort(prioritySort)
        });
        headings.push(...result.headings);
      }
    } else if (item.endsWith(".mdx") || item.endsWith(".md")) {
      const content = await fs.readFile(fullPath, "utf-8");
      const title = await getTitle(fullPath);
      const name = item.slice(0, item.lastIndexOf("."));
      const docPath = itemRelativePath.slice(0, itemRelativePath.lastIndexOf("."));

      if (relativePath === "" && (name === "index" || name === "404")) continue;

      tree.push({
        type: "file",
        name: name,
        label: title || name,
        path: docPath
      });

      const docHeaders = parseHeaders(content);
      headings.push({
        filename: name,
        path: docPath,
        headers: docHeaders.map(h => h.text)
      });
    }
  }

  return { tree: tree.sort(prioritySort), headings };
}

async function run() {
  console.log("Starting data generation...");
  try {
    try {
      const configRaw = await fs.readFile(CONFIG_PATH, "utf-8");
      const config = JSON.parse(configRaw);
      onTop = config.onTop || [];
    } catch (e) {
      console.warn("Failed to load somdocs.config.json, using default sorting.");
    }

    if (!(await fs.stat(PAGES_DIR).catch(() => null))) {
      console.error("Pages directory not found!");
      return;
    }

    const { tree, headings } = await processDirectory(PAGES_DIR);

    const finalTree = tree;

    await fs.writeFile(OUTPUT_PATH, JSON.stringify(finalTree, null, 2));
    console.log(`Successfully created ${OUTPUT_PATH} with ${finalTree.length} top-level items.`);

    await fs.writeFile(HEADINGS_OUTPUT_PATH, JSON.stringify(headings, null, 2));
    console.log(`Successfully created ${HEADINGS_OUTPUT_PATH} with ${headings.length} pages.`);

  } catch (error) {
    console.error("Failed to generate data:", error);
  }
}

run();