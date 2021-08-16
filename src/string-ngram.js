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

// ### ngram
/**
 *
 * Generates an array of ngrams of a specified size from the input string. The
 * default size is 2, which means it will generate bigrams by default.
 *
 * @alias string#ngram
 * @param {string} str the input string.
 * @param {number} [size=2] ngram's size.
 * @return {string[]} ngrams of `size` from `str`.
 * @example
 * ngram( 'FRANCE' );
 * // -> [ 'FR', 'RA', 'AN', 'NC', 'CE' ]
 * ngram( 'FRENCH' );
 * // -> [ 'FR', 'RE', 'EN', 'NC', 'CH' ]
 * ngram( 'FRANCE', 3 );
 * // -> [ 'FRA', 'RAN', 'ANC', 'NCE' ]
 */
var ngram = function ( str, size ) {
  var ng = ( size || 2 ),
      ngramz = [],
      tg;
  for ( var i = 0, imax = str.length; i < imax; i += 1 ) {
    tg = str.slice( i, i + ng );
    if ( tg.length === ng ) ngramz.push( tg );
  }
  return ( ngramz );
}; // ngram()

module.exports = ngram;
