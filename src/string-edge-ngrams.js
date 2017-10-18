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

// ### edgeNGrams
/**
 *
 * Generates the edge ngrams from the input string.
 *
 * @name string.edgeNGrams
 * @param {string} str — the input string.
 * @param {number} [min=2] — size of ngram generated.
 * @param {number} [max=8] — size of ngram is generated.
 * @param {number} [delta=2] — edge ngrams are generated in increments of this value.
 * @param {function} [ifn=undefined] — a function to build index; it is called for
 * every edge ngram of `str`; and it receives the edge ngram and the `idx`
 * as input arguments. The `build()` function of [helper.returnIndexer](#helperreturnindexer)
 * may be used as `ifn`. If `undefined` then index is not built.
 * @param {number} [idx=undefined] — the index; passed as the second argument to the `ifn`
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
