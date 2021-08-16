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

// ### returnIndexer

/**
 *
 * Returns an Indexer object that contains two functions. The first function `build()`
 * incrementally builds an index for each `element` using `itsIndex` — both passed as
 * parameters to it. The second function — `result()` allows accessing the index anytime.
 *
 * It is typically used with [string.soc](#stringsoc), [string.bong](#stringbong),
 * [string.song](#stringsong), and [tokens.sow](#tokenssow).
 *
 * @alias helper#returnIndexer
 * @return {indexer} used to build and access the index.
 * @example
 * var indexer = returnIndexer();
 * // -> { build: [function], result: [function] }
 */
var returnIndexer = function () {
  var theIndex = Object.create( null );
  var methods = Object.create( null );

  // Builds index by adding the `element` and `itsIndex`. The `itsIndex` should
  // be a valid JS array index; no validation checks are performed while building
  // index.
  var build = function ( element, itsIndex ) {
    theIndex[ element ] = theIndex[ element ] || [];
    theIndex[ element ].push( itsIndex );
    return true;
  }; // build()

  // Returns the index built so far.
  var result = function () {
    return theIndex;
  }; // result()

  methods.build = build;
  methods.result = result;

  return methods;
}; // index()

module.exports = returnIndexer;
