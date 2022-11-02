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

export interface IReportItem extends IStyle {
  x: number;
  y: number;
  width: number;
  height: number;
  name: string;
  text: string;
  binding?: string;
}

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
