export function roundToPrecision2(number: number) {
  return Math.round(number * 100) / 100
}

export function pipe(f: any, g: any) {
  return (...args: any) => g(f(...args))
}
