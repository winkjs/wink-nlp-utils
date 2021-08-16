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
var rgx = Object.create( null );

// Matches standard english punctuations in a text.
rgx.punctuations = /[\’\'\‘\’\`\“\”\"\[\]\(\)\{\}\…\,\.\!\;\?\/\-\:]/ig;
// End Of Sentence Punctuations - useful for splitting text into sentences.
rgx.eosPunctuations = /([\.\?\!])\s*(?=[a-z]|\s+\d)/gi;

// Matches special characters: `* + % # @ ^ = ~ | \` in a text.
rgx.splChars = /[\*\+\%\#\@\^\=\~\|\\]/ig;

// Matches common english elisions including n't.
// These are special ones as 's otherwise may be apostrophe!
rgx.elisionsSpl = /(\b)(it|let|that|who|what|here|there|when|where|why|how)(\'s)\b/gi;
// Single (1) character elisions.
rgx.elisions1 = /([a-z])(\'d|\'m)\b/gi;
// Two (2) character elisions.
rgx.elisions2 = /([a-z])(\'ll|\'ve|\'re|n\'t)\b/gi;
// Sperate not elision 'nt.
rgx.notElision = /([a-z])(n\'t)\b/gi;
// Specially handle cannot
rgx.cannot = /\b(can)(not)\b/gi;

// Matches space, tab, or new line characters in text.
rgx.spaces = /\s+/ig;
// Matches anything other than space, tab, or new line characters.
rgx.notSpace = /\S/g;
// Matches alpha and space characters in a text.
rgx.alphaSpace = /[a-z\s]/ig;
// Matches alphanumerals and space characters in a text.
rgx.alphaNumericSpace = /[a-z0-9\s]/ig;
// Matches non alpha characters in a text.
rgx.notAlpha = /[^a-z]/ig;
// Matches non alphanumerals in a text.
rgx.notAlphaNumeric = /[^a-z0-9]/ig;
// Matches one or more non-words characters.
rgx.nonWords = /\W+/ig;
// Matches complete negation token
rgx.negations = /^(never|none|not|no)$/i;

// Matches run of capital words in a text.
rgx.rocWords = /(?:\b[A-Z][A-Za-z]*\s*){2,}/g;

// Matches integer, decimal, JS floating point numbers in a text.
rgx.number = /[0-9]*\.[0-9]+e[\+\-]{1}[0-9]+|[0-9]*\.[0-9]+|[0-9]+/ig;

// Matches time in 12 hour am/pm format in a text.
rgx.timeIn12HrAMPM = /(?:[0-9]|0[0-9]|1[0-2])((:?:[0-5][0-9])){0,1}\s?(?:[aApP][mM])/ig;

// Matches HTML tags - in fact any thing enclosed in angular brackets including
// the brackets.
rgx.htmlTags = /(?:<[^>]*>)/g;
// Matches the HTML Esc Sequences
// Esc Seq of type `&lt;` or `&nbsp;`
rgx.htmlEscSeq1 = /(?:&[a-z]{2,6};)/gi;
// Esc Seq of type `&#32;`
rgx.htmlEscSeq2 = /(?:&#[0-9]{2,4};)/gi;

// Tests if a given string is possibly in the Indian mobile telephone number format.
rgx.mobileIndian = /^(0|\+91)?[789]\d{9}$/;
// Tests if a given string is in the valid email format.
rgx.email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Extracts any number and text from a <number><text> format text.
// Useful in extracting value and UoM from strings like `2.7 Kgs`.
rgx.separateNumAndText = /([0-9]*\.[0-9]+e[\+\-]{1}[0-9]+|[0-9]*\.[0-9]+|[0-9]+)[\s]*(.*)/i;

// Crude date parser for a string containg date in a valid format.
// > TODO: Need to improve this one!
rgx.date = /(\d+)/ig;

// Following 3 regexes are specially coded for `tokenize()` in prepare_text.
// Matches punctuations that are not a part of a number.
rgx.nonNumPunctuations = /[\.\,\-](?=\D)/gi;
rgx.otherPunctuations = /[\’\'\‘\’\`\“\”\"\[\]\(\)\{\}\…\!\;\?\/\:]/ig;
// > TODO: Add more currency symbols here.
rgx.currency = /[\$\£\¥\€]/ig;

//
module.exports = rgx;
