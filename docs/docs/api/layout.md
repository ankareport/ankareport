---
sidebar_position: 2
---

# Layout

```ts title="ReportLayout"
export interface ReportLayout {
  width: number;
  headerSection: ReportSection;
  contentSection: ReportSection;
  footerSection: ReportSection;
}
```

```ts title="ReportSection"
export interface ReportSection {
  height: number;
  binding: string;
  items: ReportItem[];
}
```

```ts title="ReportItem"
export interface ReportItem {
  text: string;
  binding?: string;
  x: number;
  y: number;
  width: number;
  height: number;
}
```
