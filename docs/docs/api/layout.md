---
sidebar_position: 2
---

# Layout

```ts title="ILayout"
interface ILayout {
  width: number;
  headerSection: ISection;
  contentSection: ISection;
  footerSection: ISection;
}
```

```ts title="ISection"
interface ISection {
  height: number;
  binding: string;
  items: IReportItem[];
}
```

```ts title="IReportItem"
interface IReportItem {
  text: string;
  binding?: string;
  x: number;
  y: number;
  width: number;
  height: number;
}
```
