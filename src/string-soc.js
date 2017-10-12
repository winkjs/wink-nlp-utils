//     wink-nlp-utils
//     NLP Functions for removing HTML Tags, Managing Elisions,
//     NGrams, Stemming, Phoneticising to Tokenizating and more.
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

// ## string

// ### soc
/**
 *
 * Creates a **s**et **o**f **c**hars from the input string `s`. This is useful
 * in even more aggressive string matching using Jaccard or Tversky compared to
 * `marker()`.
 *
 * @name string.soc
 * @param {string} str — the input string.
 * @param {function} [ifn=undefined] — a function to build index; it receives the first
 * character of `str` and the `idx` as input arguments. The `build()` function of
 * [helper.returnIndexer](#helperreturnindexer) may be used as `ifn`. If `undefined`
 * then index is not built.
 * @param {number} [idx=undefined] — the index; passed as the second argument to the `ifn`
 * function.
 * @return {string} the soc.
 * @example
 * soc( 'the quick brown fox jumps over the lazy dog' );
 * // -> ' abcdefghijklmnopqrstuvwxyz'
 */
var soc = function ( str, ifn, idx ) {
  var cset = new Set( str );
  if ( typeof ifn === 'function' ) {
      ifn( str[ 0 ], idx );
  }
  return ( cset );
}; // soc()

module.exports = soc;
