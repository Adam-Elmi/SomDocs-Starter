export { };

declare global {
    interface Window {
        pagefind: any;
    }
}

export const search = async (query: string) => {
    if (typeof window !== "undefined") {
        if (typeof window.pagefind === "undefined") {
            try {
                await new Promise<void>((resolve, reject) => {
                    const script = document.createElement("script");
                    script.type = "module";
                    script.textContent = `
            import * as pagefind from '/pagefind/pagefind.js';
            window.pagefind = pagefind;
            window.dispatchEvent(new Event('pagefind-loaded'));
          `;
                    script.onerror = () => reject(new Error("Failed to load pagefind"));

                    const onLoaded = () => {
                        window.removeEventListener('pagefind-loaded', onLoaded);
                        resolve();
                    };
                    window.addEventListener('pagefind-loaded', onLoaded);
                    document.head.appendChild(script);
                });
            } catch (e) {
                console.error("Failed to inject Pagefind module:", e);
                return { results: [] };
            }
        }

        if (window.pagefind) {
            return await window.pagefind.search(query);
        }
    }

    return { results: [] };
};
