//     wink-nlp-utils
//     NLP Functions for amplifying negations, managing elisions,
//     creating ngrams, stems, phonetic codes to tokens and more.
//
//     Copyright (C) 2017-19  GRAYPE Systems Private Limited
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
