"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPascalCase = void 0;
function capitalize(string) {
    if (!string)
        throw new Error("capitalize: no string provided");
    // take first character, uppercase it
    // add the rest of the string
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function toPascalCase(str) {
    if (!str)
        throw new Error("toPascalCase: no string provided");
    // splitting words by dash
    var words = str.split("-");
    // use capitalize function to capitalize every word
    var capitalized = words.map(function (word) { return capitalize(word); });
    // glue up words with .join()
    return capitalized.join("");
}
exports.toPascalCase = toPascalCase;
//# sourceMappingURL=utils.js.map