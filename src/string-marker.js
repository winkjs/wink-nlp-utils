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

// ### marker
/**
 *
 * Generates `marker` of the input string; it is defined as 1-gram, sorted
 * and joined back as a string again. Marker is a quick and aggressive way
 * to detect similarity between short strings. Its aggression may lead to more
 * false positives such as `Meter` and `Metre` or `no melon` and `no lemon`.
 *
 * @memberof string
 * @param {string} str the input string.
 * @return {string} the marker.
 * @example
 * marker( 'the quick brown fox jumps over the lazy dog' );
 * // -> ' abcdefghijklmnopqrstuvwxyz'
 */
var marker = function ( str ) {
  var uniqChars = Object.create( null );
  for ( var i = 0, imax = str.length; i < imax; i += 1 ) {
    uniqChars[ str[ i ] ] = true;
  }
  return ( Object.keys( uniqChars ).sort().join('') );
}; // marker()

module.exports = marker;
