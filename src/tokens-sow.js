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

// ### setOfWords
/**
 *
 * Generates the set of words from the input string. It also has an alias **`sow()`**.
 *
 * @memberof tokens
 * @param {string[]} tokens the input tokens.
 * @param {function} [ifn=undefined] a function to build index; it is called for
 * every **member word of the set **; and it receives the word and the `idx`
 * as input arguments. The `build()` function of [helper.returnIndexer](#helperreturnindexer)
 * may be used as `ifn`. If `undefined` then index is not built.
 * @param {number} [idx=undefined] the index; passed as the second argument to the `ifn`
 * function.
 * @return {set} of words from tokens.
 * @example
 * setOfWords( [ 'rain', 'rain', 'go', 'away' ] );
 * // -> Set { 'rain', 'go', 'away' }
 */
var setOfWords = function ( tokens, ifn, idx ) {
  var tset = new Set( tokens );
  if ( typeof ifn === 'function' ) {
    tset.forEach( function ( m ) {
        ifn( m, idx );
    } );
  }
  return ( tset );
}; // bow()

module.exports = setOfWords;
