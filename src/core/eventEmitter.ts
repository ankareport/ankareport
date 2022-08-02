export type EventCallback<TEventArgs> = (args: TEventArgs) => void;

export default class EventEmitter<TEventArgs> {
  private readonly callbacks: EventCallback<TEventArgs>[] = [];

  add(callback: EventCallback<TEventArgs>) {
    this.callbacks.push(callback);
  }

  remove(callback: EventCallback<TEventArgs>) {
    const callbackIndex = this.callbacks.findIndex((x) => x === callback);

    if (callbackIndex >= 0) {
      this.callbacks.splice(callbackIndex, 1);
    } else {
      console.warn(
        new Error(
          `Callback not found. Callback count: ${this.callbacks.length}.`,
        ),
      );
    }
  }

  emit(args: TEventArgs) {
    this.callbacks.forEach((f) => f(args));
  }
}
