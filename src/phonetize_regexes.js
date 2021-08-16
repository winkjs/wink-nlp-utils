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
