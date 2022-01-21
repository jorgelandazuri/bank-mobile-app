export interface Cache<K, V> {
  get(key: K)

  save(key: K, value: V)
}
