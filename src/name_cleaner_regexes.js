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
var degrees = [
  /\bm\.?\s*a\b/i,
  /\bb\.?\s*a\b/i,
  /\bb\.?\s*tech\b/i,
  /\bm\.?\s*tech\b/i,
  /\bb\.?\s*des\b/i,
  /\bm\.?\s*des\b/i,
  /\bm\.?\s*b\.?\s*a\b/i,
  /\bm\.?\s*c\.?\s*a\b/i,
  /\bb\.?\s*c\.?\s*a\b/i,
  /\bl\.?\s*l\.?\s*b\b/i,
  /\bl\.?\s*l\.?\s*m\b/i,
  /\bm\.?\s*b\.?\s*b\.?\s*s\b/i,
  /\bm\.?\s*d\b/i,
  /\bd\.?\s*m\b/i,
  /\bm\.?\s*s\b/i,
  /\bd\.?\s*n\.?\s*b\b/i,
  /\bd\.?\s*g\.?\s*o\b/i,
  /\bd\.?\s*l\.?\s*o\b/i,
  /\bb\.?\s*d\.?\s*s\b/i,
  /\bb\.?\s*h\.?\s*m\.?\s*s\b/i,
  /\bb\.?\s*a\.?\s*m\.?\s*s\b/i,
  /\bf\.?\s*i\.?\s*c\.?\s*s\b/i,
  /\bm\.?\s*n\.?\s*a\.?\s*m\.?\s*s\b/i,
  /\bb\.?\s*e\.?\s*m\.?\s*s\b/i,
  /\bd\.?\s*c\.?\s*h\b/i,
  /\bm\.?\s*c\.?\s*h\b/i,
  /\bf\.?\s*r\.?\s*c\.?\s*s\b/i,
  /\bm\.?\s*r\.?\s*c\.?\s*p\b/i,
  /\bf\.?\s*i\.?\s*a\.?\s*c\.?\s*m\b/i,
  /\bf\.?\s*i\.?\s*m\.?\s*s\.?\s*a\b/i,
  /\bp\.?\s*h\.?\s*d\b/i,
 ];

var titleNames = [ 'mr', 'mrs', 'miss', 'ms', 'master', 'er', 'dr', 'shri', 'shrimati', 'sir' ];

var titles = new RegExp( '^(?:' + titleNames.join( '|' ) + ')$', 'i' );

module.exports = {
  degrees: degrees,
  titles: titles
};
