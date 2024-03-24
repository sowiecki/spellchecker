import { readFileSync } from 'node:fs';

const checkSpellingOnFile = (filePathToCheck: string, dictionaryFilePath = './dictionary.txt') => {
  const dictionary: string[] = readFileSync(dictionaryFilePath, 'utf8').split('\n');
  const fileToCheck: string[] = readFileSync(filePathToCheck, 'utf8').split('\n');

  console.log('dictionary', dictionary);
  console.log('fileToCheck', fileToCheck);
};

const run = () => {
  if (!process.env.npm_config_filepathtocheck) {
    console.log('Please specify a file to check with the CLI arg --filepathtocheck=./path/to/file.txt');

    return;
  }

  checkSpellingOnFile(process.env.npm_config_filepathtocheck, process.env.npm_config_dictionaryfilepath);
};

run();
