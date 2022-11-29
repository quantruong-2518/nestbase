export function JSONCopy<T>(obj: T): T {
  if (!obj) {
    return null;
  }
  return JSON.parse(JSON.stringify(obj));
}

export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> {
  const result = { ...obj };
  keys.forEach((c) => {
    delete result[c];
  });

  return result;
}

export function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  return keys.reduce((prev, cur) => {
    prev[cur] = obj[cur];
    return prev;
  }, {} as T);
}
