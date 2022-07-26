---
sidebar_position: 3
---

# Layout

## Set Layout

### Constructor

```html
<script>
  const designerDiv = document.getElementById("designer");
  const designer = AnkaReport.designer({
    element: designerDiv,
    // highlight-next-line
    layout: layout,
  });
</script>
```

### Function

```html
<script>
  const designerDiv = document.getElementById("designer");
  const designer = AnkaReport.designer({
    element: designerDiv,
  });

  // highlight-next-line
  designer.loadLayout(layout);
</script>
```

## Get Layout

### Constructor

```html
<script>
  const designerDiv = document.getElementById("designer");
  const designer = AnkaReport.designer({
    element: designerDiv,
    layout: layout,
    // highlight-start
    onSaveButtonClick: (layout) => {
      console.log(layout);
    },
    // highlight-end
  });
</script>
```

### Function

```html
<script>
  const designerDiv = document.getElementById("designer");
  const designer = AnkaReport.designer({
    element: designerDiv,
  });

  designer.menu.saveButton.addEventListener("click", () => {
    // highlight-next-line
    const layout = designer.toJSON();
    console.log(layout);
  });
</script>
```
