/**
 *
 * @param valueToConvert date `string` or `Date` type
 * @param withTime defaults to false, set to true if you need time in the output `hh:mm:ss`
 * @returns a formatted French locale date `string` `dd/mm/yyyy` and  `dd/mm/yyyy, hh:mm:ss` if `withTime` is set to true.
 */
export default function formatDateFrenchLocale(
  valueToConvert: string | Date,
  withTime = false
): string {
  if (!valueToConvert) return "";

  const dateObject = new Date(valueToConvert);

  return withTime
    ? dateObject.toLocaleString("fr-FR")
    : dateObject.toLocaleDateString("fr-FR");
}
