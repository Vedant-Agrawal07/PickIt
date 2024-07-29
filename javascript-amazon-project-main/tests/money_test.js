function format_currency(price_cents) {
  return (Math.round(price_cents) / 100).toFixed(2)
}

if (format_currency(2095) === '20.95') {
  console.log(`passed`);
}
else {
  console.log(`failed`);
}
if (format_currency(0) === '0.00') {
  console.log(`passed`);
}
else {
  console.log(`failed`);
}
if (format_currency(2000.690001) === '20.01') {
  console.log(`passed`);
}
else {
  console.log(`failed`);
}