import * as React from "react";

export abstract class ComponentMViewP<P, V, S> extends React.Component<V, S> {

  protected _presenter: P | undefined;

  protected constructor(props: Readonly<V>) {
    super(props);
  }

  protected set presenter(presenter: P) {
    this._presenter = presenter;
  }
}
