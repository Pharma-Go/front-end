export function formatPrice(value: number): string {
  const val = (value / 100).toFixed(2).replace(".", ",");
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
