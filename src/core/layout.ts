export interface ReportLayout {
  width: number;
  headerSection: ReportSection;
  contentSection: ReportSection;
  footerSection: ReportSection;
}

export interface ReportSection {
  height: number;
  binding: string;
  items: ReportItem[];
}

export interface ReportItem {
  text: string;
  binding?: string;
  x: number;
  y: number;
  width: number;
  height: number;
}
