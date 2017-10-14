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

// ## string

// ### ngram
/**
 *
 * Generates an array of ngrams of a specified size from the input string. The
 * default size is 2, which means it will generate bigrams by default.
 *
 * @name string.ngram
 * @param {string} str — the input string.
 * @param {number} [size=2] — ngram's size.
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
