export const sortLettersAlphabetically = (word: string) => word
  .split('')
  .sort()
  .join('');

// Here is the spellingchecking algorithm I came up with on my own
// It is far from perfect, and struggles with larger words, but in the interest of time I think it's sufficient
// With more time, I'd Google suggestions for spell-checking algorithms (I'd be surprised if there weren't NPM libraries for it)
export const filterBySimilarity = (wordToCheck: string, wordLengths: number[], matchExact = true) => (dictionaryWord: string) => {
  const sortedDictionaryWord = sortLettersAlphabetically(dictionaryWord);
  const sortedUserWord = sortLettersAlphabetically(wordToCheck);

  const hasSimilarLength = wordLengths.includes(dictionaryWord.length);
  const hasSameLetters = sortedDictionaryWord === sortedUserWord;
  const hasSimilarLetters = sortedDictionaryWord.slice(0, 1) === sortedUserWord.slice(0, 1)
    && sortedDictionaryWord.slice(sortedUserWord.length - 2, sortedUserWord.length - 1) === sortedUserWord.slice(sortedUserWord.length - 2, sortedUserWord.length - 1);

  const hasSameStartAndEndLetters = dictionaryWord.slice(0, 1) === wordToCheck.slice(0, 1)
    && dictionaryWord.slice(dictionaryWord.length - 2, dictionaryWord.length - 1) === wordToCheck.slice(wordToCheck.length - 2, wordToCheck.length - 1);

  return hasSimilarLength && ((matchExact ? hasSameLetters : hasSimilarLetters) || hasSameStartAndEndLetters);
};
