// TODO: Math.Round is not the perfect method to round a number => https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
export default function roundToPrecision2(number: number): number {
  return Math.round(number * 100) / 100
}
