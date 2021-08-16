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
var rgx = require( './util_regexes.js' );

// ## string

// ### retainAlphaNums
/**
 *
 * Retains only apha, numerals, and removes all other characters from
 * the input string, including leading, trailing and extra in-between
 * whitespaces.
 *
 * @alias string#retainAlphaNums
 * @param {string} str the input string.
 * @return {string} input string after removal of non-alphanumeric characters,
 * leading, trailing and extra whitespaces.
 * @example
 * retainAlphaNums( ' This, text here, has  (other) chars_! ' );
 * // -> 'This text here has other chars'
 */
var retainAlphaNums = function ( str ) {
  return ( str
            .replace( rgx.notAlphaNumeric, ' ')
            .replace( rgx.spaces, ' ')
            .trim()
          );
}; // retainAlphaNums()

module.exports = retainAlphaNums;
