import DropdownList from "./dropdownList";

export function createBorderStyleDropdownEditor() {
  return new DropdownList({
    defaultValue: "none",
    items: [
      { value: "none", label: "none" },
      { value: "dotted", label: "dotted" },
      { value: "dashed", label: "dashed" },
      { value: "solid", label: "solid" },
      { value: "solid", label: "solid" },
      { value: "double", label: "double" },
      { value: "groove", label: "groove" },
      { value: "ridge", label: "ridge" },
      { value: "inset", label: "inset" },
      { value: "outset", label: "outset" },
    ],
  });
}
