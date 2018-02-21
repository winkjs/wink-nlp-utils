
# wink-nlp-utils

NLP Functions for amplifying negations, managing elisions, creating ngrams, stems, phonetic codes to tokens and more.

### [![Build Status](https://api.travis-ci.org/winkjs/wink-nlp-utils.svg?branch=master)](https://travis-ci.org/winkjs/wink-nlp-utils) [![Coverage Status](https://coveralls.io/repos/github/winkjs/wink-nlp-utils/badge.svg?branch=master)](https://coveralls.io/github/winkjs/wink-nlp-utils?branch=master) [![Inline docs](http://inch-ci.org/github/winkjs/wink-nlp-utils.svg?branch=master)](http://inch-ci.org/github/winkjs/wink-nlp-utils) [![dependencies Status](https://david-dm.org/winkjs/wink-nlp-utils/status.svg)](https://david-dm.org/winkjs/wink-nlp-utils) [![devDependencies Status](https://david-dm.org/winkjs/wink-nlp-utils/dev-status.svg)](https://david-dm.org/winkjs/wink-nlp-utils?type=dev)

[<img align="right" src="https://decisively.github.io/wink-logos/logo-title.png" width="100px" >](http://wink.org.in/)

Prepare raw text for Natural Language Processing (NLP) using **`wink-nlp-utils`**.It is a part of [wink](http://wink.org.in/) — a growing family of high quality packages for Statistical Analysis, Natural Language Processing and Machine Learning in NodeJS.

It offers a set of [APIs](http://wink.org.in/wink-nlp-utils/) to work on [strings](http://wink.org.in/wink-nlp-utils/#string) such as names, sentences, paragraphs and [tokens](http://wink.org.in/wink-nlp-utils/#tokens) represented as an array of strings/words. They perform the required pre-processing for many ML tasks such as [semantic search](https://www.npmjs.com/package/wink-bm25-text-search), and [classification](https://www.npmjs.com/package/wink-naive-bayes-text-classifier).


## Installation
Use [npm](https://www.npmjs.com/package/wink-nlp-utils) to install:
```
npm install wink-nlp-utils --save
```


## Getting Started


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

// Remove stop words:
var t = nlp.tokens.removeWords( [ 'mary', 'had', 'a', 'little', 'lamb' ] );
console.log( t );
// -> [ 'mary', 'little', 'lamb' ]

```

### Documentation
Check out the [wink NLP utilities API](http://wink.org.in/wink-nlp-utils/) documentation to learn more.

## Need Help?
If you spot a bug and the same has not yet been reported, raise a new [issue](https://github.com/winkjs/wink-nlp-utils/issues) or consider fixing it and sending a pull request.


## Copyright & License
**wink-nlp-utils** is copyright 2017-18 [GRAYPE Systems Private Limited](http://graype.in/).

It is licensed under the under the terms of the GNU Affero General Public License as published by the Free
Software Foundation, version 3 of the License.
