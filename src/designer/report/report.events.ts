import { PropertyChangeEventArgs } from "../../core/properties";
import {
  ChangeEventArgs as ReportSectionChangeEventArgs,
  SelectEventArgs
} from "../reportSection/report-section.events";
import Report from "./report";

export type ChangeEventArgs =
  | ReportChangeEventArgs
  | ReportSectionChangeEventArgs;

export interface ReportChangeEventArgs {
  type: "change-report";
  report: Report;
  changes: PropertyChangeEventArgs[];
}

export interface ReportEventMap {
  change: ChangeEventArgs;
  select: SelectEventArgs;
}
