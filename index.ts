import { readFileSync } from 'node:fs';

const sortLettersAlphabetically = (word: string) => word.split('').sort().join('');

const checkSpellingOnFile = (filePathToCheck: string, dictionaryFilePath = './dictionary.txt') => {
  // File is assumed to be one word per line
  const dictionary: string[] = readFileSync(dictionaryFilePath, 'utf8').split('\n');

  // File is assumed to be multiple words and sentences per line.
  // These are split into arrays of lines, which are further split into arrays of words.
  const fileToCheck: string[][] = readFileSync(filePathToCheck, 'utf8')
    .split('\n')
    .map((line: string) => line.split(' '));

  fileToCheck.forEach((line: string[], lineIndex: number) =>
    line.forEach((word: string, wordIndex: number) => {
      if (dictionary.includes(word.toLowerCase())) {
        // Word is not mispelled, nothing to do
        return;
      }

      // Do a first pass of likely suggestions
      const likelySuggestions = dictionary.filter((dictionaryWord: string) => {
        const sortedDictionaryWord = sortLettersAlphabetically(dictionaryWord);
        const sortedUserWord = sortLettersAlphabetically(word);

        const hasSameLength = word.length === dictionaryWord.length;
        const hasSameLetters = sortedDictionaryWord === sortedUserWord;

        const hasSameStartAndEndLetters = dictionaryWord.slice(0, 1) === word.slice(0, 1)
          && dictionaryWord.slice(dictionaryWord.length - 2, dictionaryWord.length - 1) === word.slice(word.length - 2, word.length - 1);

        return hasSameLength && (hasSameLetters || hasSameStartAndEndLetters);
      });

      // Do a second loop to find suggestions if first pass finds no likely matches
      // Probably a more efficient way to do this without a second loop
      const unlikelySuggestions = dictionary.filter((dictionaryWord: string) => {
        const sortedDictionaryWord = sortLettersAlphabetically(dictionaryWord);
        const sortedUserWord = sortLettersAlphabetically(word);

        const hasSimilarLength = [word.length, word.length + 1, word.length - 1].includes(dictionaryWord.length);
        const hasSimilarLetters = sortedDictionaryWord.slice(0, 1) === sortedUserWord.slice(0, 1)
          && sortedDictionaryWord.slice(sortedUserWord.length - 2, sortedUserWord.length - 1) === sortedUserWord.slice(sortedUserWord.length - 2, sortedUserWord.length - 1);

        const hasSameStartAndEndLetters = dictionaryWord.slice(0, 1) === word.slice(0, 1)
          && dictionaryWord.slice(dictionaryWord.length - 2, dictionaryWord.length - 1) === word.slice(word.length - 2, word.length - 1);

        return hasSimilarLength && (hasSimilarLetters || hasSameStartAndEndLetters);
      });

      console.log(`Spelling suggestions for "${word}" on line ${lineIndex} of column ${wordIndex}:`, (likelySuggestions || unlikelySuggestions).join(', '));
    }));
};

const run = () => {
  if (!process.env.npm_config_filepathtocheck) {
    console.log('Please specify a file to check with the CLI arg --filepathtocheck=./path/to/file.txt');

    return;
  }

  checkSpellingOnFile(process.env.npm_config_filepathtocheck, process.env.npm_config_dictionaryfilepath);
};

run();
