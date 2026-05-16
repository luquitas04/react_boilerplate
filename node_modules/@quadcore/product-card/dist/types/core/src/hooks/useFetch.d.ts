export interface FetchState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
}
export declare function useFetch<T>(fetcher: () => Promise<T>, deps?: unknown[]): FetchState<T>;
