import { ILayout, IReportItem, ISection } from "../layout";
import { formatDate, formatNumber } from "./format";

export function generateItems(layout: ILayout, data: any): IReportItem[] {
  const items = [];

  let topMargin = 0;

  const headerElements = getSectionItems(topMargin, layout.headerSection, data);
  topMargin += headerElements.height;
  items.push(...headerElements.items);

  if (layout.contentSection.binding && data && Array.isArray(data[layout.contentSection.binding])) {
    for (const subData of data[layout.contentSection.binding]) {
      const contentElements = getSectionItems(topMargin, layout.contentSection, subData);
      topMargin += contentElements.height;
      items.push(...contentElements.items);
    }
  } else {
    const contentElements = getSectionItems(topMargin, layout.contentSection, data);
    topMargin += contentElements.height;
    items.push(...contentElements.items);
  }

  const footerElements = getSectionItems(topMargin, layout.footerSection, data);
  topMargin += footerElements.height;
  items.push(...footerElements.items);

  return items;
}

function getSectionItems(topMargin: number, section: ISection, data: any) {
  let height = section.height;

  const items = section.items?.map(item => {
    var result = {
      ...item,
      x: item.x,
      y: topMargin + item.y,
      width: item.width,
      height: item.height,
    };

    if (result.type === "text" && result.binding) {
      let bindedData = data ? data[result.binding] : "NULL";

      if (result.format) {
        if (typeof bindedData === "number") {
          bindedData = formatNumber(bindedData, result.format);
        } else if (new Date(bindedData).toString() !== "Invalid Date") {
          bindedData = formatDate(bindedData, result.format);
        }
      }

      result.text = bindedData;
    }

    if (!result.color) result.color = "#000000";
    if (!result.fontSize) result.fontSize = "12px";
    if (!result.fontFamily) result.fontFamily = "Arial";

    return result;
  }) ?? [];

  if (section.sections) {
    for (const subSection of section.sections) {
      const subData = subSection.binding && data ? data[subSection.binding] : null;
      if (Array.isArray(subData)) {
        for (const subDataObj of subData) {
          const subItems = getSectionItems(topMargin + height, subSection, subDataObj);
          height += subItems.height;
          items.push(...subItems.items);
        }
      } else {
        const subItems = getSectionItems(topMargin + height, subSection, subData);
        height += subItems.height;
        items.push(...subItems.items);
      }
    }
  }

  return {
    height,
    items,
  };
}
