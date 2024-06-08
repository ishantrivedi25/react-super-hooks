import { useState, useEffect, DependencyList } from "react";

interface FetchData<T> {
    data: T | null;
    error: Error | null;
    loading: boolean;
}

const useFetch = <T,>(url:string, dependencies: DependencyList = []): FetchData<T> => {
    const [data, setData] = useState(null);
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const response = await fetch(url);
                const data = await response.json();
                setData(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, dependencies);

    return { data, error, loading };
}

export default useFetch;