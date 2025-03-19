export function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(price);
}

export function formatNumber(number) {
  return new Intl.NumberFormat("en-US").format(number);
}
