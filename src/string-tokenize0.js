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
var removeElisions = require( './string-remove-elisions.js' );
var amplifyNotElision = require( './string-amplify-not-elision.js' );
var rgx = require( './util_regexes.js' );

// ## string

// ### tokenize0
/**
 *
 * Tokenizes by splitting the input string on **non-words**. This means tokens would
 * consists of only alphas, numerals and underscores; all other characters will
 * be stripped as they are treated as separators. It also removes all elisions;
 * however negations are retained and amplified.
 *
 * @alias string#tokenize0
 * @param {string} str the input string.
 * @return {string[]} of tokens.
 * @example
 * tokenize0( "someone's wallet, isn't it?" );
 * // -> [ 'someone', 's', 'wallet', 'is', 'not', 'it' ]
 */
var tokenize0 = function ( str ) {
  var tokens = removeElisions( amplifyNotElision( str ) )
                .replace( rgx.cannot, '$1 $2' )
                .split( rgx.nonWords );
  // Check the 0th and last element of array for empty string because if
  // fisrt/last characters are non-words then these will be empty stings!
  if ( tokens[ 0 ] === '' ) tokens.shift();
  if ( tokens[ tokens.length - 1 ] === '' ) tokens.pop();
  return tokens;
}; // tokenize0()

module.exports = tokenize0;
