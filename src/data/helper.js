import fs from "fs/promises";
import path from "path";

async function getContents(dirPath) {
  try {
    if (dirPath) {
      return await fs.readdir(dirPath);
    } else {
      throw new Error("Please provide the path!");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

(async () => {
  const baseDir = path.join(".", "src", "pages");
  const contents = await getContents(baseDir);
  function filterContents(arg) {
    if (arg && Array.isArray(arg) && arg.length > 0) {
      return arg.filter((con) => con.slice(con.lastIndexOf(".") + 1) === "mdx");
    } else {
      if (arg && arg !== "") {
        return arg.slice(arg.lastIndexOf(".") + 1) === "mdx";
      }
    }
  }
  async function getTitle(filePath) {
    if (filePath) {
      const fullPath = path.join(baseDir, filePath);
      const buffer = await fs.readFile(fullPath);
      const readContent = buffer.toString();
      const titleIndex = readContent.indexOf("\ntitle:");
      if (titleIndex === -1) {
        throw new Error(`No title found in file: ${filePath}`);
      }
      const title = readContent
        .slice(titleIndex + 7)
        .trim();
      const newlineIndex = title.indexOf("\n");
      const full_title = (newlineIndex !== -1 ? title.slice(0, newlineIndex) : title)
        .replaceAll('"', "").replaceAll("\r", "");
      return full_title;
    }
  }
  async function createJson() {
    try {
      const data = [];
      if (contents && Array.isArray(contents) && contents.length > 0) {
        for (const content of contents) {
          try {
            const contentDir = path.join(baseDir, content);
            const con = await fs.readdir(contentDir);
            const titles = [];
            for (const file of filterContents(con)) {
              const filePath = path.join(content, file);
              const title = await getTitle(filePath);
              if (title) {
                titles.push({path: file.slice(0, file.indexOf(".")), title: title, parent: content});
              }
            }
            data.push({
              path: content,
              content: titles,
            });
          } catch (err) {
            if (filterContents(content)) {
              data.push({content: await getTitle(content), path: content.slice(0, content.indexOf(".")) });
            }
          }
        }
        return data;
      } else {
        throw new Error("Please provide the path!");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const output = await createJson();

  try {
    const outputPath = path.join(".", "src", "data", "output.json");
    await fs.writeFile(
      outputPath,
      JSON.stringify(output, null, 2),
    );
    console.log("Successfully added!");
  } catch (error) {
    console.error("Failed to write output.json:", error);
  }
})();