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

// ## string

// ### returnWordsFilter

/**
 *
 * Returns an object contains the following functions: (a) `set()`, which returns
 * a set of mapped words given in the input array `words`. (b) `exclude()` that
 * is suitable for array filtering operations.
 *
 * If the second argument `mappers` is provided as an array of maping functions
 * then these are applied on the input array before converting into a set.
 * Examples of mapper functions are `string.stem()` and
 * `string.phonetize()`.
 *
 * @name helper.returnWordsFilter
 * @param {string[]} words — the input string.
 * @param {function[]} mappers — the input string.
 * @return {wordsFilter} input string in lower case.
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
