export default class EventEmitter {
  private readonly events = new Map<string, Function[]>();

  on(event: string, callback: Function) {
    let callbacks = this.events.get(event);

    if (!callbacks) callbacks = [];

    callbacks.push(callback);

    this.events.set(event, callbacks);
  }

  off(event: string, callback: Function) {
    const callbacks = this.events.get(event);

    if (!callbacks) return;

    const callbackIndex = callbacks.findIndex((x) => x === callback);

    if (callbackIndex < 0) return;

    callbacks.slice(callbackIndex, callbackIndex + 1);
  }

  emit(event: string, args: any) {
    const callbacks = this.events.get(event);

    if (!callbacks) return;

    callbacks.forEach((f) => f(args));
  }
}
