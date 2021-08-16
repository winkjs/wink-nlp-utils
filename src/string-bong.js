//     wink-nlp-utils
//     NLP Functions for amplifying negations, managing elisions,
//     creating ngrams, stems, phonetic codes to tokens and more.
//
//     Copyright (C) GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp-utils”.
//
//     Permission is hereby granted, free of charge, to any person obtaining a
//     copy of this software and associated documentation files (the "Software"),
//     to deal in the Software without restriction, including without limitation
//     the rights to use, copy, modify, merge, publish, distribute, sublicense,
//     and/or sell copies of the Software, and to permit persons to whom the
//     Software is furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included
//     in all copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//     OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//

// ## string

// ### bagOfNGrams
/**
 *
 * Generates the bag of ngrams of `size` from the input string. The
 * default size is 2, which means it will generate bag of bigrams by default. It
 * also has an alias **`bong()`**.
 *
 * @alias string#bagOfNGrams
 * @param {string} str the input string.
 * @param {number} [size=2] ngram size.
 * @param {function} [ifn=undefined] a function to build index; it is called for
 * every **unique occurrence of ngram** of `str`; and it receives the ngram and the `idx`
 * as input arguments. The `build()` function of [helper.returnIndexer](#helperreturnindexer)
 * may be used as `ifn`. If `undefined` then index is not built.
 * @param {number} [idx=undefined] the index; passed as the second argument to the `ifn`
 * function.
 * @return {object} bag of ngrams of `size` from `str`.
 * @example
 * bagOfNGrams( 'mama' );
 * // -> { ma: 2, am: 1 }
 * bong( 'mamma' );
 * // -> { ma: 2, am: 1, mm: 1 }
 */
var bagOfNGrams = function ( str, size, ifn, idx ) {
  var ng = ( size || 2 ),
      ngBOW = Object.create( null ),
      tg;
  for ( var i = 0, imax = str.length; i < imax; i += 1 ) {
    tg = str.slice( i, i + ng );
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

module.exports = bagOfNGrams;
