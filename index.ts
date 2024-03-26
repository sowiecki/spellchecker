import { readFileSync } from 'node:fs';
import chalk from 'chalk';

import { filterBySimilarity } from './utils';

const checkSpellingOnFile = (filePathToCheck: string, dictionaryFilePath = './dictionary.txt') => {
  // File is assumed to be one word per line
  // Each word is unique, so we can use a Set for slightly more efficient accessing
  const dictionary: Set<string> = new Set(readFileSync(dictionaryFilePath, 'utf8').split('\n'));

  // File is assumed to be multiple words and sentences per line.
  // These are split into arrays of lines, which are further split into arrays of words.
  // With more time, organizing sentences into an object where spelling errors can be collected in adjacent properties would be preferable,
  //  so that, for example, multiple spelling suggestions could be given per line
  const fileToCheck: string[][] = readFileSync(filePathToCheck, 'utf8')
    .replaceAll(`n't`, ' not') // handle 'not' contractions
    .replaceAll(/[^\w\s]/gi, '') // Strip special characters
    .split('\n')
    .map((line: string) => line.split(' '));

  fileToCheck.forEach((line: string[], lineIndex: number) =>
    line.forEach((word: string, wordIndex: number) => {
      if (dictionary.has(word.toLowerCase()) || word[0].toUpperCase() === word[0]) {
        // Word is not mispelled or is a proper noun, skip giving suggestions
        return;
      }

      // Do a first pass of likely suggestions
      // There's probably a more efficient way to handle this other than converting to an array
      // but in the interest of time I'll leave this
      const likelySuggestions = Array.from(dictionary).filter(filterBySimilarity(word, [word.length]));

      // Do a second loop to find suggestions if first pass finds no likely matches
      // Probably a more efficient way to do this without a second loop
      // Making this a function so it's only invoked if necessary
      const genUnlikelySuggestions = () => Array.from(dictionary).filter(filterBySimilarity(word, [word.length, word.length + 1, word.length - 1], false));


      // Print misspelling with context
      console.log(line.join(' ').replace(word, chalk.white.bgRed.bold(word)));
      console.log(
        `Spelling suggestions for "${chalk.white.bgRed.bold(word)}" on line ${lineIndex} of column ${wordIndex}:`,
        (likelySuggestions.map((word) => chalk.white.bgGreen.bold(word)) || genUnlikelySuggestions().map((word) => chalk.white.bgBlue.bold(word))).join(', '));
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
