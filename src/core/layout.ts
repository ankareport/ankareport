export interface ILayout {
  width: number;
  headerSection: ISection;
  contentSection: ISection;
  footerSection: ISection;
}

export interface ISection {
  height: number;
  binding: string;
  items: IReportItem[];
}

export interface IReportItem {
  text: string;
  binding?: string;
  x: number;
  y: number;
  width: number;
  height: number;
}
