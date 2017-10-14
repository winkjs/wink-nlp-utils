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
var porter2Stemmer = require( 'wink-porter2-stemmer' );

// ### Prepare Name Space

// Create prepare name space.
var prepare = Object.create( null );

// ### Prepare.Helper name space

// Create prepare.helper name space.
prepare.helper = Object.create( null );

// Words
prepare.helper.words = require( './helper-return-words-filter.js' );
// Make better **alias** name for the `word()` function.
prepare.helper.returnWordsFilter = prepare.helper.words;
// Index
prepare.helper.index = require( './helper-return-indexer.js' );
// Make better **alias** name for the `index()` function.
prepare.helper.returnIndexer = prepare.helper.index;

// Return Quoted Text Extractor
prepare.helper.returnQuotedTextExtractor = require( './helper-return-quoted-text-extractor.js' );

// ### Prepare.String Name Space

// Create prepare.string name space.
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
// NGrams
prepare.string.ngrams = require( './string-ngram.js' );
// BONG
prepare.string.bong = require( './string-bong.js' );
// SONG
prepare.string.song = require( './string-song.js' );
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

// ### Prepare.Tokens Name Space

// Create prepare.tokens name space.
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
// SOW
prepare.tokens.sow = require( './tokens-sow.js' );
// Propagate Negations
prepare.tokens.propagateNegations = require( './tokens-propagate-negations.js' );
// Bigrams
prepare.tokens.bigrams = require( './tokens-bigrams.js' );
// Append Bigrams
prepare.tokens.appendBigrams = require( './tokens-append-bigrams.js' );

// Export prepare.
module.exports = prepare;
