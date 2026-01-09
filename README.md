# SomDocs Starter V1.0.0

Welcome to the **SomDocs Starter Kit**! This is a modern, performance-focused documentation template built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com). It features dynamic sidebar generation, robust search, and a suite of custom components to make your documentation beautiful and functional.

## Getting Started

### 1. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Adam-Elmi/SomDocs-Starter.git my-docs
cd my-docs
npm install
```

### 2. Development

Start the local development server:

```bash
npm run dev
```

Visit `http://localhost:9000` to see your site.
    
### Search in Development
    
By default, the **Search** functionality runs on a static index generated at build time. This means it **will not update automatically** as you change content in `dev` mode.
    
To see updated search results while developing, run:
    
```bash
npm run refresh-search
```
    
This rebuilds the site and copies the fresh search index to the public directory, where the dev server can access it.

## Configuration

The project is configured via `somdocs.config.json` at the project root.

```json
{
  "onTop": ["introduction", "installation", "configuration"], // Order of top-level items
  "repo_url": "https://github.com/your-repo", // Link to your repository
  "colorScheme": "orange", // UI Theme color (options: indigo, blue, teal, rose, violet, orange, green, red, sky)
  "sidebar": {
    "collapsed": true, // Default sidebar state
    "folders": {
      "docs": false // Specific folder collapse state
    }
  }
}
```

## Adding Content

Documentation pages are standard **MDX** files located in `src/pages/docs`.

- **File Structure**: The sidebar mirrors the folder structure in `src/pages`. folders become sections, and files become links.
- **Frontmatter**: Every MDX file must have a `title` and `layout`.

Example `src/pages/docs/my-page.mdx`:

```yaml
---
layout: "../../layout/DocLayout.astro"
title: My New Page
description: A short description of this page.
---

# My Page Content

Here is some documentation...
```

### Dynamic Sidebar
The sidebar is automatically generated. To control the order of items, use the `onTop` array in `somdocs.config.json`.

## Components

This kit comes with a set of pre-built "SomDocs" components to enhance your content. Import them from `../../somdocs-components/`.

### Steps
Visual step-by-step instructions.

```jsx
import Steps from "../../somdocs-components/Steps.astro";
import Step from "../../somdocs-components/Step.astro";

<Steps>
    <Step title="First Step">
        Do this first.
    </Step>
    <Step title="Second Step">
        Then do this.
    </Step>
</Steps>
```

### CodeTabs
Tabbed code blocks with copy functionality. Icons are rendered using specific SVG components or `slot="icon"`.

```jsx
import CodeTabs from "../../somdocs-components/CodeTabs.astro";
import CodeTab from "../../somdocs-components/CodeTab.astro";
import DocIcon from "../../icons/DocIcon.astro"; // Example icon

<CodeTabs>
    <CodeTab title="npm" filename="Terminal">
        <DocIcon slot="icon" class="w-4 h-4" />
        ```sh
        npm install
        ```
    </CodeTab>
    <CodeTab title="yarn" filename="Terminal">
        <DocIcon slot="icon" class="w-4 h-4" />
        ```sh
        yarn install
        ```
    </CodeTab>
</CodeTabs>
```

### Message
Callout boxes for warnings, tips, etc.

```jsx
import Message from "../../somdocs-components/Message.astro";

<Message type="info"> This is an info message. </Message>
<Message type="success"> This is a success message. </Message>
<Message type="warning"> This is a warning message. </Message>
<Message type="error"> This is an error message. </Message>
```

### TextHighlight
Highlight text with the theme color.

```jsx
import TextHighlight from "../../somdocs-components/TextHighlight.astro";

This is <TextHighlight>important text</TextHighlight>.
```

## Cleanup Script

If you want to start fresh and remove all the example documentation (like this page), you can run the cleanup script.

**WARNING**: This will delete everything in `src/pages/docs` (except a placeholder).

```bash
node scripts/cleanup.js
```

(Note: You may need to restart the dev server after running this).