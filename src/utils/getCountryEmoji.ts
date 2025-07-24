import Country_Type from "../types/types/country.type";

function getCountryEmoji(country: Country_Type): string {
  const code = country.code.toUpperCase();
  return String.fromCodePoint(
    ...Array.from(code).map((char) => 0x1f1e6 + char.charCodeAt(0) - 65)
  );
}

export default getCountryEmoji;
