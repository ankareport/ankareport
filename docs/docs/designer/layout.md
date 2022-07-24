---
sidebar_position: 2
---

# Layout

```html
<script>
  const designerDiv = document.getElementById("designer");
  const designer = AnkaReport.designer(designerDiv);

  designer.menu.saveButton.addEventListener("click", () => {
    console.log(designer.toJSON());
  });

  designer.loadJSON(layout);
</script>
```
