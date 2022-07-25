---
sidebar_position: 2
---

# Data Source

The `dataSource` option will list items on the `Data Source` panel and allows the user drag & drop item to designer.

It will assign `field` value to `binding` property of the report item element.

```js
const dataSource = [
  { label: "Header 1", field: "header1" },
  { label: "Header 2", field: "header2" },
  {
    label: "Content",
    children: [
      { label: "Name", field: "name" },
      { label: "Surname", field: "surname" },
    ],
  },
  { label: "Footer 1", field: "footer1" },
  { label: "Footer 2", field: "footer2" },
];

const designerDiv = document.getElementById("designer");
const designer = AnkaReport.designer({
  element: designerDiv,
  // highlight-next-line
  dataSource: dataSource,
  layout: layout,
});
```
