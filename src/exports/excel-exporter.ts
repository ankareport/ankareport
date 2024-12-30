import { Workbook } from "exceljs";
import { ILayout, ITextReportItem } from "../core/layout";
import { getItems } from "../renderer/utils";

export function exportToXlsx(layout: ILayout, data: any) {
  const items = getItems(layout, data);
  const excelMeta = getExcelMeta(items);

  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet("Wroksheet1");

  worksheet.columns = excelMeta.columns.map(x => ({ key: x.key, width: x.width * 0.3 }));

  items.forEach((item) => {
    const cellName = excelMeta.getCellName(item.x, item.y);
    worksheet.getCell(cellName).value = item.text;
  });

  excelMeta.rows.forEach(x => worksheet.getRow(x.key).height = x.height);

  return workbook;
}

export function getExcelMeta(items: ITextReportItem[]) {
  const column_breakpoints: number[] = [0];
  const row_breakpoints: number[] = [0];

  for (const item of items) {
    const x = Math.round(item.x);
    const y = Math.round(item.y);
    const width = Math.round(item.width);
    const height = Math.round(item.height);

    if (!column_breakpoints.includes(x)) column_breakpoints.push(x);
    if (!column_breakpoints.includes(x + width)) column_breakpoints.push(x + width);

    if (!row_breakpoints.includes(y)) row_breakpoints.push(y);
    if (!row_breakpoints.includes(y + height)) row_breakpoints.push(y + height);
  }

  column_breakpoints.sort((a, b) => a - b);
  row_breakpoints.sort((a, b) => a - b);

  const columns: { key: string, breakpoint: number, width: number }[] = [];
  const rows: { key: number, breakpoint: number, height: number }[] = [];

  for (let i = 0; i < column_breakpoints.length - 1; i++) {
    columns.push({
      key: String.fromCharCode(65 + i),
      breakpoint: column_breakpoints[i],
      width: column_breakpoints[i + 1] - column_breakpoints[i],
    });
  }

  for (let i = 0; i < row_breakpoints.length - 1; i++) {
    rows.push({
      key: i + 1,
      breakpoint: row_breakpoints[i],
      height: row_breakpoints[i + 1] - row_breakpoints[i],
    });
  }

  const getCellName = (x: number, y: number) => {
    const cellName = columns.find(c => c.breakpoint === x)!.key; // TODO: add null check
    const rowName = rows.find(r => r.breakpoint === y)!.key; // TODO: add null check

    return `${cellName}${rowName}`;
  }

  // TODO: Fix name
  const getBeforeCellName = (cell: number, row: number) => {
    const cellIndex = column_breakpoints.findIndex(x => x === cell);
    const cellName = String.fromCharCode(65 + cellIndex);
    const rowIndex = row_breakpoints.findIndex(x => x === row) + 1;

    return `${cellName}${rowIndex}`;
  }

  return { columns, rows, getCellName, getBeforeCellName };
}
