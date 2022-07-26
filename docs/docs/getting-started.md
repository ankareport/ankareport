---
sidebar_position: 1
---

# Getting Started

Get started by **creating a html file**.

### HTML

```html title="Style"
<link
  rel="stylesheet"
  href="https://unpkg.com/ankareport/dist/ankareport.css"
/>
```

```html title="Script"
<script src="https://unpkg.com/ankareport/dist/ankareport.js"></script>
```

```html title="Example"
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Anka Report</title>

    <link
      rel="stylesheet"
      href="https://unpkg.com/ankareport/dist/ankareport.css"
    />
  </head>
  <body>
    ...

    <script src="https://unpkg.com/ankareport/dist/ankareport.js"></script>
    <script>
      console.log(AnkaReport.version);
    </script>
  </body>
</html>
```

## Designer

Have a look at [designer](./designer/introduction) page

```html
<script>
  const designerDiv = document.getElementById("designer");
  const designer = AnkaReport.designer({
    element: designerDiv,
    ...
  });
</script>
```

## Renderer

Have a look at [renderer](./renderer/introduction) page

```html
<script>
  const rendererDiv = document.getElementById("renderer");
  const renderer = AnkaReport.renderer({
    element: rendererDiv,
    layout: ...,
    data: ...,
  });
</script>
```
