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

// ### removePunctuations
/**
 *
 * Removes each punctuation mark by replacing it with a whitespace. It looks for
 * the following punctuations — `.,;!?:"!'... - () [] {}`.
 *
 * Extra spaces, if required, may be removed using [string.removeExtraSpaces](#stringremoveextraspaces)
 * function.
 *
 * @name string.removePunctuations
 * @param {string} str — the input string.
 * @return {string} input string after removal of punctuations.
 * @example
 * removePunctuations( 'Punctuations like "\'\',;!?:"!... are removed' );
 * // -> 'Punctuations like               are removed'
 */
var removePunctuations = function ( str ) {
  return str.replace( rgx.punctuations, ' ' );
}; // removePunctuations()

module.exports = removePunctuations;
