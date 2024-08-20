import ImageReportItem from "./imageReportItem";
import TextReportItem from "./textReportItem";
import BarcodeReportItem from "./barcodeReportItem";

export { default as TextReportItem } from "./textReportItem";
export { default as ImageReportItem } from "./imageReportItem";
export { default as BarcodeReportItem } from "./barcodeReportItem";

export type ReportItem = TextReportItem | ImageReportItem | BarcodeReportItem;
