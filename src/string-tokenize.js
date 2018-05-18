//     wink-nlp-utils
//     NLP Functions for amplifying negations, managing elisions,
//     creating ngrams, stems, phonetic codes to tokens and more.
//
//     Copyright (C) 2017-18  GRAYPE Systems Private Limited
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
 * @name string.tokenize
 * @param {string} sentence — the input string.
 * @param {boolean} [detailed=false] — if true, each token is a object cotaining
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
