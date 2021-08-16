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

// ### setOfNGrams
/**
 *
 * Generates the set of ngrams of `size` from the input string. The
 * default size is 2, which means it will generate set of bigrams by default.
 * It also has an alias **`song()`**.
 *
 * @alias string#setOfNGrams
 * @param {string} str the input string.
 * @param {number} [size=2] ngram size.
 * @param {function} [ifn=undefined] a function to build index; it is called for
 * every **unique occurrence of ngram** of `str`; and it receives the ngram and the `idx`
 * as input arguments. The `build()` function of [helper.returnIndexer](#helperreturnindexer)
 * may be used as `ifn`. If `undefined` then index is not built.
 * @param {number} [idx=undefined] the index; passed as the second argument to the `ifn`
 * function.
 * @return {set} of ngrams of `size` of `str`.
 * @example
 * setOfNGrams( 'mama' );
 * // -> Set { 'ma', 'am' }
 * song( 'mamma' );
 * // -> Set { 'ma', 'am', 'mm' }
 */
var setOfNGrams = function ( str, size, ifn, idx ) {
  var ng = ( size || 2 ),
      ngSet = new Set(),
      tg;
  for ( var i = 0, imax = str.length; i < imax; i += 1 ) {
    tg = str.slice( i, i + ng );
    if ( tg.length === ng ) {
      if ( ( typeof ifn === 'function' ) && !ngSet.has( tg ) ) {
          ifn( tg, idx );
      }
      ngSet.add( tg );
    }
  }
  return ( ngSet );
}; // song()

module.exports = setOfNGrams;
