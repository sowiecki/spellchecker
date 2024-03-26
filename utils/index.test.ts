/* eslint-env jest */
import { sortLettersAlphabetically, filterBySimilarity } from './';

describe('Utilities', () => {
  describe('sortLettersAlphabetically', () => {
    it('should sort letters in a string alphabetically', () => {
      expect(sortLettersAlphabetically('abcdefghijklmnopqrstuvwxyz')).toEqual('abcdefghijklmnopqrstuvwxyz');
      expect(sortLettersAlphabetically('zyxwvutsrqponmlkjihgfedcba')).toEqual('abcdefghijklmnopqrstuvwxyz');
      expect(sortLettersAlphabetically('foobar')).toEqual('abfoor');
      expect(sortLettersAlphabetically('bizzbazz')).toEqual('abbizzzz');
    });
  });

  describe('filterBySimilarity', () => {
    const MOCK_DICTIONARY = [
      'foo',
      'bar',
      'bizz',
      'bazz'
    ];

    it('should filter similar words from an array', () => {
      expect(MOCK_DICTIONARY.filter(filterBySimilarity('foo', [3]))).toEqual(['foo']);
      expect(MOCK_DICTIONARY.filter(filterBySimilarity('ofo', [3]))).toEqual(['foo']);
      expect(MOCK_DICTIONARY.filter(filterBySimilarity('oof', [3]))).toEqual(['foo']);
    });
  });
});
