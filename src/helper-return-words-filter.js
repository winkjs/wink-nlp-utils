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

// ## string

// ### returnWordsFilter

/**
 *
 * Returns an object containing the following functions: (a) `set()`, which returns
 * a set of mapped words given in the input array `words`. (b) `exclude()` that
 * is suitable for array filtering operations.
 *
 * If the second argument `mappers` is provided as an array of maping functions
 * then these are applied on the input array before converting into a set. A
 * mapper function must accept a string as argument and return a string as the result.
 * Examples of mapper functions are typically **string** functionss of **`wink-nlp-utils`**
 * such as `string.lowerCase()`, `string.stem()` and
 * `string.soundex()`.
 *
 * @alias helper#returnWordsFilter
 * @param {string[]} words that can be filtered using the returned wordsFilter.
 * @param {function[]} [mappers=undefined] optionally used to map each word before creating
 * the wordsFilter.
 * @return {wordsFilter} object containg `set()` and `exclude()` functions for `words`.
 * @example
 * var stopWords = [ 'This', 'That', 'Are', 'Is', 'Was', 'Will', 'a' ];
 * var myFilter = returnWordsFilter( stopWords, [ string.lowerCase ] );
 * [ 'this', 'is', 'a', 'cat' ].filter( myFilter.exclude );
 * // -> [ 'cat' ]
 */
var returnWordsFilter = function ( words, mappers ) {
  var mappedWords = words;
  var givenMappers = mappers || [];
  givenMappers.forEach( function ( m ) {
    mappedWords = mappedWords.map( m );
  } );

  mappedWords = new Set( mappedWords );

  var exclude = function ( t ) {
    return ( !( mappedWords.has( t ) ) );
  }; // exclude()

  var set = function () {
    return mappedWords;
  }; // set()

  return {
    set: set,
    exclude: exclude
  };
}; // returnWordsFilter()

module.exports = returnWordsFilter;
