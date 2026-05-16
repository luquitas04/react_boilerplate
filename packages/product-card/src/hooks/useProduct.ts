import { useFetch, fetchWithConfig, type FetchState } from "@quadcore/core";
import type { Product } from "../types";

export function useProduct(apiUrl: string, productId: string): FetchState<Product> {
  return useFetch<Product>(
    () => fetchWithConfig<Product>(apiUrl, `/api/products/${productId}`),
    [apiUrl, productId]
  );
}
