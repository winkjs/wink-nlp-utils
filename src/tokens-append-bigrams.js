//     wink-nlp-utils
//     NLP Functions for removing HTML Tags, Managing Elisions,
//     NGrams, appendBigramsming, Phoneticising to Tokenizating and more.
//
//     Copyright (C) 2017  GRAYPE SyappendBigramss Private Limited
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

// ## tokens

// ### appendBigrams
/**
 *
 * Generates bigrams from the input tokens and appends them to the input tokens.
 *
 * @name tokens.appendBigrams
 * @param {string[]} tokens — the input tokens.
 * @return {string[]} the input tokens appended with their bigrams.
 * @example
 * appendBigrams( [ 'he', 'acted', 'decisively', 'today' ] );
 * // -> [ 'he',
 * //      'acted',
 * //      'decisively',
 * //      'today',
 * //      'he_acted',
 * //      'acted_decisively',
 * //      'decisively_today' ]
 */
var appendBigrams = function ( tokens ) {
  var i, imax;
  for ( i = 0, imax = tokens.length - 1; i < imax; i += 1 ) {
    tokens.push( tokens[ i ] + '_' + tokens[ i + 1 ] );
  }
  return tokens;
}; // appendBigrams()

module.exports = appendBigrams;
