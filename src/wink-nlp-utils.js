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
var phnrgx = require( './phonetize_regexes.js' );
var defaultStopWords = require( './dictionaries/stop_words.json' );
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
defaultStopWords = prepare.helper.words( defaultStopWords );

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
prepare.string.tokenize0 = function ( s ) {
  var tokens = prepare.string.removeElisions( prepare.string.amplifyNotElision( s ) )
                .replace( rgx.cannot, '$1 $2' )
                .split( rgx.nonWords );
  // Check the 0th and last element of array for empty string because if
  // fisrt/last characters are non-words then these will be empty stings!
  if ( tokens[ 0 ] === '' ) tokens.shift();
  if ( tokens[ tokens.length - 1 ] === '' ) tokens.pop();
  return tokens;
}; // tokenize0()

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
prepare.string.tokenize = function ( s ) {
  // Handle single quotes first & ellipses.
  var su = s
            // > TODO: promote to regex utils after adding more test cases
            .replace( /(^|[^a-z0-9])(\’|\')/gi, '$1 $2 ')
            .replace( /([a-z0-9])(\’|\')(\W)/gi, '$1 $2 $3')
            .replace( '...', '…' )
            .replace( '…', ' … ' );
  var tokens = prepare.string.splitElisions( prepare.string.amplifyNotElision( su ) )
            // Handle cannot.
            .replace( rgx.cannot, '$1 $2' )
            // Separate out punctuations that are not part of a number.
            .replace( rgx.nonNumPunctuations, ' $& ' )
            // Separate out all other punctuations.
            .replace( /[\‘\’\`\“\”\"\[\]\(\)\{\}\…\!\;\?\/\:]/ig, ' $& ' )
            // Separate out currency symbol; all separated stuff becomes a token.
            .replace( rgx.currency, ' $& ')
            .replace( rgx.spaces, ' ' )
            .trim()
            // Handle period sign in the end specially.
            .replace( /\.$/, ' .' )
            // Now tokenize on space!
            .split( ' ' );
  // Splitting an empty string on space leaves an empty string in the array,
  // get rid of it.
  return ( ( tokens.length === 1 && tokens[ 0 ] === '' ) ? [] : tokens );
}; // tokenize()

// #### stem

// Stems the input string using Porter V2 stemmer. Details in `porter2_stemmer.js`
// file.
prepare.string.stem = porter2Stemmer;

// #### phonetize

// Phonetize the input string `s` using an algorithmic adaption of Metaphone.
/* eslint no-underscore-dangle: "off" */
prepare.string.phonetize = function ( s ) {
  var p = s.toLowerCase();
  // Remove repeating letters.
  p = p.replace( phnrgx.repeatingChars, '$1');
  // Drop first character of `kgknPairs`.
  if ( phnrgx.kngnPairs.test( p ) ) {
    p = p.substr( 1, p.length - 1 );
  }
  // Run Regex Express now!
  p = p
      // Change `ough` in the end as `f`,
      .replace( phnrgx.ough, 'f' )
      // Change `dg` to `j`, in `dge, dgi, dgy`.
      .replace( phnrgx.dge, 'je' )
      .replace( phnrgx.dgi, 'ji' )
      .replace( phnrgx.dgy, 'jy' )
      // Change `c` to `k` in `sch`
      .replace( phnrgx.sch, 'sk' )
      // Drop `c` in `sci, sce, scy`.
      .replace( phnrgx.sci, 'si' )
      .replace( phnrgx.sce, 'se' )
      .replace( phnrgx.scy, 'sy' )
      // Drop `t` if it appears as `tch`.
      .replace( phnrgx.tch, 'ch' )
      // Replace `tio & tia` by `sh`.
      .replace( phnrgx.tio, 'sh' )
      .replace( phnrgx.tia, 'sh' )
      // Drop `b` if it appears as `mb` in the end.
      .replace( phnrgx.mb_, 'm' )
      // Drop `r` if it preceeds a vowel and not followed by a vowel or `y`
      // .replace( rgx.vrnotvy, '$1$3' )
      // Replace `c` by `s` in `ce, ci, cy`.
      .replace( phnrgx.ce, 'se' )
      .replace( phnrgx.ci, 'si' )
      .replace( phnrgx.cy, 'sy' )
      // Replace `cq` by `q`.
      .replace( phnrgx.cq, 'q' )
      // Replace `ck` by `k`.
      .replace( phnrgx.ck, 'k' )
      // Replace `ph` by `f`.
      .replace( phnrgx.ph, 'f' )
      // Replace `th` by `0` (theta look alike!).
      .replace( phnrgx.th, '0' )
      // Replace `c` by `k` if it is not followed by `h`.
      .replace( phnrgx.cnoth, 'k$2' )
      // Replace `q` by `k`.
      .replace( phnrgx.q, 'k' )
      // Replace `x` by `s` if it appears in the beginning.
      .replace( phnrgx._x, 's' )
      // Other wise replace `x` by `ks`.
      .replace( phnrgx.x, 'ks' )
      // Replace `sh, sia, sio` by `x`. Needs to be done post `x` processing!
      .replace( phnrgx.sh, 'x' )
      // Drop `y` if it is now followed by a **vowel**.
      .replace( phnrgx.ynotv, '$2' )
      .replace( phnrgx.y_, '' )
      // Replace `z` by `s`.
      .replace( phnrgx.z, 's' )
      // Drop all **vowels** excluding the first one.
      .replace( phnrgx.__vowels, '' );

      return ( p );
}; // phonetize()

// Soundex Code for alphabets.
/* eslint-disable object-property-newline */
var soundexMap = {
  A: 0, E: 0, I: 0, O: 0, U: 0, Y: 0,
  B: 1, F: 1, P: 1, V: 1,
  C: 2, G: 2, J: 2, K: 2, Q: 2, S: 2, X: 2, Z: 2,
  D: 3, T: 3,
  L: 4,
  M: 5, N: 5,
  R: 6
};

// #### soundex

// Produces the soundex code from the input `word`. Default value of maxLength
// is **4**.
prepare.string.soundex = function ( word, maxLength ) {
  // Upper case right in the begining.
  var s = ( word.length ) ? word.toUpperCase() : '?';
  var i,
      imax = s.length;
  // Soundex code builds here.
  var sound = [];
  // Helpers - `ch` is a char from `s` and `code/prevCode` are sondex codes
  // for consonants.
  var ch, code,
      prevCode = 9;
  // Use default of 4.
  var maxLen = maxLength || 4;
  // Iterate through every character.
  for ( i = 0; i < imax; i += 1 ) {
    ch = s[ i ];
    code = soundexMap[ ch ];
    if ( i ) {
      // Means i is > 0.
      // `code` is either (a) `undefined` if an unknown character is
      // encountered including `h & w`, or (b) `0` if it is vowel, or
      // (c) the soundex code for a consonant.
      if ( code && code !== prevCode ) {
        // Consonant and not adjecant duplicates!
        sound.push( code );
      } else if ( code !== 0 ) {
        // Means `h or w` or an unknown character: ensure `prevCode` is
        // remembered so that adjecant duplicates can be handled!
        code = prevCode;
      }
    } else {
      // Retain the first letter
      sound.push( ch );
    }
    prevCode = code;
  }
  s = sound.join( '' );
  // Always ensure minimum length of 4 characters for maxLength > 4.
  if ( s.length < 4 ) s += '000';
  // Return the required length.
  return s.substr( 0, maxLen );
}; // soundex()

// ### Prepare.Tokens Name Space

// Create prepare.tokens name space.
prepare.tokens = Object.create( null );

// #### stem

// Stems the input token `t` using `string.stem()`.
prepare.tokens.stem = function ( t ) {
  return t.map( prepare.string.stem );
}; // stem()

// #### phonetize

// Phonetize the input tokens `t` using an algorithmic adaption of Metaphone.
prepare.tokens.phonetize = function ( t ) {
  return t.map( prepare.string.phonetize );
}; // phonetize()

// #### soundex

// Produces the soundex code from the input `word`.
prepare.tokens.soundex = function ( tokens ) {
  // Need to send `maxLength` as `undefined`.
  return tokens.map( ( t ) => prepare.string.soundex( t ) );
}; // soundex()

// #### Remove Words

// Removes the `givenStopWords` or the `defaultStopWords` from the input
// array of tokens `t`. The input stop words must be created using
// `prepare.words()`.
prepare.tokens.removeWords = function ( t, givenStopWords ) {
  var stopWords = ( givenStopWords || defaultStopWords );
  return t.filter( stopWords.exclude );
}; // remove()

// #### bow

// Creates Bag of Words from the input array of tokens `t`. The `logCounts` flags
// to use log2( word counts ) instead of counts directly. The idea behind using
// log2 is to ensure that a word's importance does not increase linearly with its
// count. It is required as an input for computing similarity using Cosine similarity.
prepare.tokens.bow = function ( t, logCounts, ifn, idx ) {
  var bow = Object.create( null ),
      i, imax,
      token,
      words;
  for ( i = 0, imax = t.length; i < imax; i += 1 ) {
    token = t[ i ];
    if ( ( typeof ifn === 'function' ) && !bow[ token ] ) {
        ifn( token, idx );
    }
    bow[ token ] = 1 + ( bow[ token ] || 0 );
  }
  if ( !logCounts ) return ( bow );
  words = Object.keys( bow );
  for ( i = 0, imax = words.length; i < imax; i += 1 ) {
    // Add `1` to ensure non-zero count! (Note: log2(1) is 0)
    bow[ words[ i ] ] = Math.log2( bow[ words[ i ] ] + 1 );
  }
  return ( bow );
}; // bow()

// #### sow

// Creates a Set of tokens from the input array `t`. It is required as an input
// for computing similarity using Jaccard or Tversky Indexes.
prepare.tokens.sow = function ( t, ifn, idx ) {
  var tset = new Set( t );
  if ( typeof ifn === 'function' ) {
    tset.forEach( function ( m ) {
        ifn( m, idx );
    } );
  }
  return ( tset );
}; // set()

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
