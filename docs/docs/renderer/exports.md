---
sidebar_position: 2
---

# Exports

## Export To PDF

Add [html2pdf](https://github.com/eKoopmans/html2pdf.js) script:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
```

Create export function:

```html
<script>
  const rendererDiv = document.getElementById("renderer");

  function exportToPdf() {
    html2pdf().from(rendererDiv).save("report.pdf");
  }
</script>
```
