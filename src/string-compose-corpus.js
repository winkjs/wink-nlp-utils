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
var helpers = require( 'wink-helpers' );
var returnQuotedTextExtractor = require( './helper-return-quoted-text-extractor.js' );
var extractQuotedText = returnQuotedTextExtractor( '[', ']' );
// ## string

// ### composeCorpus
/**
 *
 * Generates all possible sentences from the input argument string.
 * The string s must follow a special syntax as illustrated in the
 * example below:<br/>
 * `'[I] [am having|have] [a] [problem|question]'`<br/>
 *
 * Each phrase must be quoted between `[ ]` and each possible option of phrases
 * (if any) must be separated by a `|` character. The corpus is composed by
 * computing the cartesian product of all the phrases.
 *
 * @memberof string
 * @param {string} str the input string.
 * @return {string[]} of all possible sentences.
 * @example
 * composeCorpus( '[I] [am having|have] [a] [problem|question]' );
 * // -> [ 'I am having a problem',
 * //      'I am having a question',
 * //      'I have a problem',
 * //      'I have a question' ]
 */
var composeCorpus = function ( str ) {
  if ( !str || ( typeof str !== 'string' ) ) return [];

  var quotedTextElems = extractQuotedText( str );
  var corpus = [];
  var finalCorpus = [];

  if ( !quotedTextElems ) return [];
  quotedTextElems.forEach( function ( e ) {
    corpus.push( e.split( '|' ) );
  } );

  helpers.array.product( corpus ).forEach( function ( e ) {
    finalCorpus.push( e.join( ' ' ) );
  } );
  return ( finalCorpus );
}; // composeCorpus()

module.exports = composeCorpus;
