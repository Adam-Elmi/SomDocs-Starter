import fs from "fs/promises";

async function getContents(path) {
  try {
    if (path) {
      return await fs.readdir(path);
    } else {
      throw new Error("Please provide the path!");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

(async () => {
  const contents = await getContents("./src/pages");
  function filterContents(arg) {
    if (arg && Array.isArray(arg) && arg.length > 0) {
      return arg.filter((con) => con.slice(con.lastIndexOf(".") + 1) === "mdx");
    } else {
      if (arg && arg !== "") {
        return arg.slice(arg.lastIndexOf(".") + 1) === "mdx";
      }
    }
  }
  async function getTitle(path) {
    if (path) {
      const buffer = await fs.readFile("./src/pages/" + path);
      const readContent = buffer.toString();
      const titleIndex = readContent.indexOf("\ntitle:");
      if (titleIndex === -1) {
        throw new Error(`No title found in file: ${path}`);
      }
      const title = readContent
        .slice(titleIndex + 7)
        .trim();
      const newlineIndex = title.indexOf("\n");
      const full_title = (newlineIndex !== -1 ? title.slice(0, newlineIndex) : title)
        .replaceAll('"', "");
      return full_title;
    }
  }
  async function createJson() {
    try {
      const data = [];
      if (contents && Array.isArray(contents) && contents.length > 0) {
        for (const content of contents) {
          try {
            const con = await fs.readdir("./src/pages/" + content);
            const titles = [];
            for (const file of filterContents(con)) {
              const title = await getTitle(content + "/" + file);
              if (title) {
                titles.push(title);
              }
            }
            data.push({
              content: titles,
            });
          } catch (err) {
            if (filterContents(content)) {
              data.push({content: await getTitle(content) });
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
    await fs.writeFile(
      "./src/data/output.json",
      JSON.stringify(output, null, 2),
    );
    console.log("Successfully added!");
  } catch (error) {
    console.error("Failed to write output.json:", error);
  }
})();