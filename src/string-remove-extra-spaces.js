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
var rgx = require( './util_regexes.js' );

// ## string

// ### removeExtraSpaces
/**
 *
 * Removes leading, trailing and any extra in-between whitespaces from the input
 * string.
 *
 * @name string.removeExtraSpaces
 * @param {string} str — the input string.
 * @return {string} input string after removal of leading, trailing and extra
 * whitespaces.
 * @example
 * removeExtraSpaces( '   Padded   Text    ' );
 * // -> 'Padded Text'
 */
var removeExtraSpaces = function ( str ) {
  return ( str
            .trim()
            .replace( rgx.spaces, ' ')
         );
}; // removeExtraSpaces()

module.exports = removeExtraSpaces;
