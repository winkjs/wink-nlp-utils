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

// ### upperCase
/**
 *
 * Converts the input string to upper case.
 *
 * @name string.upperCase
 * @param {string} str — the input string.
 * @return {string} input string in upper case.
 * @example
 * upperCase( 'Upper Case' );
 * // -> 'UPPER CASE'
 */
var upperCase = function ( str ) {
  return ( str.toUpperCase() );
}; // upperCase()

module.exports = upperCase;
