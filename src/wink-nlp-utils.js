//     wink-nlp-utils
//     Easily tokenize, stem, phonetize, remove stop words,
//     manage elisions, create ngrams, bag of words and more
//
//     Copyright (C) 2017  GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp-utils”.
//
//     “wink-nlp-utils” is free software: you can redistribute it
//     and/or modify it under the terms of the GNU Affero
//     General Public License as published by the Free
//     Software Foundation, version 3 of the License.
//
//     “wink-nlp-utils” is distributed in the hope that it will
//     be useful, but WITHOUT ANY WARRANTY; without even
//     the implied warranty of MERCHANTABILITY or FITNESS
//     FOR A PARTICULAR PURPOSE.  See the GNU Affero General
//     Public License for more details.
//
//     You should have received a copy of the GNU Affero
//     General Public License along with “wink-nlp-utils”.
//     If not, see <http://www.gnu.org/licenses/>.

//
var rgx = require( './util_regexes.js' );
// var ncrgx = require( './name_cleaner_regexes.js' );
var porter2Stemmer = require( 'wink-porter2-stemmer' );
// var phnrgx = require( './phonetize_regexes.js' );
// var defaultStopWords = require( './dictionaries/stop_words.json' );
// var helpers = require( 'wink-helpers' );

// ### Prepare Name Space

// Create prepare name space.
var prepare = Object.create( null );

// ### Prepare.Helper name space

// Create prepare.helper name space.
prepare.helper = Object.create( null );

// #### Words

// Returns an object containing functions (a) `set`, which returns a `Set` of
// words given in the input array `w` and (b) `exclude` that is suitable for
// filtering operations. If the second argment `givenMappers` is given as an
// array of **mapper** functions then these are applied on the input array
// before converting in to a set. Typical example of mapper functions are
// `prepare.string.stem()` and `prepare.string.phonetize()`.
prepare.helper.words = require( './helper-return-words-filter.js' );

// Make better **alias** name for the `word()` function.
prepare.helper.returnWordsFilter = prepare.helper.words;

// Create default stop words here - an internal variable.
// defaultStopWords = prepare.helper.words( defaultStopWords );

// #### index

// Builds index - returns 2 functions viz. (a) `build` and `result`. Useful with
// bag & set creation functions, where by bassing the build function, they can
// also build an index of each key/member.
prepare.helper.index = require( './helper-return-indexer.js' );

// Make better **alias** name for the `index()` function.
prepare.helper.returnIndexer = prepare.helper.index;

// #### return Quoted Text Extractor

// Returns a uoated text extractor function. The (returned) extractor function
// takes `s` string argument; extracts all the text elements quoted between
// `lq` (left quote) and `rq` (right quote) string; and finally returns an
// array of those text elements. Note elements do not contain quote strings.
// If `lq` and/or `rq` is not defined or is not a string then it defaults to `'"'`.
prepare.helper.returnQuotedTextExtractor = require( './helper-return-quoted-text-extractor.js' );

// ### Prepare.String Name Space

// Create prepare.string name space.
prepare.string = Object.create( null );

// #### Lower Case

// Converts the input string `s` to lower case.
prepare.string.lowerCase = require( './string-lower-case.js' );

// #### Upper Case

// Converts the input sting `s` to upper case.
prepare.string.upperCase = require( './string-upper-case.js' );

// #### Trim

// Trims leading and trailing spaces from the input string `s`.
prepare.string.trim = require( './string-trim.js' );

// #### Remove Extra Spaces

// Removes leading & trailing whitespaces, extra in-between spaces from the input
// string `s`.
prepare.string.removeExtraSpaces = require( './string-remove-extra-spaces.js' );

// #### Retain Alpha-numerics

// Retains only apha, numerals, and spaces and removes all other characters from
// the input string `s`.
prepare.string.retainAlphaNums = require( './string-retain-alpha-nums.js' );

// #### Extract Person's Name

// Attemts to extract person's name from input string `s` in formats like
// **Dr. Ashwini Kumar Sharma B. Tech., M. Tech., PhD. - Electrical** by dropping
// the titles and degrees.
// It assmues the following name format:
// `[<salutations>] <name part in FN, MN, LN> [<degrees>]`.
prepare.string.extractPersonsName = require( './string-extract-persons-name.js' );

// #### Extract Run of Capital Words

// Returns an array of **run of captial words** from thr input string `s`,
// if any; otherwise returns `null`.
prepare.string.extractRunOfCapitalWords = require( './string-extract-run-of-capital-words.js' );

// #### Remove Punctuations

// Removes punctuations from the input string `s` by replacing each one of them
// by a single space character.
prepare.string.removePunctuations = require( './string-remove-punctuations.js' );

// #### Remove Special Chars

// Removes special characters from the input string `s`.
prepare.string.removeSplChars = require( './string-remove-spl-chars.js' );

// #### Remove HTML Tags

// Removes HTML tags from the input string `s` and replaces them by a space char.
prepare.string.removeHTMLTags = require( './string-remove-html-tags.js' );

// #### Remove Elisions

// Removes elisions from the input string `s`.
prepare.string.removeElisions = require( './string-remove-elisions.js' );

// #### Split Elisions

// Splits elisions from the input string `s` by inserting a space.
prepare.string.splitElisions = require( './string-split-elisions.js' );

// #### Amplify Not Elision

// Amplifies the not elision by replacing it by the word **not** in the input string `s`;
// it must be used before calling the `removeElisions()`.
prepare.string.amplifyNotElision = require( './string-amplify-not-elision' );

// #### Marker

// Generate a **marker** for the input string `s` - an 1-gram sorted and joined back as
// string again; it is useful for in determining a quick but approximate degree
// of match between short strings (with potentially more false positives).
prepare.string.marker = require( './string-marker.js' );

// #### SOC

// Creates a **s**et **o**f **c**hars from the input string `s`. This is useful
// in even more aggressive string matching using Jaccard or Tversky compared to
// `marker()`.
//
// If `ifn` and `idx` arguments are passed then it builds an *alphabetic
// index* of `s`. In other words, only the first character of `s` is passed to the
// indexer function (`ifn`) along with `idx`. This pattern is also used in `song()`,
// `bong()`, `bow()`, and `sow()`. However for these functions either ngram or
// word/token (whatever is applicable) is passed along with `idx` to `ifn`. Note:
// usage of `ifn` are limited by the developer's imagination!
prepare.string.soc = require( './string-soc.js' );

// #### ngrams

// Generates an array of ngrams of `size` from the input string `s`.
// The default value of `size` is 2. The `size` 0 is forced to 2.
prepare.string.ngrams = require( './string-ngram.js' );

// #### BONG

// Generates the **b**ag **o**f **ng**rams of `size` from the input string `s`.
// The default value of `size` is 2. The `size` 0 is forced to 2.
prepare.string.bong = require( './string-bong.js' );

// #### SONG

// Generates the **s**et **o**f **ng**rams of `size` from the input string `s`.
// The default value of `size` is 2. The `size` 0 is forced to 2.
prepare.string.song = require( './string-song.js' );

// #### sentences

// Splits the text contained in the input string `s` into sentences returned
// in form of an array. Note, the end-of-sentence punctuations are retained in
// each of the sentence. It can handle sentences started from numeric values as
// well, though it is not a good english practice.
// It uses `~` as the `splChar` for splitting and therefore
// it must not be present in the input string; you may give another `splChar`
// as the second argument.
prepare.string.sentences = require( './string-sentences.js' );

// #### compose corpus

// Generates all possible sentences from the input argument string — s.
// The string s must follow a special syntax:</br>
// `'[I] [am having|have] [a] [problem|question]'`</br>
// The corpus is composed by computing the cartesian product of all the phrases.
// It returns an array of sentences (i.e. strings).
prepare.string.composeCorpus = require( './string-compose-corpus.js' );

// #### tokenize0

// Quick & dirty tokenizer by splitting the input string `s` on non-words.
// This means tokens would consists of only alphas, numerals and underscores;
// all other characters will be stripped as they are treated as separators.
// However negations are retained and amplified but all other elisions are removed.
prepare.string.tokenize0 = require( './string-tokenize0.js' );

// #### tokenize

// Tokenizes the input string `s` by applying following rules:
// 0. Single quotes are processed first as they may be part of elisions; and
// `...` are converted to ellipses.
// 1. Split elisions after amplifying not elisions i.e. balance elisions get tokenized,
// 2. `cannot` is split in to `can not`.
// 3. `. , -` punctuations that commonly embedded in numbers are left intact,
// 4. All other punctuations are tokenized,
// 5. currency symbols are padded by space i.e. become separate tokens,
// 6. Retains `_` as is - no tokenization,
// 7. Spacial characters are left untouched and may/may not become separate token.
// 8. Finally after removing extra/leading/trailing spaces, split on space to tokenize.
prepare.string.tokenize = require( './string-tokenize.js' );

// #### stem

// Stems the input string using Porter V2 stemmer. Details in `porter2_stemmer.js`
// file.
prepare.string.stem = porter2Stemmer;

// #### phonetize

// Phonetize the input string `s` using an algorithmic adaption of Metaphone.
/* eslint no-underscore-dangle: "off" */
prepare.string.phonetize = require( './string-phonetize.js' );


// #### soundex

// Produces the soundex code from the input `word`. Default value of maxLength
// is **4**.
prepare.string.soundex = require( './string-soundex.js' );

// ### Prepare.Tokens Name Space

// Create prepare.tokens name space.
prepare.tokens = Object.create( null );

// #### stem

// Stems the input token `t` using `string.stem()`.
prepare.tokens.stem = require( './tokens-stem.js' );

// #### phonetize

// Phonetize the input tokens `t` using an algorithmic adaption of Metaphone.
prepare.tokens.phonetize = require( './tokens-phonetize.js' );

// #### soundex

// Produces the soundex code from the input `word`.
prepare.tokens.soundex = require( './tokens-soundex.js' );

// #### Remove Words

// Removes the `givenStopWords` or the `defaultStopWords` from the input
// array of tokens `t`. The input stop words must be created using
// `prepare.words()`.
prepare.tokens.removeWords = require( './tokens-remove-words.js' );

// #### bow

// Creates Bag of Words from the input array of tokens `t`. The `logCounts` flags
// to use log2( word counts ) instead of counts directly. The idea behind using
// log2 is to ensure that a word's importance does not increase linearly with its
// count. It is required as an input for computing similarity using Cosine similarity.
prepare.tokens.bow = require( './tokens-bow.js' );

// #### sow

// Creates a Set of tokens from the input array `t`. It is required as an input
// for computing similarity using Jaccard or Tversky Indexes.
prepare.tokens.sow = require( './tokens-sow.js' );

// #### Propagate Negations

// It looks for neagtion tokens in `t` and propagate negation in subsequent `upto`
// tokens by prefixing them by a `!`.
prepare.tokens.propagateNegations = function ( t, upto ) {
  var i, imax, j, jmax;
  var tokens = t;
  var limit = upto || 2;
  for ( i = 0, imax = tokens.length; i < imax; i += 1 ) {
    if ( rgx.negations.test( tokens[ i ] ) ) {
      for ( j = i + 1, jmax = Math.min( imax, i + limit + 1 ); j < jmax; j += 1 ) {
        // Hit a punctuation mark, break out of the loop otherwise go *upto the limit*.
        // > TODO: promote to utilities regex, after test cases have been added.
        if ( /[\,\.\;\:\!\?]/.test( tokens[ j ] ) ) break;
        // Propoage negation: invert the token by prefixing a `!` to it.
        tokens[ j ] = '!' + tokens[ j ];
      }
      i = j;
    }
  }
  return tokens;
}; // propagateNegations()

// #### Bigrams

// Creates bigrams from the input `t` tokens.
prepare.tokens.bigrams = function ( t ) {
  // Bigrams will be stored here.
  var bgs = [];
  // Helper variables.
  var i, imax;
  // Create bigrams.
  for ( i = 0, imax = t.length - 1; i < imax; i += 1 ) {
    bgs.push( [ t[ i ], t[ i + 1 ] ] );
  }
  return bgs;
}; // bigrams()

// ### Append Bigrams

// Generates bigrams from the input `t` tokens and returns them by
// appending to `t`.
prepare.tokens.appendBigrams = function ( t ) {
  var i, imax;
  for ( i = 0, imax = t.length - 1; i < imax; i += 1 ) {
    t.push( t[ i ] + '_' + t[ i + 1 ] );
  }
  return t;
}; // appendBigrams()

// Export prepare.
module.exports = prepare;
