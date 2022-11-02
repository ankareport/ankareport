const dataSource = [
  { label: "Header 1", field: "header1" },
  { label: "Header 2", field: "header2" },
  {
    label: "Content",
    field: "content",
    children: [
      { label: "Name", field: "name" },
      {
        label: "Invoices",
        field: "invoices",
        children: [
          { label: "Invoice No", field: "invoice_no" },
          { label: "Invoice Date", field: "invoice_date" },
          { label: "Invoice Total", field: "invoice_total" },
        ],
      },
    ],
  },
  { label: "Footer 1", field: "footer1" },
  { label: "Footer 2", field: "footer2" },
];
