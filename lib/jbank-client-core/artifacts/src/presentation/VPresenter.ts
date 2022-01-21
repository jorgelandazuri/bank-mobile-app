export abstract class VPresenter<V> {
  protected readonly view: V;

  protected constructor(view: V) {
    this.view = view;
  }
}
