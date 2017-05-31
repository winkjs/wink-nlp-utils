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
rgx.negations = /^(never|none|not|no)$/ig;

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
