//     wink-nlp-utils
//     NLP Functions for amplifying negations, managing elisions,
//     creating ngrams, stems, phonetic codes to tokens and more.
//
//     Copyright (C) 2017-18  GRAYPE Systems Private Limited
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

// ## string

// ### bow
/**
 *
 * Generates the bag of words from the input string. By default it
 * uses `word count` as it's frequency; but if `logCounts` parameter is set to true then
 * it will use `log2( word counts + 1 )` as it's frequency. It also has an alias **`bow()`**.
 *
 * @name tokens.bagOfWords
 * @param {string[]} tokens — the input tokens.
 * @param {number} [logCounts=false] — a true value flags the use of `log2( word count + 1 )`
 * instead of just `word count` as frequency.
 * @param {function} [ifn=undefined] — a function to build index; it is called for
 * every **unique occurrence of word** in `tokens`; and it receives the word and the `idx`
 * as input arguments. The `build()` function of [helper.returnIndexer](#helperreturnindexer)
 * may be used as `ifn`. If `undefined` then index is not built.
 * @param {number} [idx=undefined] — the index; passed as the second argument to the `ifn`
 * function.
 * @return {object} bag of words from tokens.
 * @example
 * bagOfWords( [ 'rain', 'rain', 'go', 'away' ] );
 * // -> { rain: 2, go: 1, away: 1 }
 * bow( [ 'rain', 'rain', 'go', 'away' ], true );
 * // -> { rain: 1.584962500721156, go: 1, away: 1 }
 */
var bow = function ( tokens, logCounts, ifn, idx ) {
  var bow1 = Object.create( null ),
      i, imax,
      token,
      words;
  for ( i = 0, imax = tokens.length; i < imax; i += 1 ) {
    token = tokens[ i ];
    if ( ( typeof ifn === 'function' ) && !bow1[ token ] ) {
        ifn( token, idx );
    }
    bow1[ token ] = 1 + ( bow1[ token ] || 0 );
  }
  if ( !logCounts ) return ( bow1 );
  words = Object.keys( bow1 );
  for ( i = 0, imax = words.length; i < imax; i += 1 ) {
    // Add `1` to ensure non-zero count! (Note: log2(1) is 0)
    bow1[ words[ i ] ] = Math.log2( bow1[ words[ i ] ] + 1 );
  }
  return ( bow1 );
}; // bow()

module.exports = bow;
