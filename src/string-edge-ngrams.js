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

// ### edgeNGrams
/**
 *
 * Generates the edge ngrams from the input string.
 *
 * @alias string#edgeNGrams
 * @param {string} str the input string.
 * @param {number} [min=2] size of ngram generated.
 * @param {number} [max=8] size of ngram is generated.
 * @param {number} [delta=2] edge ngrams are generated in increments of this value.
 * @param {function} [ifn=undefined] a function to build index; it is called for
 * every edge ngram of `str`; and it receives the edge ngram and the `idx`
 * as input arguments. The `build()` function of [helper.returnIndexer](#helperreturnindexer)
 * may be used as `ifn`. If `undefined` then index is not built.
 * @param {number} [idx=undefined] the index; passed as the second argument to the `ifn`
 * function.
 * @return {string[]} of edge ngrams.
 * @example
 * edgeNGrams( 'decisively' );
 * // -> [ 'de', 'deci', 'decisi', 'decisive' ]
 * edgeNGrams( 'decisively', 8, 10, 1 );
 * // -> [ 'decisive', 'decisivel', 'decisively' ]
 */
var edgeNGrams = function ( str, min, max, delta, ifn, idx ) {
  var dlta = ( delta || 2 ),
      eg,
      egs = [],
      imax = Math.min( ( max || 8 ), str.length ) + 1,
      start = ( min || 2 );

  // Generate edge ngrams
  for ( var i = start; i < imax; i += dlta ) {
    eg = str.slice( 0, i );
    egs.push( eg );
    if ( typeof ifn === 'function' ) {
        ifn( eg, idx );
    }
  }
  return ( egs );
}; // edgeNGrams()

module.exports = edgeNGrams;
