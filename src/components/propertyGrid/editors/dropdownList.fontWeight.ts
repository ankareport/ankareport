import DropdownList from "./dropdownList";

export function createFontWeightDropdownEditor() {
  return new DropdownList({
    defaultValue: "",
    items: [
      { value: "", label: "Normal" },
      { value: "bold", label: "Bold" },
      { value: "lighter", label: "Lighter" },
      { value: "bolder", label: "Bolder" },
      { value: "100", label: "100" },
      { value: "200", label: "200" },
      { value: "300", label: "300" },
      { value: "400", label: "400" },
      { value: "500", label: "500" },
      { value: "600", label: "600" },
      { value: "700", label: "700" },
      { value: "800", label: "800" },
      { value: "900", label: "900" },
    ],
  });
}
