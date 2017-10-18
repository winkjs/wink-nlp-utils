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
var chai = require( 'chai' );
var mocha = require( 'mocha' );
var edgeGrams = require( '../src/string-edge-ngrams.js' );
var index = require( '../src/helper-return-indexer.js' );

var expect = chai.expect;
var describe = mocha.describe;
var it = mocha.it;

// ### Define common errors.
// These are common test data for `null`, `undefined`, and `numeric` inputs
// across all the functions included in the script.
// The exception cases specific to the function are part of the test script of the function.
var errors = [
  { whenInputIs: null, expectedOutputIs: /^Cannot read.*/ },
  { whenInputIs: undefined, expectedOutputIs: /^Cannot read.*/ },
  { whenInputIs: 1, expectedOutputIs: /is not a function$/ }
];


// ### Create bong test cases.

describe( 'string.edgeGrams()', function () {
  var tests = [
    { whenInputIs: [ '' ], expectedOutputIs: [] },
    { whenInputIs: [ 'decisively' ], expectedOutputIs: [ 'de', 'deci', 'decisi', 'decisive' ] },
    { whenInputIs: [ 'decisively', 8, 10, 1 ], expectedOutputIs: [ 'decisive', 'decisivel', 'decisively' ] }
  ];

  tests.forEach( function ( test ) {
    it( 'should return ' + JSON.stringify( test.expectedOutputIs ) + ' if the input is ' + JSON.stringify( test.whenInputIs ), function () {
      expect( edgeGrams( ...test.whenInputIs ) ).to.deep.equal( test.expectedOutputIs );
    } );
  } );

  it( 'indexer result should return an index of 2-grams of rachna & archna', function () {
    var bongIndex = index();
    edgeGrams( 'decision', 4, 8, 2, bongIndex.build, 'decision' );
    edgeGrams( 'decisive', 4, 8, 2, bongIndex.build, 'decisive' );
    var result = bongIndex.result();
    expect( result ).to.deep.equal( { deci: [ 'decision', 'decisive' ], decisi: [ 'decision', 'decisive' ], decision: [ 'decision' ], decisive: [ 'decisive' ] } );
  } );

  errors.slice( 0, 2 ).forEach( function ( error ) {
    it( 'should throw ' + error.expectedOutputIs + ' if the input is ' + JSON.stringify( error.whenInputIs ), function () {
      expect( edgeGrams.bind( null, error.whenInputIs ) ).to.throw( error.expectedOutputIs );
    } );
  } );
} );
