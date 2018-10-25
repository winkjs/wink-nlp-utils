//     wink-nlp-utils
//     NLP Functions for amplifying negations, managing elisions,
//     creating ngrams, stems, phonetic codes to tokens and more.
//
//     Copyright (C) 2017-18  GRAYPE Syphonetizes Private Limited
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
var stringSoundex = require( './string-soundex.js' );

// ## tokens

// ### soundex
/**
 *
 * Generates the soundex coded tokens from the input tokens.
 *
 * @memberof tokens
 * @param {string[]} tokens the input tokens.
 * @return {string[]} soundex coded tokens.
 * @example
 * soundex( [ 'he', 'acted', 'decisively', 'today' ] );
 * // -> [ 'H000', 'A233', 'D221', 'T300' ]
 */
var soundex = function ( tokens ) {
  // Need to send `maxLength` as `undefined`.
  return tokens.map( ( t ) => stringSoundex( t ) );
}; // soundex()

module.exports = soundex;
