//     wink-nlp-utils
//     NLP Functions for amplifying negations, managing elisions,
//     creating ngrams, stems, phonetic codes to tokens and more.
//
//     Copyright (C) 2017-18  GRAYPE Systems Private Limited
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
var winkTokenize = require( 'wink-tokenizer' )().tokenize;

// ## string

// ### tokenize
/**
 *
 * Tokenizes the input `sentence` according to the value of `detailed` flag.
 * Any occurance of `...` in the `sentence` is
 * converted to ellipses. In `detailed = true` mode, it
 * tags every token with its type; the supported tags are currency, email,
 * emoji, emoticon, hashtag, number, ordinal, punctuation, quoted_phrase, symbol,
 * time, mention, url, and word.
 *
 * @alias string#tokenize
 * @param {string} sentence the input string.
 * @param {boolean} [detailed=false] if true, each token is a object cotaining
 * `value` and `tag` of each token; otherwise each token is a string. It's default
 * value of **false** ensures compatibility with previous version.
 * @return {(string[]|object[])} an array of strings if `detailed` is false otherwise
 * an array of objects.
 * @example
 * tokenize( "someone's wallet, isn't it? I'll return!" );
 * // -> [ 'someone', '\'s', 'wallet', ',', 'is', 'n\'t', 'it', '?',
 * //      'I', '\'ll', 'return', '!' ]
 *
 * tokenize( 'For details on wink, check out http://winkjs.org/ URL!', true );
 * // -> [ { value: 'For', tag: 'word' },
 * //      { value: 'details', tag: 'word' },
 * //      { value: 'on', tag: 'word' },
 * //      { value: 'wink', tag: 'word' },
 * //      { value: ',', tag: 'punctuation' },
 * //      { value: 'check', tag: 'word' },
 * //      { value: 'out', tag: 'word' },
 * //      { value: 'http://winkjs.org/', tag: 'url' },
 * //      { value: 'URL', tag: 'word' },
 * //      { value: '!', tag: 'punctuation' } ]
 */
var tokenize = function ( sentence, detailed ) {
  var tokens = winkTokenize( sentence.replace( '...', '…' ) );
  var i;
  if ( !detailed ) {
    for ( i = 0; i < tokens.length; i += 1 ) tokens[ i ] = tokens[ i ].value;
  }

  return tokens;
}; // tokenize()

module.exports = tokenize;
