import ReportItem from "../../core/reportItem";
import { DataSourceTreeItemData } from "../components/dataSourceTreeList";
import { SelectEventArgs } from "./area-selector";
import ReportSection from "./reportSection";

export function getSubsectionDataList(
  items: DataSourceTreeItemData[] | undefined,
  sections: ReportSection[],
) {
  if (!items) return [];

  const subsectionDataList = items.filter(
    (x) => x.children && x.children.length > 0,
  );

  const existingFields = sections.map((x) => x.properties.binding);

  return subsectionDataList.filter((x) => !existingFields.includes(x.field));
}

export function getReportSectionBindings(section: ReportSection): string[] {
  const result = [];

  let iterator: ReportSection | undefined = section;

  while (iterator) {
    result.push(iterator.properties.binding);

    iterator = iterator.parent;
  }

  return result;
}

export function findItemsByRect(items: ReportItem[], rect: SelectEventArgs) {
  const selected: ReportItem[] = [];

  for (const item of items) {
    if (isItemInRect(rect, item)) {
      selected.push(item);
    }
  }

  return selected;
}

function isItemInRect(rect: SelectEventArgs, item: ReportItem) {
  if (!isPointInRect(rect, { x: item.properties.x, y: item.properties.y }))
    return false;

  const br = {
    x: item.properties.x + item.properties.width,
    y: item.properties.y + item.properties.height,
  };

  if (!isPointInRect(rect, br)) return false;

  return true;
}

function isPointInRect(rect: SelectEventArgs, point: { x: number; y: number }) {
  return (
    rect.x < point.x &&
    point.x < rect.x + rect.width &&
    rect.y < point.y &&
    point.y < rect.y + rect.height
  );
}
