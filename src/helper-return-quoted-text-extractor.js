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

// ### returnQuotedTextExtractor

/**
 *
 * Returns a function that extracts all occurrences of every quoted text
 * between the `lq` and the `rq` characters from its argument. This argument
 * must be of type string.
 *
 * @name helper.returnQuotedTextExtractor
 * @param {string} [lq='"'] — the left quote character.
 * @param {string} [rq='"'] — the right quote character.
 * @return {function} that will accept an input string argument and return an
 * array of all substrings that are quoted between `lq` and `rq`.
 * @example
 * var extractQuotedText = returnQuotedTextExtractor();
 * extractQuotedText( 'Raise 2 issues - "fix a bug" & "run tests"' );
 * // -> [ 'fix a bug', 'run tests' ]
 */
var returnQuotedTextExtractor = function ( lq, rq ) {
  var // Index variable for *for-loop*
      i,
      // Set defaults for left quote, if required.
      lq1 = ( ( lq && ( typeof lq === 'string' ) ) ? lq : '"' ),
      // Extracts its length
      lqLen = lq1.length,
      // The regular expression is created here.
      regex = null,
      // The string containing the regular expression builds here.
      rgxStr = '',
      // Set defaults for right quote, if required.
      rq1 = ( ( rq && ( typeof rq === 'string' ) ) ? rq : lq1 ),
      // Extract its length.
      rqLen = rq1.length;

  // Build `rgxStr`
  for ( i = 0; i < lqLen; i += 1 ) rgxStr += '\\' + lq1.charAt( i );
  rgxStr += '.*?';
  for ( i = 0; i < rqLen; i += 1 ) rgxStr += '\\' + rq1.charAt( i );
  // Create regular expression.
  regex = new RegExp( rgxStr, 'g' );
  // Return the extractor function.
  return ( function ( s ) {
    if ( !s || ( typeof s !== 'string' ) ) return null;
    var // Extracted elements are captured here.
        elements = [],
        // Extract matches with quotes
        matches = s.match( regex );
    if ( !matches || ( matches.length === 0 ) ) return null;
    // Collect elements after removing the quotes.
    for ( var k = 0, kmax = matches.length; k < kmax; k += 1 ) {
      elements.push( matches[ k ].substr( lqLen, matches[ k ].length - ( rqLen + lqLen ) ) );
    }
    return ( elements );
  } );
}; // returnQuotedTextExtractor()

module.exports = returnQuotedTextExtractor;
