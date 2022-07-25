---
sidebar_position: 1
---

# Introduction

## Initialization

```html
<script>
  const rendererDiv = document.getElementById("renderer");
  const renderer = AnkaReport.renderer({
    element: rendererDiv,
    layout: layout,
    data: data,
  });
</script>
```

## Example Data

```js
const data = {
  header1: "Header 1",
  header2: "Header 2",
  content: [
    { name: "John1", surname: "Doe1" },
    { name: "John2", surname: "Doe2" },
    { name: "John3", surname: "Doe3" },
  ],
  footer1: "Footer 1",
  footer2: "Footer 2",
};
```

## Example Layout

Have a look at [layout api](../api/layout).

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
        y: 5,
        width: 100,
        height: 20,
      },
      {
        text: "Header 2",
        binding: "header2",
        x: 5,
        y: 30,
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
      { text: "Copyright", x: 150, y: 8, width: 100, height: 20 },
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
