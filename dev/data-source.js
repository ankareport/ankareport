const dataSource = [
  { type: "text", label: "Header 1", field: "header1" },
  { type: "text", label: "Header 2", field: "header2" },
  {
    label: "Content",
    field: "content",
    children: [
      { type: "text", label: "Name", field: "name" },
      {
        label: "Invoices",
        field: "invoices",
        children: [
          { type: "image", label: "Client Logo", field: "client_logo" },
          { type: "text", label: "Invoice No", field: "invoice_no" },
          { type: "text", label: "Invoice Date", field: "invoice_date" },
          { type: "text", label: "Invoice Total", field: "invoice_total" },
        ],
      },
    ],
  },
  { type: "text", label: "Footer 1", field: "footer1" },
  { type: "text", label: "Footer 2", field: "footer2" },
];
