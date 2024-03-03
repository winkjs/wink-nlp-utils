
# wink-nlp-utils

NLP Functions for amplifying negations, managing elisions, creating ngrams, stems, phonetic codes to tokens and more.

### [![Build Status](https://app.travis-ci.com/winkjs/wink-nlp-utils.svg?branch=master)](https://app.travis-ci.com/github/winkjs/wink-nlp-utils) [![Coverage Status](https://coveralls.io/repos/github/winkjs/wink-nlp-utils/badge.svg?branch=master)](https://coveralls.io/github/winkjs/wink-nlp-utils?branch=master) [![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg)](https://gitter.im/winkjs/Lobby)

[<img align="right" src="https://decisively.github.io/wink-logos/logo-title.png" width="100px" >](http://wink.org.in/)

Prepare raw text for Natural Language Processing (NLP) using **`wink-nlp-utils`**. It offers a set of [APIs](http://wink.org.in/wink-nlp-utils/) to work on [strings](http://wink.org.in/wink-nlp-utils/#string) such as names, sentences, paragraphs and [tokens](http://wink.org.in/wink-nlp-utils/#tokens) represented as an array of strings/words. They perform the required pre-processing for many ML tasks such as [semantic search](https://www.npmjs.com/package/wink-bm25-text-search), and [classification](https://www.npmjs.com/package/wink-naive-bayes-text-classifier).

<table><tr><td>👉🏽</td><td>
    We <b>recommend using <a href="https://github.com/winkjs/wink-nlp?tab=readme-ov-file#readme">winkNLP</a></b> for core natural language processing tasks. It <a href="https://winkjs.org/wink-nlp/document.html">performs</a> tokenization, sentence boundary detection, and named entity recognition at a <a href="https://observablehq.com/@winkjs/how-to-measure-winknlps-speed-on-browsers">blazing fast speeds</a>. It supports all your <a href="https://winkjs.org/wink-nlp/leveraging-out.html">text processing needs</a> starting from sentiment analysis, POS tagging, lemmatization, stemming, stop word removal, negation handling, bigrams to frequency table creation and more. <b><a href="https://github.com/winkjs/wink-nlp?tab=readme-ov-file#readme">WinkNLP</a></b> features user-friendly declarative APIs for <a href="https://winkjs.org/wink-nlp/each.html">iteration</a>, <a href="https://winkjs.org/wink-nlp/filter.html">filtering</a>, and <a href="https://winkjs.org/wink-nlp/visualizing-markup.html">text visualization</a>, and <a href="https://winkjs.org/wink-nlp/wink-nlp-in-browsers.html">runs</a> on web browsers.
</td></tr></table>

### Installation
Use [npm](https://www.npmjs.com/package/wink-nlp-utils) to install:
```
npm install wink-nlp-utils --save
```


### Getting Started
The `wink-nlp-utils` provides over **36 utility functions** for Natural Language Processing tasks. Some representative examples are extracting person's name from a string, compose training corpus for a chat bot, sentence boundary detection, tokenization and stop words removal:
```javascript

// Load wink-nlp-utils
var nlp = require( 'wink-nlp-utils' );

// Extract person's name from a string:
var name = nlp.string.extractPersonsName( 'Dr. Sarah Connor M. Tech., PhD. - AI' );
console.log( name );
// -> 'Sarah Connor'

// Compose all possible sentences from a string:
var str = '[I] [am having|have] [a] [problem|question]';
console.log( nlp.string.composeCorpus( str ) );
// -> [ 'I am having a problem',
// ->   'I am having a question',
// ->   'I have a problem',
// ->   'I have a question' ]

// Sentence Boundary Detection.
var para = 'AI Inc. is focussing on AI. I work for AI Inc. My mail is r2d2@yahoo.com';
console.log( nlp.string.sentences( para ) );
// -> [ 'AI Inc. is focussing on AI.',
//      'I work for AI Inc.',
//      'My mail is r2d2@yahoo.com' ]

// Tokenize a sentence.
var s = 'For details on wink, check out http://winkjs.org/ URL!';
console.log( nlp.string.tokenize( s, true ) );
// -> [ { value: 'For', tag: 'word' },
//      { value: 'details', tag: 'word' },
//      { value: 'on', tag: 'word' },
//      { value: 'wink', tag: 'word' },
//      { value: ',', tag: 'punctuation' },
//      { value: 'check', tag: 'word' },
//      { value: 'out', tag: 'word' },
//      { value: 'http://winkjs.org/', tag: 'url' },
//      { value: 'URL', tag: 'word' },
//      { value: '!', tag: 'punctuation' } ]

// Remove stop words:
var t = nlp.tokens.removeWords( [ 'mary', 'had', 'a', 'little', 'lamb' ] );
console.log( t );
// -> [ 'mary', 'little', 'lamb' ]

```

Try [experimenting with these examples on Runkit](https://npm.runkit.com/wink-nlp-utils) in the browser.

### Documentation
Check out the [wink NLP utilities API](http://winkjs.org/wink-nlp-utils/) documentation to learn more.

### Need Help?
If you spot a bug and the same has not yet been reported, raise a new [issue](https://github.com/winkjs/wink-nlp-utils/issues) or consider fixing it and sending a pull request.

### About wink
[Wink](http://winkjs.org/) is a family of open source packages for **Statistical Analysis**, **Natural Language Processing** and **Machine Learning** in NodeJS. The code is **thoroughly documented** for easy human comprehension and has a **test coverage of ~100%** for reliability to build production grade solutions.


### Copyright & License
**wink-nlp-utils** is copyright 2017-22 [GRAYPE Systems Private Limited](http://graype.in/).

It is licensed under the terms of the MIT License.
