export enum CurrencyCode {
  EUR = "EUR",
  GBP = "GBP",
  USD = "USD",
}

type LocalePairs = "fr-FR" | "en-GB" | "en-US";

function getLocaleCode(currencyCode: CurrencyCode): LocalePairs {
  switch (currencyCode) {
    case CurrencyCode.EUR:
      return "fr-FR";
    case CurrencyCode.GBP:
      return "en-GB";
    case CurrencyCode.USD:
      return "en-US";
    default:
      return "fr-FR";
  }
}

// TODO: Add unit test
export default function getLocaleCurrencyNotation(
  value: number,
  currency = CurrencyCode.EUR
): string {
  const options = {
    currency: currency,
  };

  let valueToConvert = value;

  // NOTE: If value isn't a number, return `0 €`
  if ("number" !== typeof value || isNaN(value)) valueToConvert = 0;

  const localeCode = getLocaleCode(currency);

  return valueToConvert.toLocaleString(localeCode, options);
}
