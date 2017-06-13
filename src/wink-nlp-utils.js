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
var ncrgx = require( './name_cleaner_regexes.js' );
var porter2Stemmer = require( 'wink-porter2-stemmer' );
var phnrgx = require( './phonetize_regexes.js' );
var defaultStopWords = require( './dictionaries/stop_words.json' );
var helpers = require( 'wink-helpers' );

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
prepare.helper.words = function ( w, givenMappers ) {
  var mappedWords = w;
  var mappers = givenMappers || [];
  mappers.forEach( function ( m ) {
    mappedWords = mappedWords.map( m );
  } );

  mappedWords = new Set( mappedWords );

  var exclude = function ( t ) {
    return ( !( mappedWords.has( t ) ) );
  }; // exclude()

  var set = function () {
    return mappedWords;
  }; // set()

  return {
    set: set,
    exclude: exclude
  };
}; // words()

// Make better **alias** name for the `word()` function.
prepare.helper.returnWordsFilter = prepare.helper.words;

// Create default stop words here - an internal variable.
defaultStopWords = prepare.helper.words( defaultStopWords );

// #### index

// Builds index - returns 2 functions viz. (a) `build` and `result`. Useful with
// bag & set creation functions, where by bassing the build function, they can
// also build an index of each key/member.
prepare.helper.index = function () {
  var theIndex = Object.create( null );
  var methods = Object.create( null );

  // Builds index by adding the `element` and `itsIndex`. The `itsIndex` should
  // be a valid JS array index; no validation checks are performed while building
  // index.
  var build = function ( element, itsIndex ) {
    theIndex[ element ] = theIndex[ element ] || [];
    theIndex[ element ].push( itsIndex );
    return true;
  }; // build()

  // Returns the index built so far.
  var result = function () {
    return theIndex;
  }; // result()

  methods.build = build;
  methods.result = result;

  return methods;
}; // index()

// Make better **alias** name for the `index()` function.
prepare.helper.returnIndexer = prepare.helper.index;

// #### return Quoted Text Extractor

// Returns a uoated text extractor function. The (returned) extractor function
// takes `s` string argument; extracts all the text elements quoted between
// `lq` (left quote) and `rq` (right quote) string; and finally returns an
// array of those text elements. Note elements do not contain quote strings.
// If `lq` and/or `rq` is not defined or is not a string then it defaults to `'"'`.
prepare.helper.returnQuotedTextExtractor = function ( lq, rq ) {
  var // Index variable for *for-loop*
      i,
      // Set defaults for left quote, if required.
      lq1 = ( ( lq && ( typeof lq === 'string' ) ) ? lq : '"' ),
      // Extracts its length
      lqLen = lq1.length,
      // The regular expression is created here.
      regex = null,
      // The string containing the regular expression builds here.
      rgxStr = '',
      // Set defaults for right quote, if required.
      rq1 = ( ( rq && ( typeof rq === 'string' ) ) ? rq : lq1 ),
      // Extract its length.
      rqLen = rq1.length;

  // Build `rgxStr`
  for ( i = 0; i < lqLen; i += 1 ) rgxStr += '\\' + lq1.charAt( i );
  rgxStr += '.*?';
  for ( i = 0; i < rqLen; i += 1 ) rgxStr += '\\' + rq1.charAt( i );
  // Create regular expression.
  regex = new RegExp( rgxStr, 'g' );
  // Return the extractor function.
  return ( function ( s ) {
    if ( !s || ( typeof s !== 'string' ) ) return null;
    var // Extracted elements are captured here.
        elements = [],
        // Extract matches with quotes
        matches = s.match( regex );
    if ( !matches || ( matches.length === 0 ) ) return null;
    // Collect elements after removing the quotes.
    for ( var k = 0, kmax = matches.length; k < kmax; k += 1 ) {
      elements.push( matches[ k ].substr( lqLen, matches[ k ].length - ( rqLen + lqLen ) ) );
    }
    return ( elements );
  } );
}; // returnQuotedTextExtractor()

// ### Prepare.String Name Space

// Create prepare.string name space.
prepare.string = Object.create( null );

// #### Lower Case

// Converts the input string `s` to lower case.
prepare.string.lowerCase = function ( s ) {
  return ( s.toLowerCase() );
}; // lowerCase()

// #### Upper Case

// Converts the input sting `s` to upper case.
prepare.string.upperCase = function ( s ) {
  return ( s.toUpperCase() );
}; // upperCase()

// #### Trim

// Trims leading and trailing spaces from the input string `s`.
prepare.string.trim = function ( s ) {
  return ( s.trim() );
}; // trim()

// #### Remove Extra Spaces

// Removes leading & trailing whitespaces, extra in-between spaces from the input
// string `s`.
prepare.string.removeExtraSpaces = function ( s ) {
  return ( s
            .trim()
            .replace( rgx.spaces, ' ')
         );
}; // removeExtraSpaces()

// #### Retain Alpha-numerics

// Retains only apha, numerals, and spaces and removes all other characters from
// the input string `s`.
prepare.string.retainAlphaNums = function ( s ) {
  return ( s
            .toLowerCase()
            .replace( rgx.notAlphaNumeric, ' ')
            .replace( rgx.spaces, ' ')
            .trim()
          );
}; // retainAlphaNums()

// #### Extract Person's Name

// Attemts to extract person's name from input string `s` in formats like
// **Dr. Ashwini Kumar Sharma B. Tech., M. Tech., PhD. - Electrical** by dropping
// the titles and degrees.
// It assmues the following name format:
// `[<salutations>] <name part in FN, MN, LN> [<degrees>]`.
prepare.string.extractPersonsName = function ( s ) {
  // Remove Degrees by making the list of indexes of each degree and subsequently
  // finding the minimum and slicing from there!
  var indexes = ncrgx.degrees.map( function ( r ) {
    var m = r.exec( s );
    return ( m ) ? m.index : 999999;
  } );
  var sp = Math.min.apply( null, indexes );

  // Generate an Array of Every Elelemnt of Name (e.g. title, first name,
  // sir name, honours, etc)
  var aeen = s.slice( 0, sp ).replace( rgx.notAlpha, ' ').replace( rgx.spaces, ' ').trim().split(' ');
  // Remove titles from the beginning.
  while ( aeen.length && ncrgx.titles.test( aeen[0] ) ) aeen.shift();
  return aeen.join(' ');
}; // extractPersonsName()

// #### Extract Run of Capital Words

// Returns an array of **run of captial words** from thr input string `s`,
// if any; otherwise returns `null`.
prepare.string.extractRunOfCapitalWords = function ( s ) {
  var m = s.match( rgx.rocWords );
  return ( ( m ) ? m.map( prepare.string.trim ) : m );
}; // extractRunOfCapitalWords()

// #### Remove Punctuations

// Removes punctuations from the input string `s` by replacing each one of them
// by a single space character.
prepare.string.removePunctuations = function ( s ) {
  return s.replace( rgx.punctuations, ' ' );
}; // removePunctuations()

// #### Remove Special Chars

// Removes special characters from the input string `s`.
prepare.string.removeSplChars = function ( s ) {
  return s.replace( rgx.splChars, ' ' );
}; // removeSplChars()

// #### Remove HTML Tags

// Removes HTML tags from the input string `s` and replaces them by a space char.
prepare.string.removeHTMLTags = function ( s ) {
  return ( s
            .replace( rgx.htmlTags, ' ' )
            .replace( rgx.htmlEscSeq1, ' ' )
            .replace( rgx.htmlEscSeq2, ' ' )
         );
}; // removeHTMLTags()

// #### Remove Elisions

// Removes elisions from the input string `s`.
prepare.string.removeElisions = function ( s ) {
  return ( s
            .replace( rgx.elisionsSpl, '$2' )
            .replace( rgx.elisions1, '$1' )
            .replace( rgx.elisions2, '$1' )
         );
}; // removeElisions()

// #### Split Elisions

// Splits elisions from the input string `s` by inserting a space.
prepare.string.splitElisions = function ( s ) {
  return ( s
            .replace( rgx.elisionsSpl, '$2 $3' )
            .replace( rgx.elisions1, '$1 $2' )
            .replace( rgx.elisions2, '$1 $2' )
         );
}; // splitElisions()

// #### Amplify Not Elision

// Amplifies the not elision by replacing it by the word **not** in the input string `s`;
// it must be used before calling the `removeElisions()`.
prepare.string.amplifyNotElision = function ( s ) {
  return s.replace( rgx.notElision, '$1 not' );
}; // amplifyNotElision()

// #### Marker

// Generate a **marker** for the input string `s` - an 1-gram sorted and joined back as
// string again; it is useful for in determining a quick but approximate degree
// of match between short strings (with potentially more false positives).
prepare.string.marker = function ( s ) {
  var uniqChars = Object.create( null );
  for ( var i = 0, imax = s.length; i < imax; i += 1 ) {
    uniqChars[ s[ i ] ] = true;
  }
  return ( Object.keys( uniqChars ).sort().join('') );
}; // marker()

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
prepare.string.soc = function ( s, ifn, idx ) {
  var cset = new Set( s );
  if ( typeof ifn === 'function' ) {
      ifn( s[ 0 ], idx );
  }
  return ( cset );
}; // soc()

// #### ngrams

// Generates an array of ngrams of `size` from the input string `s`.
// The default value of `size` is 2. The `size` 0 is forced to 2.
prepare.string.ngrams = function ( s, size ) {
  var ng = ( size || 2 ),
      ngramz = [],
      tg;
  for ( var i = 0, imax = s.length; i < imax; i += 1 ) {
    tg = s.slice( i, i + ng );
    if ( tg.length === ng ) ngramz.push( tg );
  }
  return ( ngramz );
}; // ngrams()

// #### BONG

// Generates the **b**ag **o**f **ng**rams of `size` from the input string `s`.
// The default value of `size` is 2. The `size` 0 is forced to 2.
prepare.string.bong = function ( s, size, ifn, idx ) {
  var ng = ( size || 2 ),
      ngBOW = Object.create( null ),
      tg;
  for ( var i = 0, imax = s.length; i < imax; i += 1 ) {
    tg = s.slice( i, i + ng );
    if ( tg.length === ng ) {
      // Call `ifn` iff its defined and `tg` is appearing for the first time;
      // this avoids multiple calls to `ifn`. Strategy applies to `song()`,
      // and `bow()`.
      if ( ( typeof ifn === 'function' ) && !ngBOW[ tg ] ) {
          ifn( tg, idx );
      }
      // Now define, if required and then update counts.
      ngBOW[ tg ] = 1 + ( ngBOW[ tg ] || 0 );
    }
  }
  return ( ngBOW );
}; // bong()

// #### SONG

// Generates the **s**et **o**f **ng**rams of `size` from the input string `s`.
// The default value of `size` is 2. The `size` 0 is forced to 2.
prepare.string.song = function ( s, size, ifn, idx ) {
  var ng = ( size || 2 ),
      ngSet = new Set(),
      tg;
  for ( var i = 0, imax = s.length; i < imax; i += 1 ) {
    tg = s.slice( i, i + ng );
    if ( tg.length === ng ) {
      if ( ( typeof ifn === 'function' ) && !ngSet.has( tg ) ) {
          ifn( tg, idx );
      }
      ngSet.add( tg );
    }
  }
  return ( ngSet );
}; // song()

// #### sentences

// Splits the text contained in the input string `s` into sentences returned
// in form of an array. Note, the end-of-sentence punctuations are retained in
// each of the sentence. It can handle sentences started from numeric values as
// well, though it is not a good english practice.
// It uses `~` as the `splChar` for splitting and therefore
// it must not be present in the input string; you may give another `splChar`
// as the second argument.
prepare.string.sentences = function ( s, splChar ) {
  var splCh = splChar || '~';
  var substitute = '$1' + splCh;
  return ( s
            .replace( '...', '…' )
            .replace( rgx.eosPunctuations, substitute )
            .split( splCh )
            .map( prepare.string.trim )
         );
}; // sentences()

// #### compose corpus

// Generates all possible sentences from the input argument string — s.
// The string s must follow a special syntax:</br>
// `'[I] [am having|have] [a] [problem|question]'`</br>
// The corpus is composed by computing the cartesian product of all the phrases.
// It returns an array of sentences (i.e. strings).
prepare.string.composeCorpus = function ( s ) {
  if ( !s || ( typeof s !== 'string' ) ) return [];
  var extractQuotedText = prepare.helper.returnQuotedTextExtractor( '[', ']' );
  var quotedTextElems = extractQuotedText( s );
  var corpus = [];
  var finalCorpus = [];

  if ( !quotedTextElems ) return [];
  quotedTextElems.forEach( function ( e ) {
    corpus.push( e.split( '|' ) );
  } );

  helpers.array.product( corpus ).forEach( function ( e ) {
    finalCorpus.push( e.join( ' ' ) );
  } );
  return ( finalCorpus );
}; // composeCorpus()

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

// ### Prepare.Tokens Name Space

// Create prepare.tokens name space.
prepare.tokens = Object.create( null );

// #### stem

// Stems the input token `t` using `string.stem()`.
prepare.tokens.stem = function ( t ) {
  return t.map( prepare.string.stem );
}; // stem()

// #### phonetize

// Stems the input token `t` using `string.stem()`.
prepare.tokens.phonetize = function ( t ) {
  return t.map( prepare.string.phonetize );
}; // phonetize()

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

// Export prepare.
module.exports = prepare;
