const formatCurrencyBr = (value) => {
  let onlyNumbers = value.replace(/\D+/g, "");
  let floatValue = parseFloat(onlyNumbers) / 100;
  floatValue = Number.isNaN(floatValue) ? 0 : floatValue;
  return floatValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export {formatCurrencyBr};