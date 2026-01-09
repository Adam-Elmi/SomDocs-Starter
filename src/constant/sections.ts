import { docs_path } from "../../somdocs.config.json";
import fileTree from "../data/output.json";

function getFirstFile(nodes: any[]): string | null {
    for (const node of nodes) {
        if (node.type === "file") return node.path;
        if (node.children) {
            const found = getFirstFile(node.children);
            if (found) return found;
        }
    }
    return null;
}

let calculatedDocsPath = docs_path || "";
if (!calculatedDocsPath) {
    const docsNode = fileTree.find((n: any) => n.name === "docs") || fileTree[0];
    if (docsNode) {
        if (docsNode.type === "file") calculatedDocsPath = docsNode.path;
        else calculatedDocsPath = getFirstFile(docsNode.children || []) || "";
    }
}
if (calculatedDocsPath && !calculatedDocsPath.startsWith("/")) {
    calculatedDocsPath = "/" + calculatedDocsPath;
}

export const NAV_SECTIONS = [
    { name: "Home", url: "/", show_arrow: false },
    { name: "Docs", url: calculatedDocsPath || "/", show_arrow: false },
    { name: "Contribute", url: "https://github.com/Adam-Elmi/SomDocs-Starter", show_arrow: true },
];

export const FOOTER_SECTIONS = [
    { name: "Docs", path: calculatedDocsPath || "/" },
    { name: "Contribute", path: "https://github.com/Adam-Elmi/SomDocs-Starter" },
];