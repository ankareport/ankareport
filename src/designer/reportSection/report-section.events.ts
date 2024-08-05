import { PropertyChangeEventArgs } from "../../core/properties";
import { ReportItem } from "../../core/reportItems";
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
  element: ReportItem;
}

export type ChangeEventArgs =
  | SectionAddEventArgs
  | SectionChangeEventArgs
  | SectionRemoveEventArgs
  | ItemAddEventArgs
  | ItemChangeEventArgs
  | ItemRemoveEventArgs;

export interface SectionAddEventArgs {
  type: "add-section";
  section: ReportSection;
}

export interface SectionChangeEventArgs {
  type: "change-section";
  section: ReportSection;
  changes: PropertyChangeEventArgs[];
}

export interface SectionRemoveEventArgs {
  type: "remove-section";
  section: ReportSection;
}

export interface ItemAddEventArgs {
  type: "add-item";
  item: ReportItem;
}

export interface ItemChangeEventArgs {
  type: "change-item";
  item: ReportItem;
  changes: PropertyChangeEventArgs[];
}

export interface ItemRemoveEventArgs {
  type: "remove-item";
  item: ReportItem;
}

export interface ReportSectionEventMap {
  select: SelectEventArgs;
  change: ChangeEventArgs;
}
