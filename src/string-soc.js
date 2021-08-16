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

// ### setOfChars
/**
 *
 * Creates a set of chars from the input string `s`. This is useful
 * in even more aggressive string matching using Jaccard or Tversky compared to
 * `marker()`. It also has an alias **`soc()`**.
 *
 * @alias string#setOfChars
 * @param {string} str the input string.
 * @param {function} [ifn=undefined] a function to build index; it receives the first
 * character of `str` and the `idx` as input arguments. The `build()` function of
 * [helper.returnIndexer](#helperreturnindexer) may be used as `ifn`. If `undefined`
 * then index is not built.
 * @param {number} [idx=undefined] the index; passed as the second argument to the `ifn`
 * function.
 * @return {string} the soc.
 * @example
 * setOfChars( 'the quick brown fox jumps over the lazy dog' );
 * // -> ' abcdefghijklmnopqrstuvwxyz'
 */
var setOfChars = function ( str, ifn, idx ) {
  var cset = new Set( str );
  if ( typeof ifn === 'function' ) {
      ifn( str[ 0 ], idx );
  }
  return ( cset );
}; // soc()

module.exports = setOfChars;
