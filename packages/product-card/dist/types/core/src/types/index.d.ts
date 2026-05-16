export interface QuadcoreConfig {
    apiUrl: string;
    theme?: Record<string, string>;
    className?: string;
    locale?: string;
}
export interface ApiResponse<T> {
    data: T;
    error?: string;
}
