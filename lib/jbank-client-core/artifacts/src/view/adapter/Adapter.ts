export interface Adapter<I, O> {
  adapt(input: I): O;
}
