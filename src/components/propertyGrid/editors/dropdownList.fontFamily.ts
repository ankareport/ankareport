import DropdownList from "./dropdownList";

export function createFontFamilyDropdownEditor() {
  return new DropdownList({
    defaultValue: "Arial",
    items: [
      { value: "Arial", label: "Arial" },
      { value: "Helvetica", label: "Helvetica" },
      { value: "Myriad Pro", label: "Myriad Pro" },
      { value: "Delicious", label: "Delicious" },
      { value: "Verdana", label: "Verdana" },
      { value: "Georgia", label: "Georgia" },
      { value: "Courier", label: "Courier" },
      { value: "Comic Sans MS", label: "Comic Sans MS" },
      { value: "Impact", label: "Impact" },
      { value: "Monaco", label: "Monaco" },
      { value: "Optima", label: "Optima" },
      { value: "Hoefler Text", label: "Hoefler Text" },
      { value: "Plaster", label: "Plaster" },
      { value: "Engagement", label: "Engagement" },
    ],
  });
}
