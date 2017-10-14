//     wink-nlp-utils
//     NLP Functions for amplifying negations, managing elisions,
//     creating ngrams, stems, phonetic codes to tokens and more.
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

// ## string

// ### propagateNegations
/**
 *
 * It looks for negation tokens in the input array of tokens and propagates
 * negation to subsequent `upto` tokens by prefixing them by a `!`. It is useful
 * in handling text containing negations during tasks like similarity detection,
 * classification or search.
 *
 * @name tokens.propagateNegations
 * @param {string[]} tokens — the input tokens.
 * @param {number} [upto=2] — number of tokens to be negated after the negation
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
        if ( /[\,\.\;\:\!\?]/.test( tkns[ j ] ) ) break;
        // Propoage negation: invert the token by prefixing a `!` to it.
        tkns[ j ] = '!' + tkns[ j ];
      }
      i = j;
    }
  }
  return tkns;
}; // propagateNegations()

module.exports = propagateNegations;
