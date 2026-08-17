import { describe, expect, it } from "vitest";
import { getConnectionErrorMessage } from "../shared/reliability";

describe("connection reliability messaging", () => {
  it("explains when a request times out", () => {
    expect(getConnectionErrorMessage({ name: "AbortError" })).toContain("timed out");
  });

  it("returns a safe generic message for unknown failures", () => {
    expect(getConnectionErrorMessage(new Error("socket details should stay private"))).toBe(
      "Unable to connect right now. Please check your internet connection and try again.",
    );
  });
});
