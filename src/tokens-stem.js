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
var porter2Stemmer = require( 'wink-porter2-stemmer' );

// ## tokens

// ### stem
/**
 *
 * Stems input tokens using Porter Stemming Algorithm Version 2.
 *
 * @name tokens.stem
 * @param {string[]} tokens — the input tokens.
 * @return {string[]} stemmed tokens.
 * @example
 * stem( [ 'he', 'acted', 'decisively', 'today' ] );
 * // -> [ 'he', 'act', 'decis', 'today' ]
 */
var stem = function ( tokens ) {
  return tokens.map( porter2Stemmer );
}; // stem()

module.exports = stem;
