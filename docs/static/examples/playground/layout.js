const layout = {
  width: 500,
  headerSection: {
    height: 52,
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
