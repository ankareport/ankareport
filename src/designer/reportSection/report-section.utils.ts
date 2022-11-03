import { DataSourceTreeItemData } from "../components/dataSourceTreeList";
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
