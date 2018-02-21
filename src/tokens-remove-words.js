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

var defaultStopWords = require( './dictionaries/stop_words.json' );
var words = require( './helper-return-words-filter.js' );
defaultStopWords = words( defaultStopWords );

// ## tokens

// ### removeWords
/**
 *
 * Removes the stop words from the input array of tokens.
 *
 * @name tokens.removeWords
 * @param {string[]} tokens — the input tokens.
 * @param {wordsFilter} [stopWords=defaultStopWords] — default stop words are
 * loaded from `stop_words.json` located under the `src/dictionaries/` directory.
 * Custom stop words can be created using [helper.returnWordsFilter ](#helperreturnwordsfilter).
 * @return {string[]} balance tokens.
 * @example
 * removeWords( [ 'this', 'is', 'a', 'cat' ] );
 * // -> [ 'cat' ]
 */
var removeWords = function ( tokens, stopWords ) {
  var givenStopWords = ( stopWords || defaultStopWords );
  return tokens.filter( givenStopWords.exclude );
}; // removeWords()

module.exports = removeWords;
