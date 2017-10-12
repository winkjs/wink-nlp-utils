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
var trim = require( './string-trim.js' );
// ## string

// ### sentences
/**
 *
 * Splits the input string into sentences. Punctuation marks found at the end
 * of a sentence are retained. The function can handle sentences beginning with
 * numbers as well, though it is not a good english practice. It uses `~` as the
 * special character for splitting and therefore it must not be present in the
 * input string; else you may give another special character as the second argument.
 *
 * @name string.sentences
 * @param {string} str — the input string.
 * @param {char} [splChar='~'] — a single character to be used for splitting into sentences;
 * it must not be resent in the `str`.
 * @return {string[]} of sentences.
 * @example
 * sentences( 'There is a cat. 2 dogs are running!' );
 * // -> [ 'There is a cat.', '2 dogs are running!' ]
 */
var sentences = function ( str, splChar ) {
  var splCh = splChar || '~';
  var substitute = '$1' + splCh;
  return ( str
            .replace( '...', '…' )
            .replace( rgx.eosPunctuations, substitute )
            .split( splCh )
            .map( trim )
         );
}; // sentences()

module.exports = sentences;
