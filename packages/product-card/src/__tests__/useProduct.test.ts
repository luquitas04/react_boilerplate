import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useProduct } from "../hooks/useProduct";

const MOCK_PRODUCT = {
  id: "1",
  name: "Zapatillas",
  description: "Descripción",
  price: 85000,
  currency: "ARS",
  image: "https://example.com/img.jpg",
  stock: 5,
};

function mockFetch(body: unknown, ok = true, status = 200, statusText = "OK") {
  return vi.fn().mockResolvedValue({
    ok,
    status,
    statusText,
    json: () => Promise.resolve(body),
  });
}

beforeEach(() => {
  vi.stubGlobal("fetch", mockFetch(MOCK_PRODUCT));
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("useProduct", () => {
  it("returns the product on successful fetch", async () => {
    const { result } = renderHook(() =>
      useProduct("https://api.test.com", "1")
    );
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toEqual(MOCK_PRODUCT);
    expect(result.current.error).toBeNull();
  });

  it("returns error message on failed fetch", async () => {
    vi.stubGlobal("fetch", mockFetch({}, false, 500, "Internal Server Error"));
    const { result } = renderHook(() =>
      useProduct("https://api.test.com", "1")
    );
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toBeNull();
    expect(result.current.error).toContain("500");
  });

  it("calls the correct URL: apiUrl + /api/products/ + productId", async () => {
    const spy = mockFetch(MOCK_PRODUCT);
    vi.stubGlobal("fetch", spy);
    const { result } = renderHook(() =>
      useProduct("https://api.test.com", "42")
    );
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(spy).toHaveBeenCalledWith(
      "https://api.test.com/api/products/42",
      expect.anything()
    );
  });
});
