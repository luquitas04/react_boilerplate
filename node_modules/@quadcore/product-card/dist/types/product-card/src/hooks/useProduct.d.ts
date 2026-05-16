import { type FetchState } from "@quadcore/core";
import type { Product } from "../types";
export declare function useProduct(apiUrl: string, productId: string): FetchState<Product>;
