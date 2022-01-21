export interface Service<R, S> {
  process(request: R): S
}
