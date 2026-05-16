import { describe, it, expect, vi } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useFetch } from "../hooks/useFetch";
describe("useFetch", () => {
    it("starts with loading=true, data=null, error=null", () => {
        const fetcher = () => new Promise(() => { });
        const { result } = renderHook(() => useFetch(fetcher));
        expect(result.current.loading).toBe(true);
        expect(result.current.data).toBeNull();
        expect(result.current.error).toBeNull();
    });
    it("sets data and loading=false after resolve", async () => {
        const fetcher = vi.fn().mockResolvedValue({ id: 1 });
        const { result } = renderHook(() => useFetch(fetcher));
        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(result.current.data).toEqual({ id: 1 });
        expect(result.current.error).toBeNull();
    });
    it("sets error and loading=false after reject", async () => {
        const fetcher = vi.fn().mockRejectedValue(new Error("fetch failed"));
        const { result } = renderHook(() => useFetch(fetcher));
        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(result.current.data).toBeNull();
        expect(result.current.error).toBe("fetch failed");
    });
    it("refetch() triggers a new fetch call", async () => {
        const fetcher = vi.fn().mockResolvedValue({ id: 1 });
        const { result } = renderHook(() => useFetch(fetcher));
        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(fetcher).toHaveBeenCalledTimes(1);
        act(() => {
            result.current.refetch();
        });
        await waitFor(() => expect(fetcher).toHaveBeenCalledTimes(2));
    });
});
