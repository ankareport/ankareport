import { ILayout } from "../layout";
import { generateItems } from "./generate";

describe("getItems", () => {
  test("get correct items", () => {
    const layout = getLayout();

    const data = {
      title: "Report1",
      invoices: [
        {
          ficheNo: "0000000001",
          client: "Client1",
          lines: [
            { stock: "Stock 1", description: "Description 1" },
            { stock: "Stock 2", description: "Description 2" },
          ],
        },
        {
          ficheNo: "0000000002",
          client: "Client2",
          lines: [
            { stock: "Stock 3", description: "Description 3" },
            { stock: "Stock 4", description: "Description 4" },
          ],
        },
      ],
    };

    const items = generateItems(layout, data);

    expect(items.length).toBe(16);

    const client2 = items.find(x => x.type === "text" && x.text === "Client2");
    const footer2 = items.find(x => x.type === "text" && x.text === "Footer 2");

    expect(client2).toEqual({
      type: "text",
      name: "",
      binding: "client",
      text: "Client2",
      x: 25,
      y: 400,
      width: 80,
      height: 10,
      color: "#000000",
      fontFamily: "Arial",
      fontSize: "12px",
    });

    expect(footer2).toEqual({
      type: "text",
      name: "",
      text: "Footer 2",
      x: 20,
      y: 670,
      width: 40,
      height: 10,
      color: "#000000",
      fontFamily: "Arial",
      fontSize: "12px",
    });
  });
});

function getLayout(): ILayout {
  return {
    width: 500,
    headerSection: {
      height: 50,
      binding: "",
      items: [
        { type: "text", x: 0, y: 0, width: 20, height: 10, name: "", text: "Header1", binding: "title" },
        { type: "text", x: 20, y: 20, width: 40, height: 10, name: "", text: "Header2" },
      ],
    },
    contentSection: {
      height: 100,
      binding: "invoices",
      items: [
        { type: "text", x: 25, y: 25, width: 20, height: 10, name: "", text: "", binding: "ficheNo" },
        { type: "text", x: 25, y: 50, width: 80, height: 10, name: "", text: "", binding: "client" },
      ],
      sections: [
        {
          height: 100,
          binding: "lines",
          items: [
            { type: "text", x: 25, y: 25, width: 20, height: 10, name: "", text: "", binding: "stock" },
            { type: "text", x: 25, y: 50, width: 80, height: 10, name: "", text: "", binding: "description" },
          ],
          sections: [
          ],
        },
      ],
    },
    footerSection: {
      height: 60,
      binding: "",
      items: [
        { type: "text", x: 0, y: 0, width: 20, height: 10, name: "", text: "Footer 1" },
        { type: "text", x: 20, y: 20, width: 40, height: 10, name: "", text: "Footer 2" },
      ],
    },
  };
}
