export default function currencyFormatter(value) {
  return new Intl.NumberFormat("en-IN", { maximumSignificantDigits: 3 }).format(
    parseFloat(value)
  );
}
