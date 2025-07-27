import moment from "moment";

export function formatNumber(value: number, format: string): string {
  if (/^f\d+$/.test(format)) {
    return value.toFixed(parseInt(format.substring(1)));
  }

  return value.toString();
}

export function formatDate(value: string, format: string): string {
  return moment(value).format(format);
}
