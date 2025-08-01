import { TextAlign } from "./styleProperties";

export interface ILayout extends IStyle {
  width: number;
  headerSection: ISection;
  contentSection: ISection;
  footerSection: ISection;
}

export interface ISection extends IStyle {
  height: number;
  binding: string;
  items?: IReportItem[];
  sections?: ISection[];
}

export interface IBaseReportItem extends IStyle {
  x: number;
  y: number;
  width: number;
  height: number;
  name: string;
}

export interface ITextReportItem extends IBaseReportItem {
  type: "text";
  text: string;
  binding?: string;
  format?: string;
}

export interface IImageReportItem extends IBaseReportItem {
  type: "image";
  source: string;
  binding?: string;
}

export interface IBarcodeReportItem extends IBaseReportItem {
  type: "barcode";
  value: string;
  binding?: string;
  format?: string;
  barWidth: 1 | 2 | 3 | 4;
}

export type IReportItem = ITextReportItem | IImageReportItem | IBarcodeReportItem;

export interface IStyle {
  color?: string;
  backgroundColor?: string;
  textAlign?: TextAlign;
  borderWidth?: number;
  borderStyle?: string;
  borderColor?: string;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
}
