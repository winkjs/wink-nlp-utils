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
var porter2Stemmer = require( 'wink-porter2-stemmer' );

// ## string

// ### stem
/**
 *
 * Stems an inflected word using Porter2 stemming algorithm.
 *
 * @memberof string
 * @param {string} word to be stemmed.
 * @return {string} the stemmed word.
 *
 * @example
 * stem( 'consisting' );
 * // -> 'consist'
 */
var stem = function ( word ) {
  return ( porter2Stemmer( word ) );
}; // stem()

module.exports = stem;
