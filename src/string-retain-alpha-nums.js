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
var rgx = require( './util_regexes.js' );

// ## string

// ### retainAlphaNums
/**
 *
 * Retains only apha, numerals, and removes all other characters from
 * the input string, including leading, trailing and extra in-between
 * whitespaces.
 *
 * @memberof string
 * @param {string} str the input string.
 * @return {string} input string after removal of non-alphanumeric characters,
 * leading, trailing and extra whitespaces.
 * @example
 * retainAlphaNums( ' This, text here, has  (other) chars_! ' );
 * // -> 'This text here has other chars'
 */
var retainAlphaNums = function ( str ) {
  return ( str
            .replace( rgx.notAlphaNumeric, ' ')
            .replace( rgx.spaces, ' ')
            .trim()
          );
}; // retainAlphaNums()

module.exports = retainAlphaNums;
