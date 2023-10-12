function capitalize(string:string) {
  if (!string) throw new Error("capitalize: no string provided");

  // take first character, uppercase it
  // add the rest of the string
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function toPascalCase(str:string) {
  if (!str) throw new Error("toPascalCase: no string provided");
  // splitting words by dash
  const words = str.split("-");
  // use capitalize function to capitalize every word
  const capitalized = words.map((word) => capitalize(word));
  // glue up words with .join()
  return capitalized.join("");
}
