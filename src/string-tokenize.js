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
var splitElisions = require( './string-split-elisions.js' );
var amplifyNotElision = require( './string-amplify-not-elision.js' );
var rgx = require( './util_regexes.js' );

// ## string

// ### tokenize
/**
 *
 * The function uses the following set of rules to tokenize:
 *
 * 1. Single quotes are processed first as they may be part of elisions; and
 * `...` are converted to ellipses.
 * 2. `Not` elisions are amplified and then split on elisions. Thus words with elisions get tokenized.
 * 3. The word `cannot` is split in to `can not`.
 * 4. `. , -` punctuations that commonly embedded in numbers are left intact,
 * 5. All other punctuations are tokenized.
 * 6. The currency symbols are padded by space i.e. become separate tokens.
 * 7. Underscore (`_`) embedded in the word is preserved.
 * 8. Spacial characters are left untouched and may/may not become separate token.
 * 9. Finally after removing extra/leading/trailing spaces, split on space to tokenize.
 *
 * @name string.tokenize
 * @param {string} str — the input string.
 * @return {string[]} of tokens.
 * @example
 * tokenize( "someone's wallet, isn't it? I'll return!" );
 * // -> [ 'someone\'s', 'wallet', ',', 'is', 'not', 'it',
 * //      '?', 'i', '\'ll', 'return', '!' ]
 */
var tokenize = function ( str ) {
  // Handle single quotes first & ellipses.
  var su = str
            // > TODO: promote to regex utils after adding more test cases
            .replace( /(^|[^a-z0-9])(\’|\')/gi, '$1 $2 ')
            .replace( /([a-z0-9])(\’|\')(\W)/gi, '$1 $2 $3')
            .replace( '...', '…' )
            .replace( '…', ' … ' );
  var tokens = splitElisions( amplifyNotElision( su ) )
            // Handle cannot.
            .replace( rgx.cannot, '$1 $2' )
            // Separate out punctuations that are not part of a number.
            .replace( rgx.nonNumPunctuations, ' $& ' )
            // Separate out all other punctuations.
            .replace( /[\‘\’\`\“\”\"\[\]\(\)\{\}\…\!\;\?\/\:]/ig, ' $& ' )
            // Separate out currency symbol; all separated stuff becomes a token.
            .replace( rgx.currency, ' $& ')
            .replace( rgx.spaces, ' ' )
            .trim()
            // Handle period sign in the end specially.
            .replace( /\.$/, ' .' )
            // Now tokenize on space!
            .split( ' ' );
  // Splitting an empty string on space leaves an empty string in the array,
  // get rid of it.
  return ( ( tokens.length === 1 && tokens[ 0 ] === '' ) ? [] : tokens );
}; // tokenize()

module.exports = tokenize;
