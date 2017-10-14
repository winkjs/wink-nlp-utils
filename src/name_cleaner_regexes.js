//     wink-nlp-utils
//     NLP Functions for amplifying negations, managing elisions,
//     creating ngrams, stems, phonetic codes to tokens and more.
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
