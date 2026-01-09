import { search } from "./pagefind";

const debounce = (func: Function, delay: number) => {
    let timeoutId: any;
    return (...args: any[]) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(null, args);
        }, delay);
    };
};

export const handleSearch = async (
    event: Event,
    setResults: (results: any[]) => void,
    setLoading: (loading: boolean) => void
) => {
    const query = (event.target as HTMLInputElement).value;
    setLoading(true);

    if (query.trim() === "") {
        setResults([]);
        setLoading(false);
        return;
    }

    try {
        const result = await search(query);

        if (!result || !result.results) {
            setResults([]);
            setLoading(false);
            return;
        }

        const processedResults = await Promise.all(
            result.results.slice(0, 10).map(async (r: any) => {
                const data = await r.data();
                return {
                    id: r.id,
                    url: data.url,
                    title: data.meta.title,
                    excerpt: data.excerpt,
                };
            })
        );

        setResults(processedResults);
    } catch (error) {
        console.error("Search error:", error);
        setResults([]);
    } finally {
        setLoading(false);
    }
};

export const debouncedHandleSearch = debounce(handleSearch, 300);
