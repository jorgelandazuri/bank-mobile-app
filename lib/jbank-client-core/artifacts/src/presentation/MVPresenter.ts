export abstract class MVPresenter<V, M> {
  protected readonly view: V;
  protected readonly model: M;

  protected constructor(view: V, model: M) {
    this.view = view;
    this.model = model;
  }
}
