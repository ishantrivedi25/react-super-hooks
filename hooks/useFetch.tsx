import { useState, useEffect, DependencyList } from "react";

interface FetchData<T> {
    data: T | null;
    error: unknown;
    loading: boolean;
}

const useFetch = <T,>(url: string, dependencies: DependencyList): FetchData<T> => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<unknown>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const response = await fetch(url);
                const data = (await response.json()) as T;
                setData(data);
            } catch (error: unknown) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }

        void fetchData();
        // eslint-disable-next-line
    }, dependencies);

    return { data, error, loading };
};

export default useFetch;
