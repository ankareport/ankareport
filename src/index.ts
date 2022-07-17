import Designer from "./workbench/designer";

export const AnkaReport = {
  version: function () {
    return "0.1.0";
  },
  init: function (element: HTMLDivElement) {
    return new Designer(element);
  },
};

export default AnkaReport;
