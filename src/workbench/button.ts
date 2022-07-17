import Control from "../core/control";
import "./button.css";

export default class Button extends Control {
  constructor(text: string) {
    super("anka-button");

    this.text = text;
  }
}
