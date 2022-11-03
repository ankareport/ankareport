import DesignerReportItem from "../reportItem/designerReportItem";
import ReportSection from "./reportSection";

export type SelectEventArgs =
  | SelectReportSectionEventArgs
  | SelectReportItemEventArgs;

export interface SelectReportSectionEventArgs {
  type: "ReportSection";
  element: ReportSection;
}

export interface SelectReportItemEventArgs {
  type: "ReportItem";
  element: DesignerReportItem;
}

export type ChangeEventArgs = SectionChangeEventArgs | ItemChangeEventArgs;

export interface SectionChangeEventArgs {
  type: "add-section" | "remove-section" | "change-section";
  section: ReportSection;
}

export interface ItemChangeEventArgs {
  type: "add-item" | "remove-item" | "change-item";
  item: DesignerReportItem;
}

export interface ReportSectionEventMap {
  select: SelectEventArgs;
  change: ChangeEventArgs;
}
