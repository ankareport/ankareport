import { getExcelMeta } from "../../src/exports/excel-exporter";

describe("Export To Excel", () => {
  test("excel exporter tests", () => {
    const items = [
      { text: 'Cell 1', x: 10, y: 10, width: 50, height: 30 },
      { text: 'Cell 2', x: 15, y: 15, width: 50, height: 30 },
      { text: 'Cell 3', x: 25, y: 25, width: 50, height: 30 },
      { text: 'Cell 4', x: 10, y: 60, width: 10, height: 10 },
    ];

    const columns = [
      { key: 'A', breakpoint: 0, width: 10 },
      { key: 'B', breakpoint: 10, width: 5 },
      { key: 'C', breakpoint: 15, width: 5 },
      { key: 'D', breakpoint: 20, width: 5 },
      { key: 'E', breakpoint: 25, width: 35 },
      { key: 'F', breakpoint: 60, width: 5 },
      { key: 'G', breakpoint: 65, width: 10 },
    ];

    const rows = [
      { key: 1, breakpoint: 0, height: 10 },
      { key: 2, breakpoint: 10, height: 5 },
      { key: 3, breakpoint: 15, height: 10 },
      { key: 4, breakpoint: 25, height: 15 },
      { key: 5, breakpoint: 40, height: 5 },
      { key: 6, breakpoint: 45, height: 10 },
      { key: 7, breakpoint: 55, height: 5 },
      { key: 8, breakpoint: 60, height: 10 },
    ];

    const meta = getExcelMeta(items as any);

    expect(meta.columns).toEqual(columns);
    expect(meta.rows).toEqual(rows);

    expect(meta.getCellName(25, 25)).toBe("E4");
    expect(meta.getCellName(65, 60)).toBe("G8");

    // TODO: add functionality
    // expect(meta.getBeforeCellName(25, 25)).toBe("D3");
    // expect(meta.getBeforeCellName(65, 60)).toBe("G8");
  });
});
