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
var removeElisions = require( './string-remove-elisions.js' );
var amplifyNotElision = require( './string-amplify-not-elision.js' );
var rgx = require( './util_regexes.js' );

// ## string

// ### tokenize0
/**
 *
 * Tokenizes by splitting the input string on **non-words**. This means tokens would
 * consists of only alphas, numerals and underscores; all other characters will
 * be stripped as they are treated as separators. It also removes all elisions;
 * however negations are retained and amplified.
 *
 * @name string.tokenize0
 * @param {string} str — the input string.
 * @return {string[]} of tokens.
 * @example
 * tokenize0( "someone's wallet, isn't it?" );
 * // -> [ 'someone', 's', 'wallet', 'is', 'not', 'it' ]
 */
var tokenize0 = function ( str ) {
  var tokens = removeElisions( amplifyNotElision( str ) )
                .replace( rgx.cannot, '$1 $2' )
                .split( rgx.nonWords );
  // Check the 0th and last element of array for empty string because if
  // fisrt/last characters are non-words then these will be empty stings!
  if ( tokens[ 0 ] === '' ) tokens.shift();
  if ( tokens[ tokens.length - 1 ] === '' ) tokens.pop();
  return tokens;
}; // tokenize0()

module.exports = tokenize0;
