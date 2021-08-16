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

/**
 * @classdesc Indexer object
 * @class Indexer
 * @hideconstructor
 */

/**
 * Incrementally builds index for each `element/itsIndex` combination passed.
 *
 * @method Indexer#build
 * @param elements
 * @param itsIndex
 */

 /**
  * Used to access the index. This index is in a form of an object that contains
  * each element as key. The value of each key is an array
  * containing all index positions to the element in question. Note these index positions
  * are nothing but each `itsIndex` value passed for the `element`.
  *
  * @method Indexer#result
  * @returns {Object}
  */

/**
 * @classdesc WordsFilter
 * @class WordsFilter
 * @hideconstructor
 */

 /**
  * Contains the set created from the array `words`.
  *
  * @method WordsFilter#set
  */

  /**
   * Used with the array's filter method to exclude the `words` or mapped
   * `words` if `givenMappers` are defined.
   *
   * @method WordsFilter#exclude
   */
