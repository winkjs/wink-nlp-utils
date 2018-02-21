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

// ## string

// ### splitElisions
/**
 *
 * Splits basic elisions found in the input string. Typical example of elisions
 * are `it's, let's, where's, I'd, I'm, I'll, I've, and Isn't` etc. Note it does
 * not touch apostrophe used to indicate possession.
 *
 * @name string.splitElisions
 * @param {string} str — the input string.
 * @return {string} input string after splitting of elisions.
 * @example
 * splitElisions( "someone's wallet, isn't it?" );
 * // -> "someone's wallet, is n't it?"
 */
var splitElisions = function ( str ) {
  return ( str
            .replace( rgx.elisionsSpl, '$2 $3' )
            .replace( rgx.elisions1, '$1 $2' )
            .replace( rgx.elisions2, '$1 $2' )
         );
}; // splitElisions()

module.exports = splitElisions;
