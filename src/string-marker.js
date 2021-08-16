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

// ### marker
/**
 *
 * Generates `marker` of the input string; it is defined as 1-gram, sorted
 * and joined back as a string again. Marker is a quick and aggressive way
 * to detect similarity between short strings. Its aggression may lead to more
 * false positives such as `Meter` and `Metre` or `no melon` and `no lemon`.
 *
 * @alias string#marker
 * @param {string} str the input string.
 * @return {string} the marker.
 * @example
 * marker( 'the quick brown fox jumps over the lazy dog' );
 * // -> ' abcdefghijklmnopqrstuvwxyz'
 */
var marker = function ( str ) {
  var uniqChars = Object.create( null );
  for ( var i = 0, imax = str.length; i < imax; i += 1 ) {
    uniqChars[ str[ i ] ] = true;
  }
  return ( Object.keys( uniqChars ).sort().join('') );
}; // marker()

module.exports = marker;
