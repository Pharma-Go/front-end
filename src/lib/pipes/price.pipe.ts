export function formatPrice(value: any) {
  const val = (value / 100).toFixed(2).replace(".", ",");
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
