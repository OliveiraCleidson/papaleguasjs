"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WordBrUtils = void 0;
const gender_1 = require("../enums/gender");
class WordBrUtils {
    static getWordGenderBr(word) {
        switch (word.substring(word.length - 1, word.length).toLowerCase()) {
            case 'o':
                return gender_1.Gender.Male;
            case 'a':
                return gender_1.Gender.Female;
            default:
                return gender_1.Gender.Male;
        }
    }
    static getWordPluralBr(word) {
        switch (word.substring(word.length - 2, word.length).toLowerCase()) {
            case 'ao':
                return `${word.substring(0, word.length - 2)}oes`;
            case 'el':
                return `${word.substring(0, word.length - 2)}eis`;
            case 'il':
                return `${word.substring(0, word.length - 2)}is`;
            case 'ul':
                return `${word.substring(0, word.length - 2)}us`;
            case 'al':
                return `${word.substring(0, word.length - 2)}ais`;
            case 'is':
                return `${word.substring(0, word.length - 2)}es`;
            case 'us':
                return `${word.substring(0, word.length - 2)}i`;
            case 'es':
                return `${word.substring(0, word.length - 2)}eis`;
            case 'os':
                return `${word.substring(0, word.length - 2)}es`;
            case 'as':
                return `${word.substring(0, word.length - 2)}ais`;
            case 'ns':
                return `${word.substring(0, word.length - 2)}ns`;
            case 'em':
                return `${word.substring(0, word.length - 2)}ens`;
            default:
                return `${word}s`;
        }
    }
}
exports.WordBrUtils = WordBrUtils;
//# sourceMappingURL=wordsBrUtils.js.map