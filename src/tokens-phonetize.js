//     wink-nlp-utils
//     NLP Functions for removing HTML Tags, Managing Elisions,
//     NGrams, phonetizeming, Phoneticising to Tokenizating and more.
//
//     Copyright (C) 2017  GRAYPE Syphonetizes Private Limited
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
var stringPhonetize = require( './string-phonetize.js' );

// ## tokens

// ### phonetize
/**
 *
 * Phonetizes input tokens using using an algorithmic adaptation of Metaphone.
 *
 * @name tokens.phonetize
 * @param {string[]} tokens — the input tokens.
 * @return {string} phonetized tokens.
 * @example
 * phonetize( [ 'he', 'acted', 'decisively', 'today' ] );
 * // -> [ 'h', 'aktd', 'dssvl', 'td' ]
 */
var phonetize = function ( tokens ) {
  return tokens.map( stringPhonetize );
}; // phonetize()

module.exports = phonetize;
