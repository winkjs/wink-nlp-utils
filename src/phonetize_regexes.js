//     wink-nlp-utils
//     Easily tokenize, stem, phonetize, remove stop words,
//     manage elisions, create ngrams, bag of words and more
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
/* eslint no-underscore-dangle: "off" */
var rgx = Object.create( null );
// Remove repeating characters.
rgx.repeatingChars = /([^c])\1/g;
// Drop first character from character pairs, if found in the beginning.
rgx.kngnPairs = /^(kn|gn|pn|ae|wr)/;
// Drop vowels that are not found in the beginning.
rgx.__vowels = /(?!^)[aeiou]/g;
// Replaces `ough` in the end by 'f'
rgx.ough = /ough$/;
// Replace following 3 instances of `dg` by `j`.
rgx.dge = /dge/g;
rgx.dgi = /dgi/g;
rgx.dgy = /dgy/g;
// Replace `sch` by `sk`.
rgx.sch = /sch/g;
// Drop `c` in `sci, sce, scy`.
rgx.sci = /sci/g;
rgx.sce = /sce/g;
rgx.scy = /scy/g;
// Make 'sh' out of `tio & tia`.
rgx.tio = /tio/g;
rgx.tia = /tia/g;
// `t` is silent in `tch`.
rgx.tch = /tch/g;
// Drop `b` in the end if preceeded by `m`.
rgx.mb_ = /mb$/;
// These are pronounced as `k`.
rgx.cq = /cq/g;
rgx.ck = /ck/g;
// Here `c` sounds like `s`
rgx.ce = /ce/g;
rgx.ci = /ci/g;
rgx.cy = /cy/g;
// And this `f`.
rgx.ph = /ph/g;
// The `sh` finally replaced by `x`.
rgx.sh = /sh|sio|sia/g;
// This is open rgx - TODO: need to finalize.
rgx.vrnotvy = /([aeiou])(r)([^aeiouy])/g;
// `th` sounds like theta - make it 0.
rgx.th = /th/g;
// `c` sounds like `k` except when it is followed by `h`.
rgx.cnoth = /(c)([^h])/g;
// Even `q` sounds like `k`.
rgx.q = /q/g;
// The first `x` sounds like `s`.
rgx._x = /^x/;
// Otherwise `x` is more like `ks`.
rgx.x = /x/g;
// Drop `y` if not followed by a vowel or appears in the end.
rgx.ynotv = /(y)([^aeiou])/g;
rgx.y_ = /y$/;
// `z` is `s`.
rgx.z = /z/g;

// Export rgx.
module.exports = rgx;
