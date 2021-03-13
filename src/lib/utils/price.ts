export function cleanCurrencyMask(price: string): string {
  const regexp = new RegExp(/[R.,$\s]/gm);

  return price.replaceAll(regexp, "");
}
