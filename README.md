<h1 align="center">Anka Report</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/ankareport" title="npm package">
    <img src="https://img.shields.io/npm/v/ankareport">
  </a>
  <a href="https://opensource.org/licenses/MIT" title="License: MIT">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg">
  </a>
</p>

<h3 align="center">
  <a href="https://ankareport.github.io/docs/getting-started" target="_blank" title="Documentation">Docs</a> |
  <a href="https://ankareport.github.io/examples/playground" target="_blank" title="Playground">Playground</a>
</h3>

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/ankareport/assets/designer/designer.png" alt="designer">
</p>

## Purpose

Free & Open Source Web Reporting Tool

## Setup

```html
<html>
  <head>
    ...

    <link
      rel="stylesheet"
      href="https://unpkg.com/ankareport/dist/ankareport.css"
    />
  </head>
  <body>
    ...

    <script src="https://unpkg.com/ankareport/dist/ankareport.js"></script>
  </body>
</html>
```

## Quick Start

```html
<div id="designer"></div>

<script>
  const designerDiv = document.getElementById("designer");
  const designer = AnkaReport.designer({
    element: designerDiv,
    dataSource: dataSource,
    layout: layout,
    onSaveButtonClick: (layout) => {
      console.log(layout);
    },
  });
</script>
```

```html
<div id="report"></div>

<script>
  const reportDiv = document.getElementById("report");
  const report = AnkaReport.render({
    element: reportDiv,
    layout: layout,
    data: data,
  });
</script>
```

<details>
  <summary>Example Data Source</summary>

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
```

</details>

<details>
  <summary>Example Layout</summary>

```js
const layout = {
  width: 500,
  headerSection: {
    height: 50,
    items: [
      {
        text: "Header 1",
        binding: "header1",
        x: 5,
        y: 4,
        width: 100,
        height: 20,
      },
      {
        text: "Header 2",
        binding: "header2",
        x: 5,
        y: 28,
        width: 200,
        height: 20,
      },
    ],
  },
  contentSection: {
    height: 75,
    binding: "content",
    items: [
      {
        text: "Label1",
        binding: "name",
        x: 9,
        y: 6,
        width: 100,
        height: 20,
      },
      {
        text: "Label2",
        binding: "surname",
        x: 9,
        y: 26,
        width: 200,
        height: 40,
      },
    ],
  },
  footerSection: {
    height: 40,
    items: [
      {
        text: "Copyright",
        x: 150,
        y: 8,
        width: 100,
        height: 20,
      },
      {
        text: "Desc",
        binding: "footer2",
        x: 250,
        y: 8,
        width: 100,
        height: 20,
      },
    ],
  },
};
```

</details>

<details>
  <summary>Example Data</summary>

```js
const data = {
  header1: "Header 1",
  header2: "Header 2",
  content: [
    {
      name: "John1",
      surname: "Doe1",
    },
    {
      name: "John2",
      surname: "Doe2",
    },
    {
      name: "John3",
      surname: "Doe3",
    },
  ],
  footer1: "Footer 1",
  footer2: "Footer 2",
};
```

</details>
