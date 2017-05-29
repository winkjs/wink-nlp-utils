
# wink-nlp-utils

> Easily tokenize, stem, phonetize, remove stop words, manage elisions, create ngrams, bag of words and more.

### [![Build Status](https://api.travis-ci.org/decisively/wink-nlp-utils.svg?branch=master)](https://travis-ci.org/decisively/wink-nlp-utils) [![Coverage Status](https://coveralls.io/repos/github/decisively/wink-nlp-utils/badge.svg?branch=master)](https://coveralls.io/github/decisively/wink-nlp-utils?branch=master) [![dependencies Status](https://david-dm.org/decisively/wink-nlp-utils/status.svg)](https://david-dm.org/decisively/wink-nlp-utils) [![devDependencies Status](https://david-dm.org/decisively/wink-nlp-utils/dev-status.svg)](https://david-dm.org/decisively/wink-nlp-utils?type=dev)

<img align="right" src="https://decisively.github.io/wink-logos/logo-title.png" width="100px" >

**wink-nlp-utils** is a part of **[wink](https://www.npmjs.com/~sanjaya)**, which is a family of Machine Learning NPM packages. They consist of simple and/or higher order functions that can be combined with NodeJS `stream` and `child processes` to create recipes for analytics driven business solutions.


Prepares raw text for Natural Language Processing (NLP).  It offers a set of **[APIs](#apis)** to work on **[strings](#string)** such as names, sentences, paragraphs and **[tokens](#tokens)** represented as an array of strings/words. They perform the required pre-processing for ML tasks such as **similarity detection**, **classification**, and **semantic search**.


## Installation
Use **[npm](https://www.npmjs.com/package/wink-nlp-utils)** to install:
```
npm install wink-nlp-utils --save
```


## Usage


```javascript

// Load wink-nlp-utils
var nlp = require( 'wink-nlp-utils' );

// Use a string Function
// Input argument is a string
var name = nlp.string.extractPersonsName( 'Dr. Sarah Connor M. Tech., PhD. - AI' );
// name -> 'Sarah Connor'

// Use a tokens Function
// Input argument is an array of tokens; remove stop words.
var t = nlp.tokens.removeWords( [ 'mary', 'had', 'a', 'little', 'lamb' ] );
// t -> [ 'mary', 'little', 'lamb' ]

```

## APIs

### string

#### lowerCase( s )
Converts the input string `s` to lower case.

#### upperCase( s )
Converts the input sting `s` to upper case.

#### trim( s )
Trims leading and trailing spaces from the input string `s`.

#### removeExtraSpaces( s )

Removes leading & trailing white spaces along with any extra spaces appearing in between from the input
string `s`.

#### retainAlphaNums( s )

Retains only alpha-numerals and spaces and removes all other characters, including leading/trailing/extra spaces from
the input string `s`.

#### extractPersonsName( s )

Attempts to extract person's name from input string `s` in formats like
**Dr. Eugine Cyron B. Tech., M. Tech., PhD. - Electrical** by dropping
the titles and degrees. It assumes the following name format:

`[<salutations>] <name part in FN, MN, LN> [<degrees>]`

#### extractRunOfCapitalWords( s )

Returns an array of words appearing as Title Case or in ALL CAPS in the input string `s`.

#### removePunctuations( s )

Removes each punctuation mark by a space.  It looks for `.,;!?:"!'... - () [] {}`  from the input string `s` and replaces it by a space. Use `removeExtraSpaces( s )` in order to remove the spaces in the string.

#### removeSplChars( s )

Removes the special characters like `~@#%^*+=` from the input string 's' and replaces it by a space. These can be removed using `removeExtraSpaces( s )`.

#### removeHTMLTags( s )

Removes HTML tags, escape sequences from the input string `s` and replaces it by space character. These can be removed using `removeExtraSpaces( s )`.


#### removeElisions( s )

Removes basic elisions found in the input string `s`. An `I'll` becomes `I`, `Isn't` becomes `Is`.  An apostrophe found in the string `s` remains as is.


#### splitElisions( s )

Splits elisions from the input string `s` by inserting a space. Elisions like `we're` or  `I'm` are split as `we re` or `I m`.

#### amplifyNotElision( s )

Amplifies the not elision by replacing it by the word `not` in the input string `s`; it must be used before calling the `removeElisions()`. `Can't`, `Isn't`, `Haven't` are amplified as `Ca not`, `Is not`, `Have not`.

#### marker( s )

Generates a `marker` for the input string `s` as 1-gram,  sorted and joined back as a string again; useful input in determining a quick and aggressive way to detect similarity in short strings. Its aggression leads to more false positives such as `Meter` and `Metre` or `no melon` and `no lemon`.

#### soc( s, ifn, idx )

Creates a `set of characters (soc)` from the input string `s`. This is useful in even more aggressive string matching using **Jaccard** or **Tversky** Indexes as compared to `marker()`.

#### ngram( s, size )

Generates the ngram of the `size` from the input string `s`. Default value of `size` is 2. The function returns an array of ngrams. In case, `0` is given as `size` parameter, `ngrams` of `size 2` will be returned.

#### bong( s, size, ifn, idx )

Generates a **b**ag **o**f **ng**rams of the `size` from the input string `s`. Default value of `size` is 2. This function returns an object containing ngram (key) and their frequency (value) of occurrence. While `ngram()` preserves the sequence and has no frequency information of each ngram, `bong()` on the other hand captures the frequency of each ngram and has no sequence information. Input arguments `ifn` and `idx` are optional. For special cases, where index is required, please refer to the helper function `index()`.

#### song( s, size, ifn, idx )

Generates a **s**et **o**f **ng**rams of the `size` from the input string `s`. Default value of `size` is 2. This function returns an object containing ngram (key) and their frequency (value) of occurrence. While `ngram()` preserves the sequence and has no frequency information of each ngram, `song()` on the other hand captures the frequency of each ngram and has no sequence information. Input arguments `ifn` and `idx` are optional. For special cases, where index is required, please refer to the helper function `index()`.

#### stem( s )

The input string `s` is stemmed using the [Porter2 English Stemming Algorithm](http://snowballstem.org/algorithms/english/stemmer.html)

#### sentences( s, splChar )

Splits the text contained in the input string `s` into sentences returned in the form of an array. Punctuation marks found at the end of a sentence are retained. The function can handle sentences beginning with numbers as well, though it is not a good english practice. It uses `~` as the `splChar` for splitting and therefore it must not be present in the input string; else you may give another `splChar` as the second argument.

#### tokenize0( s )

Tokenizes by splitting the input string `s` on non-words. This means tokens would consists of only alphas, numerals and underscores; all other characters will be stripped as they are treated as separators. However negations are retained and amplified but all other elisions are removed. `Tokenize0` is useful when the text strings are clean and do not require pre-processing like removing punctuations,extra spaces, handling elisions etc.


#### tokenize( s )

The function follows set of rules given below to remove and preserve punctuation/special characters in the input string `s`. The Extra/leading/trailing spaces are removed and finally split on space to tokenize.

1. First, `single quotes` are processed as they may be a part of elisions in the string; and `…` are converted to ellipses.
1. `Not` elisions are amplified and then split on elisions. Thus words with elisions get tokenized
1. The word `cannot` is split in to `can not`.
1. `. , -` punctuations commonly embedded in numbers are left intact, All other punctuations are tokenized.
1. The `currency symbols` are padded by space i.e. become separate tokens.
1. `Underscore (_)` embedded in the word is preserved.
1. `Special characters` are preserved and may/may not become separate tokens.
1. Finally after removing `extra/leading/trailing spaces`, split on `space` to tokenize.

#### phonetize( s )

Phonetizes the input string `s` using an algorithmic adaptation of [Metaphone](https://en.wikipedia.org/wiki/Metaphone).


<br/>

### tokens

Tokens are created by splitting a string into words, keywords, symbols. These tokens are used as an input to various activities during text analysis.


#### stem( t )

Each element of input array of tokens `t` is stemmed using [Porter2 English Stemming Algorithm](http://snowballstem.org/algorithms/english/stemmer.html). Not to be confused with the stem() under string as it performs stemming on the input string `s`, whereas this function requires an token array `t` as an input.


#### bow( t, logcounts )

Creates Bag of Words from the input array of tokens `t`. Specifying  the `logCounts` parameter flags the use of `log2`( word counts ) instead of counts directly. The idea behind using `log2` is to ensure that a word’s importance does not increase linearly with its count. It is required as an input for computing similarity using `bow.cosine()`.

#### sow( t, ifn, idx )

Creates a Set of tokens from the input array `t`. It is required as an input for computing similarity using **Jaccard** or **Tversky** Indexes. Input arguments `ifn` and `idx` are optional, please refer to the function `index()`.


#### phonetize( t )

An array of tokens `t` are phonetized using an algorithmic adaptation of [Metaphone](https://en.wikipedia.org/wiki/Metaphone).  This is not to be confused with `phonetize( s )` for string only phonetization.

#### set( t )

Creates a `Set of tokens` from the input array `t`. It is required as an input for computing similarity using `Jaccard` or `Tversky` Indexes. This is not to be confused with set( s ) of string sets for computing similarity.


#### removeWords( t, givenStopWords )

Removes the `givenStopWords` from the input array of tokens `t`.
If the `givenStopWords` parameter is not specified then the default stop words are used.
The list of  default stop words are loaded from `stop_words.json` located under
the `lib/dictionaries/` directory.

The `givenStopWords` are constructed using `prepare.words()` as outlined below:

> ##### words( w, givenMappers )

> Creates stop words for `removeWords()` from an array of words (i.e. strings) and
serially applies all the mapper functions supplied in the optional `givenMappers` array. A mapper should
take a string as an input and return a transformed string. Typical example of a mapper is
`prepare.string.phonetize()`.


#### propagateNegation( t, upto )

It looks for negation tokens in the input array of tokens `t` and propagates negation to subsequent `upto`
tokens by prefixing them by a `!`: useful in handling text containing negations
during similarity detection or classification.


### helper
`helper` name space contains functions which returns function(s). They can be used for generating input arguments by the  calling function.

#### words( w, givenMappers )

Returns an object contains the following functions
(a) `set()` returns a set of words given in the input array `w`.
(b) `exclude()` that is suitable for filtering operations.

If the second argument `givenMappers` is passed as an array of mapper functions then these are applied on the input array before converting into a set. Typical example of mapper functions are `prepare.string.stem()` and `prepare.string.phonetize()`.

#### index()
Builds an index and returns 2 functions as follows:

(a) `build()` is useful with bag & set creation functions where, by passing the build function,  an index of each key/member can be built.
(b) `result()` can be probed anytime to access the output of `build()`.

Probing the result() returns  `ifn` and `idx` values for the calling function as in n `soc()`, `song()`, `bong()`, `bow()`, and `sow()`. Note: usage of `ifn` are limited by the developer’s imagination!



## Need Help?
If you spot a bug and the same has not yet been reported, raise a new [issue](https://github.com/decisively/wink-nlp-utils/issues) or consider fixing it and sending a pull request.


## Copyright & License
**wink-nlp-utils** is copyright 2017 GRAYPE Systems Private Limited.

It is licensed under the under the terms of the GNU Affero General Public License as published by the Free
Software Foundation, version 3 of the License.
