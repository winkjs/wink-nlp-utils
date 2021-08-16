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
var rgx = require( './util_regexes.js' );

// ## string

// ### propagateNegations
/**
 *
 * It looks for negation tokens in the input array of tokens and propagates
 * negation to subsequent `upto` tokens by prefixing them by a `!`. It is useful
 * in handling text containing negations during tasks like similarity detection,
 * classification or search.
 *
 * @alias tokens#propagateNegations
 * @param {string[]} tokens the input tokens.
 * @param {number} [upto=2] number of tokens to be negated after the negation
 * token. Note, tokens are only negated either `upto` tokens or up to the token
 * preceeding the **`, . ; : ! ?`** punctuations.
 * @return {string[]} tokens with negation propagated.
 * @example
 * propagateNegations( [ 'mary', 'is', 'not', 'feeling', 'good', 'today' ] );
 * // -> [ 'mary', 'is', 'not', '!feeling', '!good', 'today' ]
 */
var propagateNegations = function ( tokens, upto ) {
  var i, imax, j, jmax;
  var tkns = tokens;
  var limit = upto || 2;
  for ( i = 0, imax = tkns.length; i < imax; i += 1 ) {
    if ( rgx.negations.test( tkns[ i ] ) ) {
      for ( j = i + 1, jmax = Math.min( imax, i + limit + 1 ); j < jmax; j += 1 ) {
        // Hit a punctuation mark, break out of the loop otherwise go *upto the limit*.
        // > TODO: promote to utilities regex, after test cases have been added.
        if ( ( /[\,\.\;\:\!\?]/ ).test( tkns[ j ] ) ) break;
        // Propoage negation: invert the token by prefixing a `!` to it.
        tkns[ j ] = '!' + tkns[ j ];
      }
      i = j;
    }
  }
  return tkns;
}; // propagateNegations()

module.exports = propagateNegations;
