import { ILayout, ISection, ITextReportItem } from "../core/layout";

const MAX_LEVEL_TRESHOLD = 10;

export function getItems(layout: ILayout, data: any): ITextReportItem[] {
  const items: ITextReportItem[] = [];
  let top = 0;

  const headerItems = getItemsFromContent(layout.headerSection, data, top, 1);

  items.push(...headerItems.items);
  top = headerItems.top;

  const contentDataArray = getSectionDataArray(data, layout.contentSection.binding);

  for (const contentData of contentDataArray) {
    const contentItems = getItemsFromContent(layout.contentSection, contentData, top, 1);

    items.push(...contentItems.items);
    top = contentItems.top;
  }

  const footerItems = getItemsFromContent(layout.footerSection, data, top, 1);

  items.push(...footerItems.items);

  return items;
}

function getItemsFromContent(section: ISection, data: any, top: number, level: number) {
  if (!section || level >= MAX_LEVEL_TRESHOLD) return { top, items: [] };

  const items: ITextReportItem[] = [];

  section.items?.forEach(item => {
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

  top += section.height;

  if (section.sections) {
    for (const childSection of section.sections) {
      const childSectionDataArray = getSectionDataArray(data, childSection.binding);

      for (const childSectionData of childSectionDataArray) {
        const childItems = getItemsFromContent(childSection, childSectionData, top, level + 1);

        items.push(...childItems.items);
        top = childItems.top;
      }
    }
  }

  return { top: top, items };
}

function getSectionDataArray(parentData: any, binding: string) {
  if (!parentData || !binding) return [];

  const data = parentData[binding];

  if (Array.isArray(data)) return data;

  return [data];
}
