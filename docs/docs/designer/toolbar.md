---
sidebar_position: 4
---

# Toolbar

## Save Button

```html
<script>
  const designerDiv = document.getElementById("designer");
  const designer = AnkaReport.designer({
    element: designerDiv,
  });

  // highlight-start
  designer.menu.saveButton.addEventListener("click", () => {
    const layout = designer.toJSON();
    console.log(layout);
  });
  // highlight-end
</script>
```
