export default function currencyFormatter(value) {
  return new Intl.NumberFormat("en-IN").format(parseFloat(value));
}
