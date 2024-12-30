import { jsPDF } from "jspdf";
import { ILayout, ITextReportItem } from "../core/layout";
import { getItems } from "../renderer/utils";

export function exportToPdf(layout: ILayout, data: any) {
  const pdf = new jsPDF({
    unit: 'px',
    // format: [width, height],
    hotfixes: ["px_scaling"],
  });

  // TODO: pdf.setDocumentProperties({title});

  const items = getItems(layout, data);

  items.forEach(x => addText(pdf, x));

  return pdf;
}

function addText(pdf: jsPDF, item: ITextReportItem) {
  const text = item.text;
  const fontSize = item.fontSize ? Number(item.fontSize.replace('px', '')) : 12; // TODO: Fix
  const lineHeight = pdf.getLineHeight();

  pdf.setFontSize(fontSize);
  pdf.setTextColor(item.color ?? 'black');

  // TODO: this is not working
  if (item.backgroundColor) {
    pdf.setDrawColor(item.backgroundColor);
  }

  pdf.text(text.toString(), item.x, lineHeight + item.y); // TODO: do we need to use toString?
}
