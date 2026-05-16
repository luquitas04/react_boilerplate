import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fetchWithConfig } from "../utils/fetch";

function mockFetch(body: unknown, ok = true, status = 200, statusText = "OK") {
  return vi.fn().mockResolvedValue({
    ok,
    status,
    statusText,
    json: () => Promise.resolve(body),
  });
}

beforeEach(() => {
  vi.stubGlobal("fetch", mockFetch({ id: 1, name: "Test" }));
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("fetchWithConfig", () => {
  it("returns parsed JSON on success", async () => {
    const result = await fetchWithConfig("https://api.test.com", "/products/1");
    expect(result).toEqual({ id: 1, name: "Test" });
  });

  it("throws error with status when response is not ok", async () => {
    vi.stubGlobal("fetch", mockFetch({}, false, 404, "Not Found"));
    await expect(
      fetchWithConfig("https://api.test.com", "/products/99")
    ).rejects.toThrow("404");
  });

  it("builds the URL correctly: apiUrl + path", async () => {
    const spy = mockFetch({ ok: true });
    vi.stubGlobal("fetch", spy);
    await fetchWithConfig("https://api.test.com", "/products/1");
    expect(spy).toHaveBeenCalledWith(
      "https://api.test.com/products/1",
      expect.anything()
    );
  });

  it("strips trailing slash from apiUrl to avoid double slash", async () => {
    const spy = mockFetch({ ok: true });
    vi.stubGlobal("fetch", spy);
    await fetchWithConfig("https://api.test.com/", "/products/1");
    expect(spy).toHaveBeenCalledWith(
      "https://api.test.com/products/1",
      expect.anything()
    );
  });
});
