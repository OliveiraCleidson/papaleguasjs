import { Gender } from '@/enums/gender';

export class WordBrUtils {
  static getWordGenderBr(word: string): Gender {
    switch (word.substring(word.length - 1, word.length).toLowerCase()) {
      case 'o':
        return Gender.Male;
      case 'a':
        return Gender.Female;
      default:
        return Gender.Male;
    }
  }

  static getWordPluralBr(word: string): string {
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
