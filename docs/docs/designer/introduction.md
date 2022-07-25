---
sidebar_position: 1
---

# Introduction

Have a look at [designer api](../api/designer)

## Basic Initialization

```html
<script>
  const designerDiv = document.getElementById("designer");
  const designer = AnkaReport.designer({ element: designerDiv });
</script>
```

## Full Initialization

```html
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
