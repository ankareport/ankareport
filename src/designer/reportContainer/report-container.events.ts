import { ReportItem } from "../../core/reportItems";
import Report from "../report/report";
import { ChangeEventArgs as ReportChangeEventArgs } from "../report/report.events";
import ReportSection from "../reportSection/reportSection";

export type SelectEventArgs =
  | SelectReportEventArgs
  | SelectReportSectionEventArgs
  | SelectReportItemEventArgs;

export interface SelectReportEventArgs {
  type: "Report";
  element: Report;
}

export interface SelectReportSectionEventArgs {
  type: "ReportSection";
  element: ReportSection;
}

export interface SelectReportItemEventArgs {
  type: "ReportItem";
  element: ReportItem;
}

export interface ReportContainerEventMap {
  change: ReportChangeEventArgs;
  select: SelectEventArgs;
}
