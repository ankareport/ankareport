export interface ITranslations {
    // BaseReportItemProperties
    name: string;
    x: string;
    y: string;
    width: string;
    height: string;

    // StyleProperties
    color: string;
    backgroundColor: string;
    textAlign: string;
    borderWidth: string;
    borderStyle: string;
    borderColor: string;
    fontFamily: string;
    fontSize: string;
    fontWeight: string;

    // TextReportItemProperties
    text: string;
    binding: string;
    format: string;

    // ImageReportItemProperties
    source: string;

    // BarcodeReportItemProperties
    value: string;
    barWidth: string;

    // Toolbar buttons
    save: string;
    undo: string;
    redo: string;
    image: string;
    barcode: string;
    section: string;

    // Elements tree section labels
    header: string;
    content: string;
    footer: string;

    // Sidebar panel/tab titles
    dataSource: string;
    elements: string;
    properties: string;
}

export const defaultTranslations: ITranslations = {
    name: "Name",
    x: "X",
    y: "Y",
    width: "Width",
    height: "Height",
    color: "Color",
    backgroundColor: "Background Color",
    textAlign: "Text Align",
    borderWidth: "Border Width",
    borderStyle: "Border Style",
    borderColor: "Border Color",
    fontFamily: "Font Family",
    fontSize: "Font Size",
    fontWeight: "Font Weight",
    text: "Text",
    binding: "Binding",
    format: "Format",
    source: "Source",
    value: "Value",
    barWidth: "Bar Width",
    save: "Save",
    undo: "Undo",
    redo: "Redo",
    image: "Image",
    barcode: "Barcode",
    section: "Section",
    header: "Header",
    content: "Content",
    footer: "Footer",
    dataSource: "Data Source",
    elements: "Elements",
    properties: "Properties",
};