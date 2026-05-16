import { describe, it, expect } from "vitest";
import { cn } from "../utils/cn";

describe("cn", () => {
  it('cn("a", "b") returns "a b"', () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it('cn("a", false && "b") returns "a"', () => {
    expect(cn("a", false && "b")).toBe("a");
  });

  it('cn(undefined, "b") returns "b"', () => {
    expect(cn(undefined, "b")).toBe("b");
  });

  it("cn() returns empty string", () => {
    expect(cn()).toBe("");
  });
});
