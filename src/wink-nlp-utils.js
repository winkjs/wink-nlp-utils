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
var porter2Stemmer = require( 'wink-porter2-stemmer' );

// ### Prepare Name Space

// Create prepare name space.
var prepare = Object.create( null );

/**
 * Helper
 * @namespace helper
 */
prepare.helper = Object.create( null );

// Words
prepare.helper.returnWordsFilter = require( './helper-return-words-filter.js' );
prepare.helper.words = prepare.helper.returnWordsFilter;
// Make better **alias** name for the `word()` function.

// Index
prepare.helper.index = require( './helper-return-indexer.js' );
// Make better **alias** name for the `index()` function.
prepare.helper.returnIndexer = prepare.helper.index;

// Return Quoted Text Extractor
prepare.helper.returnQuotedTextExtractor = require( './helper-return-quoted-text-extractor.js' );

/**
 * String
 * @namespace string
 */
prepare.string = Object.create( null );

// Lower Case
prepare.string.lowerCase = require( './string-lower-case.js' );
// Upper Case
prepare.string.upperCase = require( './string-upper-case.js' );
// Trim
prepare.string.trim = require( './string-trim.js' );
// Remove Extra Spaces
prepare.string.removeExtraSpaces = require( './string-remove-extra-spaces.js' );
// Retain Alpha-numerics
prepare.string.retainAlphaNums = require( './string-retain-alpha-nums.js' );
// Extract Person's Name
prepare.string.extractPersonsName = require( './string-extract-persons-name.js' );
// Extract Run of Capital Words
prepare.string.extractRunOfCapitalWords = require( './string-extract-run-of-capital-words.js' );
// Remove Punctuations
prepare.string.removePunctuations = require( './string-remove-punctuations.js' );
// Remove Special Chars
prepare.string.removeSplChars = require( './string-remove-spl-chars.js' );
// Remove HTML Tags
prepare.string.removeHTMLTags = require( './string-remove-html-tags.js' );
// Remove Elisions
prepare.string.removeElisions = require( './string-remove-elisions.js' );
// Split Elisions
prepare.string.splitElisions = require( './string-split-elisions.js' );
// Amplify Not Elision
prepare.string.amplifyNotElision = require( './string-amplify-not-elision' );
// Marker
prepare.string.marker = require( './string-marker.js' );
// SOC
prepare.string.soc = require( './string-soc.js' );
prepare.string.setOfChars = require( './string-soc.js' );
// NGrams
prepare.string.ngram = require( './string-ngram.js' );
// Edge NGrams
prepare.string.edgeNGrams = require( './string-edge-ngrams.js' );
// BONG
prepare.string.bong = require( './string-bong.js' );
prepare.string.bagOfNGrams = require( './string-bong.js' );
// SONG
prepare.string.song = require( './string-song.js' );
prepare.string.setOfNGrams = require( './string-song.js' );
// Sentences
prepare.string.sentences = require( './string-sentences.js' );
// Compose Corpus
prepare.string.composeCorpus = require( './string-compose-corpus.js' );
// Tokenize0
prepare.string.tokenize0 = require( './string-tokenize0.js' );
// Tokenize
prepare.string.tokenize = require( './string-tokenize.js' );
// #### Stem
prepare.string.stem = porter2Stemmer;
// Phonetize
prepare.string.phonetize = require( './string-phonetize.js' );
// Soundex
prepare.string.soundex = require( './string-soundex.js' );

/**
 * Tokens
 * @namespace tokens
 */
prepare.tokens = Object.create( null );

// Stem
prepare.tokens.stem = require( './tokens-stem.js' );
// Phonetize
prepare.tokens.phonetize = require( './tokens-phonetize.js' );
// Soundex
prepare.tokens.soundex = require( './tokens-soundex.js' );
// Remove Words
prepare.tokens.removeWords = require( './tokens-remove-words.js' );
// BOW
prepare.tokens.bow = require( './tokens-bow.js' );
prepare.tokens.bagOfWords = require( './tokens-bow.js' );
// SOW
prepare.tokens.sow = require( './tokens-sow.js' );
prepare.tokens.setOfWords = require( './tokens-sow.js' );
// Propagate Negations
prepare.tokens.propagateNegations = require( './tokens-propagate-negations.js' );
// Bigrams
prepare.tokens.bigrams = require( './tokens-bigrams.js' );
// Append Bigrams
prepare.tokens.appendBigrams = require( './tokens-append-bigrams.js' );

// Export prepare.
module.exports = prepare;
