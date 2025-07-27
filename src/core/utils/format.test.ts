import { formatDate, formatNumber } from "./format";

describe("format", () => {
  test("format numbers", () => {
    expect(formatNumber(1234.6789, "f0")).toBe("1235");
    expect(formatNumber(1234.6789, "f1")).toBe("1234.7");
    expect(formatNumber(1234.6789, "f2")).toBe("1234.68");
    expect(formatNumber(1234.6789, "f3")).toBe("1234.679");
    expect(formatNumber(1234.6789, "f4")).toBe("1234.6789");
    expect(formatNumber(1234.6789, "f5")).toBe("1234.67890");
  });

  test("format date", () => {
    expect(formatDate("2025-12-19T14:43:00.000", "YYYY.MM.DD")).toBe("2025.12.19");
    expect(formatDate("2025-12-19T14:43:00.000", "YYYY.MM.DD HH")).toBe("2025.12.19 14");
    expect(formatDate("2025-12-19T14:43:00.000", "YYYY.MM.DD HH:mm")).toBe("2025.12.19 14:43");
  });
});
