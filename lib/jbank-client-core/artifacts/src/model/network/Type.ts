export interface StringMap<T> {
  [key: string]: T;
}

export interface NumberMap<T> {
  [key: number]: T;
}

export class ErrorCode extends Error {
  public readonly code: number;

  constructor(code: number) {
    super('');
    this.code = code;
  }
}

export class ObjectMerge {
  static merge<T>(partial: T, destination: T): T {
    const result: T = Object.assign(destination, {});
    Object.keys(partial).forEach((key) => {
      if (partial[key] !== undefined && partial[key] !== null) {
        result[key] = partial[key];
      }
    });
    return result;
  }
}
