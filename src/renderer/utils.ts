import { ILayout, ITextReportItem } from "../core/layout";

export function getItems(layout: ILayout, data: any): ITextReportItem[] {
  const items: ITextReportItem[] = [];

  let top = 0;

  layout.headerSection.items?.forEach(item => {
    if (item.type === "text") {
      // TODO: Fill all values and types
      items.push({
        type: 'text',
        text: item.binding ? data[item.binding] : item.text,
        name: 'TextReportItem',
        x: item.x,
        y: top + item.y,
        width: item.width,
        height: item.height,
      });
    }
  });

  top += layout.headerSection.height;

  layout.footerSection.items?.forEach(item => {
    if (item.type === "text") {
      // TODO: Fill all values and types
      items.push({
        type: 'text',
        text: item.binding ? data[item.binding] : item.text,
        name: 'TextReportItem',
        x: item.x,
        y: top + item.y,
        width: item.width,
        height: item.height,
      });
    }
  });

  return items;
}
