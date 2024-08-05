import ImageReportItem from "./imageReportItem";
import TextReportItem from "./textReportItem";

export { default as TextReportItem } from "./textReportItem";
export { default as ImageReportItem } from "./imageReportItem";

export type ReportItem = TextReportItem | ImageReportItem;
