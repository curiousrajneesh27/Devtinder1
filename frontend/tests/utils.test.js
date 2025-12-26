import { describe, it, expect } from "vitest";
import truncateString from "../src/utils/truncateString";

describe("Utility Functions", () => {
    it("should truncate long strings", () => {
        const longString = "This is a very long string that should be truncated";
        const result = truncateString(longString, 20);
        expect(result.length).toBeLessThanOrEqual(23); // 20 + "..."
    });

    it("should not truncate short strings", () => {
        const shortString = "Short";
        const result = truncateString(shortString, 20);
        expect(result).toBe(shortString);
    });
});
