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
var trim = require( './string-trim.js' );
// ## string

// ### extractRunOfCapitalWords
/**
 *
 * Extracts the array of text appearing as Title Case or in ALL CAPS from the
 * input string.
 *
 * @memberof string
 * @param {string} str the input string.
 * @return {string[]} of text appearing in Title Case or in ALL CAPS; if no such
 * text is found then `null` is returned.
 * @example
 * extractRunOfCapitalWords( 'In The Terminator, Sarah Connor is in Los Angeles' );
 * // -> [ 'In The Terminator', 'Sarah Connor', 'Los Angeles' ]
 */
var extractRunOfCapitalWords = function ( str ) {
  var m = str.match( rgx.rocWords );
  return ( ( m ) ? m.map( trim ) : m );
}; // extractRunOfCapitalWords()

module.exports = extractRunOfCapitalWords;
