import { useFetch, fetchWithConfig } from "@quadcore/core";
export function useProduct(apiUrl, productId) {
    return useFetch(() => fetchWithConfig(apiUrl, `/api/products/${productId}`), [apiUrl, productId]);
}
