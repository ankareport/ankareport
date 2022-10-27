import DropdownList from "./dropdownList";

export function createTextAlignDropdownEditor() {
  return new DropdownList({
    defaultValue: "Arial",
    items: [
      { value: "", label: "Left" },
      { value: "center", label: "Center" },
      { value: "right", label: "Right" },
    ],
  });
}
