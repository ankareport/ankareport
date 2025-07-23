import { PDFDocument, StandardFonts, PageSizes, rgb } from "pdf-lib";
import { ILayout, IReportItem } from "../core/layout";
import { generateItems } from "../core/utils/generate";

export async function exportToPdf(layout: ILayout, data: any) {
  const doc = await PDFDocument.create();
  const timesRomanFont = await doc.embedFont(StandardFonts.TimesRoman);
  const page = doc.addPage(PageSizes.A4);
  const { height } = page.getSize();

  const allItems = generateItems(layout, data);
  const allPageItems = splitItemsByPage(allItems, height);

  for (let i = 0; i < allPageItems.length; i++) {
    const currentPageItems = allPageItems[i];
    const currentPage = i === 0 ? page : doc.addPage(PageSizes.A4);

    for (const item of currentPageItems) {
      if (item.type === "text") {
        if ((item.borderWidth && item.borderColor) || item.backgroundColor) {
          currentPage.drawRectangle({
            x: item.x,
            y: height - item.y - item.height + (i * height),
            width: item.width,
            height: item.height,
            borderColor: hexToRgb(item.borderColor),
            color: hexToRgb(item.backgroundColor),
            borderWidth: item.borderWidth,
          });
        }

        const fontSize = parseInt(item.fontSize!.replace("px", ""));
        const textHeight = timesRomanFont.heightAtSize(fontSize);

        currentPage.drawText(item.text, {
          x: item.x,
          y: height - item.y - textHeight + (i * height),
          color: hexToRgb(item.color),
          font: timesRomanFont,
          size: fontSize,
        });
      } else if (item.type === "image" && item.source) {
        const image = await doc.embedPng(item.source);
        currentPage.drawImage(image, {
          x: item.x,
          y: height - item.y - item.height + (i * height),
          width: item.width,
          height: item.height,
        });
      }
    }
  }

  return await doc.save();
}

function splitItemsByPage(items: IReportItem[], pageHeight: number): IReportItem[][] {
  const result: IReportItem[][] = [];
  let pageNumber = 1;
  let maxItemBottomY = items.reduce((max, item) => max > item.y + item.height ? max : item.y + item.height, 0);

  while (true) {
    const pageTopY = (pageNumber - 1) * pageHeight;
    const pageBottomY = pageNumber * pageHeight;

    const pageItems = items.filter(item => isItemInArea(item, pageTopY, pageBottomY));

    result.push(pageItems);

    if (maxItemBottomY < pageBottomY) break;

    pageNumber++;
  }

  return result;
}

function isItemInArea(item: IReportItem, top: number, bottom: number) {
  if (top < item.y && item.y < bottom) return true;

  const bottomY = item.y + item.height;

  if (top < bottomY && bottomY < bottom) return true;

  return false;
}

function hexToRgb(hex: string | undefined) {
  if (!hex || hex === "transparent") return undefined;

  const hexString = hex.startsWith('#') ? hex.slice(1) : hex;

  let r, g, b;

  if (hexString.length === 3) {
    r = parseInt(hexString[0] + hexString[0], 16);
    g = parseInt(hexString[1] + hexString[1], 16);
    b = parseInt(hexString[2] + hexString[2], 16);
  } else if (hexString.length === 6) {
    r = parseInt(hexString.slice(0, 2), 16);
    g = parseInt(hexString.slice(2, 4), 16);
    b = parseInt(hexString.slice(4, 6), 16);
  } else {
    throw new Error('Invalid hex color string: ' + hex);
  }

  return rgb(r / 255, g / 255, b / 255);
}
