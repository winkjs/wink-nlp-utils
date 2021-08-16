//     wink-nlp-utils
//     NLP Functions for amplifying negations, managing elisions,
//     creating ngrams, stems, phonetic codes to tokens and more.
//
//     Copyright (C) GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp-utils”.
//
//     Permission is hereby granted, free of charge, to any person obtaining a
//     copy of this software and associated documentation files (the "Software"),
//     to deal in the Software without restriction, including without limitation
//     the rights to use, copy, modify, merge, publish, distribute, sublicense,
//     and/or sell copies of the Software, and to permit persons to whom the
//     Software is furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included
//     in all copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//     OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

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
 * @alias tokens#removeWords
 * @param {string[]} tokens the input tokens.
 * @param {wordsFilter} [stopWords=defaultStopWords] default stop words are
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
