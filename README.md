I chose the spellcheck challenge, below are the instructions for how to run my program.

I created some samples to test it against in `/documents`, but I imagine you have your own files to test as well. (`sample2.txt` is the original README with some jumbled words)

As stated in the code comments, the spellchecking algorithm is far from perfect, but it's the best I came up with independently within a few hours of work.

Thank you for your consideration!

# Prerequisites
- Must use Node 18.18.x (See: ts-node issue [#1997](https://github.com/TypeStrong/ts-node/issues/1997#issuecomment-1974168425))

# Getting Started

```bash
nvm use 18.18 # if using nvm to manage Node versions
npm install
npm start --filepathtocheck='./documents/sample1.txt'

# The dictionary file uses can also be specified (defaults to using the included dictionary.txt)
npm start --filepathtocheck='./documents/sample2.txt' --dictionaryFilePath='./dictionary.txt'
```

In the interest of following the intructions for running the program e.g. `my-cool-spellchecker dictionary.txt file-to-check.txt`, you could add this alias function to your `.bashrc` file:
```bash
spellchecker() {
  if [ ! -z $2 ]
  then
      npm start --filepathtocheck="${1}" --dictionaryFilePath="${2}"
  else
      npm start --filepathtocheck="${1}"
  fi
}
```

The program could then be run using `spellchecker './documents/sample1.txt' './dictionary.txt'` from within the project directory.

# Running tests

```bash
npm run test
```
