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
// Abbreviations with `.` but are never are EOS.
const abbrvNoEOS = Object.create( null );
abbrvNoEOS[ 'mr.' ] = true;
abbrvNoEOS[ 'mrs.' ] = true;
abbrvNoEOS[ 'ms.' ] = true;
abbrvNoEOS[ 'er.' ] = true;
abbrvNoEOS[ 'dr.' ] = true;
abbrvNoEOS[ 'miss.' ] = true;
abbrvNoEOS[ 'shri.' ] = true;
abbrvNoEOS[ 'smt.' ] = true;
abbrvNoEOS[ 'i.e.' ] = true;
abbrvNoEOS[ 'ie.' ] = true;
abbrvNoEOS[ 'e.g.' ] = true;
abbrvNoEOS[ 'eg.' ] = true;
abbrvNoEOS[ 'viz.' ] = true;
abbrvNoEOS[ 'pvt.' ] = true;
// et al.
abbrvNoEOS[ 'et.' ] = true;
abbrvNoEOS[ 'al.' ] = true;
// Mount Kailash!
abbrvNoEOS[ 'mt.' ] = true;
// Pages!
abbrvNoEOS[ 'pp.' ] = true;

const abbrvMayBeEOS = Object.create( null );
abbrvMayBeEOS[ 'inc.' ] = true;
abbrvMayBeEOS[ 'ltd.' ] = true;
abbrvMayBeEOS[ 'al.' ] = true;
// Regex to test potential End-Of-Sentence.
const rgxPotentialEOS = /\.$|\!$|\?$/;
// Regex to test special cases of "I" at eos.
const rgxSplI = /i\?$|i\!$/;
// Regex to test first char as alpha only
const rgxAlphaAt0 = /^[^a-z]/i;

// ## string

// ### sentences
/**
 *
 * Detects the sentence boundaries in the input `paragraph` and splits it into
 * an array of sentence(s).
 *
 * @memberof string
 * @param {string} paragraph the input string.
 * @return {string[]} of sentences.
 * @example
 * sentences( 'AI Inc. is focussing on AI. I work for AI Inc. My mail is r2d2@yahoo.com' );
 * // -> [ 'AI Inc. is focussing on AI.',
 * //      'I work for AI Inc.',
 * //      'My mail is r2d2@yahoo.com' ]
 *
 * sentences( 'U.S.A is my birth place. I was born on 06.12.1924. I climbed Mt. Everest.' );
 * // -> [ 'U.S.A is my birth place.',
 * //      'I was born on 06.12.1924.',
 * //      'I climbed Mt. Everest.' ]
 */
var punkt = function ( paragraph ) {
  // The basic idea is to split the paragraph on `spaces` and thereafter
  // examine each word ending with an EOS punctuation for a possible EOS.

  // Split on **space** to obtain all the `tokens` in the `para`.
  const paraTokens = paragraph.split( ' ' );
  var sentenceTokens = [];
  var sentences = [];

  for ( let k = 0; k < paraTokens.length; k += 1 ) {
    // A para token.
    const pt = paraTokens[ k ];
    // A lower cased para token.
    const lcpt = pt.toLowerCase();
    if ( ( rgxPotentialEOS.test( pt ) ) && !abbrvNoEOS[ lcpt ] && ( pt.length !== 2 || rgxAlphaAt0.test( pt ) || rgxSplI.test( lcpt ) ) ) {
      // Next para token that is non-blank.
      let nextpt;
      // Append this token to the current sentence tokens.
      sentenceTokens.push( pt );
      // If the current token is one of the abbreviations that may also mean EOS.
      if ( abbrvMayBeEOS[ lcpt ] ) {
        for ( let j = k + 1; j < paraTokens.length && !nextpt; j += 1 ) {
          nextpt = paraTokens[ j ];
        }
      }
      // If no next para token or if present then starts from a Cap Letter then
      // only complete sentence and start a new one!
      if ( nextpt === undefined || ( /^[A-Z]/ ).test( nextpt ) ) {
        sentences.push( sentenceTokens.join( ' ' ) );
        sentenceTokens = [];
      }
    } else sentenceTokens.push( pt );
  }

  if ( sentenceTokens.length > 0 ) sentences.push( sentenceTokens.join( ' ' ) );

  return sentences;
}; // punkt()

module.exports = punkt;
