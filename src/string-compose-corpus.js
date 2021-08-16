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
 * @alias string#composeCorpus
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
