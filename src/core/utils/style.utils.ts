import StyleProperties from "../styleProperties";

export function isValidStyle(value: any) {
  return !(value === undefined || value === null || value === "");
}

export class JoinStyles {
  private stylesList: StyleProperties[] = [];

  join(styles: StyleProperties) {
    this.stylesList.push(styles);
  }

  getList() {
    return this.stylesList;
  }

  getStyle<T extends keyof StyleProperties, TDefault>(
    property: T,
    defaultValue: TDefault,
  ) {
    for (let i = this.stylesList.length - 1; i >= 0; i--) {
      const styles = this.stylesList[i];

      if (isValidStyle(styles[property])) {
        return styles[property];
      }
    }

    return defaultValue;
  }
}
