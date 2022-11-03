import StyleProperties from "../styleProperties";

export function isValidStyle(value: any) {
  return !(value === undefined || value === null || value === "");
}

export class MultipleStyles {
  private styles: StyleProperties[] = [];

  constructor(...styles: StyleProperties[]) {
    this.styles.push(...styles);
  }

  join(styles: StyleProperties) {
    this.styles.push(styles);
  }

  getList() {
    return this.styles;
  }

  getStyle<T extends keyof StyleProperties, TDefault>(
    property: T,
    defaultValue: TDefault,
  ) {
    for (let i = this.styles.length - 1; i >= 0; i--) {
      const styles = this.styles[i];

      if (isValidStyle(styles[property])) {
        return styles[property];
      }
    }

    return defaultValue;
  }
}
