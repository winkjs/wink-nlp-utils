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
var chai = require( 'chai' );
var mocha = require( 'mocha' );
var prepare = require( '../src/wink-nlp-utils.js' );

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

// ### Convert to Lower Case test cases.

describe( 'string.lowerCase()', function () {
  var tests = [
    { whenInputIs: 'UPPERCASE', expectedOutputIs: 'uppercase' },
    { whenInputIs: 'Camelcase', expectedOutputIs: 'camelcase' },
    { whenInputIs: 'lowercase', expectedOutputIs: 'lowercase' },
    { whenInputIs: '12345.56',  expectedOutputIs: '12345.56' },
    { whenInputIs: '201A-41', expectedOutputIs: '201a-41' }
  ];

  tests.forEach( function ( test ) {
    it( 'should return ' + test.expectedOutputIs + ' if the input is ' + JSON.stringify( test.whenInputIs ), function () {
      expect( prepare.string.lowerCase( test.whenInputIs ) ).to.equal( test.expectedOutputIs );
    } );
  } );

  errors.forEach( function ( error ) {
    it( 'should throw ' + error.expectedOutputIs + ' if the input is ' + JSON.stringify( error.whenInputIs ), function () {
      expect( prepare.string.lowerCase.bind( null, error.whenInputIs ) ).to.throw( error.expectedOutputIs );
    } );
  } );
} );

// ### Convert to Upper Case test cases.

describe( 'string.upperCase()', function () {
  var tests = [
    { whenInputIs: 'lowercase', expectedOutputIs: 'LOWERCASE' },
    { whenInputIs: 'Camelcase', expectedOutputIs: 'CAMELCASE' },
    { whenInputIs: 'UPPER', expectedOutputIs: 'UPPER' },
    { whenInputIs: '12345.56',  expectedOutputIs: '12345.56' },
    { whenInputIs: '201a-41', expectedOutputIs: '201A-41' }
  ];

  tests.forEach( function ( test ) {
    it( 'should return ' + test.expectedOutputIs + ' if the input is ' + JSON.stringify( test.whenInputIs ), function () {
      expect( prepare.string.upperCase( test.whenInputIs ) ).to.equal( test.expectedOutputIs );
    } );
  } );

  errors.forEach( function ( error ) {
    it( 'should throw ' + error.expectedOutputIs + ' if the input is ' + JSON.stringify( error.whenInputIs ), function () {
      expect( prepare.string.upperCase.bind( null, error.whenInputIs ) ).to.throw( error.expectedOutputIs );
    } );
  } );
} );

// ### Trim leading & trailing spaces test cases.

describe( 'string.trim()', function () {
  var tests = [
    { whenInputIs: '   has leading & trailing spaces   ', expectedOutputIs: 'has leading & trailing spaces' },
    { whenInputIs: '     ', expectedOutputIs: '' },
    { whenInputIs: 'sentence has a      in it', expectedOutputIs: 'sentence has a      in it' }
  ];

  tests.forEach( function ( test ) {
    it( 'should return ' + test.expectedOutputIs + ' if the input is ' + JSON.stringify( test.whenInputIs ), function () {
      expect( prepare.string.trim( test.whenInputIs ) ).to.equal( test.expectedOutputIs );
    } );
  } );

  errors.forEach( function ( error ) {
    it( 'should throw ' + error.expectedOutputIs + ' if the input is ' + JSON.stringify( error.whenInputIs ), function () {
      expect( prepare.string.trim.bind( null, error.whenInputIs ) ).to.throw( error.expectedOutputIs );
    } );
  } );
} );

// ### Remove Extra White Spaces test cases.

describe( 'string.removeExtraSpaces()', function () {
  var tests = [
    { whenInputIs: '', expectedOutputIs: '' },
    { whenInputIs: '        ', expectedOutputIs: '' },
    { whenInputIs: 'A sample sentence.', expectedOutputIs: 'A sample sentence.' },
    { whenInputIs: 'A  sample  sentence.', expectedOutputIs: 'A sample sentence.' },
    { whenInputIs: 'A    sample    sentence.', expectedOutputIs: 'A sample sentence.' },
    { whenInputIs: ' A sample sentence. ', expectedOutputIs: 'A sample sentence.' },
    { whenInputIs: '   A  sample    sentence.   ', expectedOutputIs: 'A sample sentence.' }
  ];

  tests.forEach( function ( test ) {
    it( 'should return ' + test.expectedOutputIs + ' if the input is ' + JSON.stringify( test.whenInputIs ), function () {
      expect( prepare.string.removeExtraSpaces( test.whenInputIs ) ).to.equal( test.expectedOutputIs );
    } );
  } );

  errors.forEach( function ( error ) {
    it( 'should throw ' + error.expectedOutputIs + ' if the input is ' + JSON.stringify( error.whenInputIs ), function () {
      expect( prepare.string.removeExtraSpaces.bind( null, error.whenInputIs ) ).to.throw( error.expectedOutputIs );
    } );
  } );
} );

// ### Clean Text test cases.

describe( 'string.retainAlphaNums()', function () {
  var tests = [
    { whenInputIs: '', expectedOutputIs: '' },
    { whenInputIs: '        ', expectedOutputIs: '' },
    { whenInputIs: 'A sample sentence.', expectedOutputIs: 'a sample sentence' },
    { whenInputIs: 'This is a ( somewhat )  complex (1)!?', expectedOutputIs: 'this is a somewhat complex 1' },
    { whenInputIs: '!@#$%^&*()', expectedOutputIs: '' },
    { whenInputIs: '  A1 [sample  ]? sentence with 123456   . ', expectedOutputIs: 'a1 sample sentence with 123456' }
  ];

  tests.forEach( function ( test ) {
    it( 'should return ' + test.expectedOutputIs + ' if the input is ' + JSON.stringify( test.whenInputIs ), function () {
      expect( prepare.string.retainAlphaNums( test.whenInputIs ) ).to.equal( test.expectedOutputIs );
    } );
  } );

  errors.forEach( function ( error ) {
    it( 'should throw ' + error.expectedOutputIs + ' if the input is ' + JSON.stringify( error.whenInputIs ), function () {
      expect( prepare.string.retainAlphaNums.bind( null, error.whenInputIs ) ).to.throw( error.expectedOutputIs );
    } );
  } );
} );

// ### Clean Name test cases.

// Function is tested for persons name with professional qualifications
// pre-fixed, suffixed or embedded in the name itself.
describe( 'string.extractPersonsName()', function () {
  var tests = [
    { whenInputIs: '', expectedOutputIs: '' },
    { whenInputIs: '        ', expectedOutputIs: '' },
    { whenInputIs: 'Dr. Ashwini Kumar Sharma B Tech., M. Tech., PhD - Electrical', expectedOutputIs: 'Ashwini Kumar Sharma' },
    { whenInputIs: 'Dr. Ashwini Kumar Sharma', expectedOutputIs: 'Ashwini Kumar Sharma' },
    { whenInputIs: 'Dr. (Mrs.) B. Techpadma Rao M B B S (Gyne)', expectedOutputIs: 'B Techpadma Rao' },
    { whenInputIs: '  B. Techpadma Mtechrao L L B', expectedOutputIs: 'B Techpadma Mtechrao' },
    { whenInputIs: '  B. Tech Ramarao B. Tech., M. Tech.', expectedOutputIs: '' }
  ];

  tests.forEach( function ( test ) {
    it( 'should return ' + test.expectedOutputIs + ' if the input is ' + JSON.stringify( test.whenInputIs ), function () {
      expect( prepare.string.extractPersonsName( test.whenInputIs ) ).to.equal( test.expectedOutputIs );
    } );
  } );

  errors.forEach( function ( error ) {
    it( 'should throw ' + error.expectedOutputIs + ' if the input is ' + JSON.stringify( error.whenInputIs ), function () {
      expect( prepare.string.extractPersonsName.bind( null, error.whenInputIs ) ).to.throw( error.expectedOutputIs );
    } );
  } );
} );

// ### Get Run of Capital Words test cases.

describe( 'string.extractRunOfCapitalWords()', function () {
  var tests = [
    { whenInputIs: '', expectedOutputIs: null },
    { whenInputIs: '        ', expectedOutputIs: null },
    { whenInputIs: 'My both friends Ashwani Sharma & Kailash Kher are a nice persons', expectedOutputIs: [ 'Ashwani Sharma', 'Kailash Kher' ] },
    { whenInputIs: 'My name is Ram Asrey.', expectedOutputIs: [ 'Ram Asrey' ] },
    { whenInputIs: 'My NAME Is Ram Asrey.', expectedOutputIs: [ 'My NAME Is Ram Asrey' ] },
    { whenInputIs: 'My name is ram asrey.', expectedOutputIs: null },
    { whenInputIs: 'A R Rahman is a famous Musician', expectedOutputIs: [ 'A R Rahman' ] },
    { whenInputIs: 'A. R. Rahman is a famous Musician', expectedOutputIs: null },
    { whenInputIs: 'Apt #202, IInd Floor, Orange County, CA', expectedOutputIs: [ 'IInd Floor', 'Orange County' ] },
    { whenInputIs: 'Baker Street B221, 10 Downing Street', expectedOutputIs: [ 'Baker Street B', 'Downing Street' ] },
    { whenInputIs: 'B221 Baker Street, 10 Downing Street', expectedOutputIs: [ 'Baker Street', 'Downing Street' ] }
  ];

  tests.forEach( function ( test ) {
    it( 'should return ' + test.expectedOutputIs + ' if the input is ' + JSON.stringify( test.whenInputIs ), function () {
      expect( prepare.string.extractRunOfCapitalWords( test.whenInputIs ) ).to.deep.equal( test.expectedOutputIs );
    } );
  } );

  errors.forEach( function ( error ) {
    it( 'should throw ' + error.expectedOutputIs + ' if the input is ' + JSON.stringify( error.whenInputIs ), function () {
      expect( prepare.string.extractRunOfCapitalWords.bind( null, error.whenInputIs ) ).to.throw( error.expectedOutputIs );
    } );
  } );
} );

// ### Remove Punctuation test cases.

describe( 'string.removePunctuations()', function () {
  var tests = [
    { whenInputIs: '', expectedOutputIs: '' },
    { whenInputIs: 'My sentence has all the punctuations like "\'\',;!?:"!... - () [] {} I don’t like it.', expectedOutputIs: 'My sentence has all the punctuations like                          I don t like it ' },
    { whenInputIs: '1234.50', expectedOutputIs: '1234 50' },
    { whenInputIs: '-1234', expectedOutputIs: ' 1234' },
    { whenInputIs: '(1234)', expectedOutputIs: ' 1234 ' },
    { whenInputIs: '10%', expectedOutputIs: '10%' },
    { whenInputIs: '(a^b) x (c^d)', expectedOutputIs: ' a^b  x  c^d ' },
    { whenInputIs: 'A sentence without any punctuations', expectedOutputIs: 'A sentence without any punctuations' },
    { whenInputIs: 'I have an appointment at 10,with Dr. Zakir at his residence: 12/190 - Willows\' Creek.', expectedOutputIs: 'I have an appointment at 10 with Dr  Zakir at his residence  12 190   Willows  Creek ' },
    { whenInputIs: 'Read s@me $pecial characters#-grammar ain\’t silly, it gives {structure} to your expression(s)', expectedOutputIs: 'Read s@me $pecial characters# grammar ain t silly  it gives  structure  to your expression s ' }
  ];

  tests.forEach( function ( test ) {
    it( 'should return ' + test.expectedOutputIs + ' if the input is ' + JSON.stringify( test.whenInputIs ), function () {
      expect( prepare.string.removePunctuations( test.whenInputIs ) ).to.equal( test.expectedOutputIs );
    } );
  } );

  errors.forEach( function ( error ) {
    it( 'should throw ' + error.expectedOutputIs + ' if the input is ' + JSON.stringify( error.whenInputIs ), function () {
      expect( prepare.string.removePunctuations.bind( null, error.whenInputIs ) ).to.throw( error.expectedOutputIs );
    } );
  } );
} );

// ### Remove special characters test cases.

describe( 'string.removeSplChars()', function () {
  var tests = [
    { whenInputIs: '', expectedOutputIs: '' },
    { whenInputIs: 'My sentence has all the special characters like~@#%^*+=.', expectedOutputIs: 'My sentence has all the special characters like        .' },
    { whenInputIs: 'hello@abc.com', expectedOutputIs: 'hello abc.com' },
    { whenInputIs: '@peter is my twitter handle', expectedOutputIs: ' peter is my twitter handle' },
    { whenInputIs: '#1. This is point number one.', expectedOutputIs: ' 1. This is point number one.' },
    { whenInputIs: 'I am using a ^ sign!', expectedOutputIs: 'I am using a   sign!' },
    { whenInputIs: 'There is 100% guarantee if you buy goods by December.', expectedOutputIs: 'There is 100  guarantee if you buy goods by December.' },
    { whenInputIs: 'Hello *y Nights', expectedOutputIs: 'Hello  y Nights' },
    { whenInputIs: 'Lemon + ginger + mint + water = infused water', expectedOutputIs: 'Lemon   ginger   mint   water   infused water' },
    { whenInputIs: 'Why is tilde~ used ?', expectedOutputIs: 'Why is tilde  used ?' }
  ];

  tests.forEach( function ( test ) {
    it( 'should return ' + test.expectedOutputIs + ' if the input is ' + JSON.stringify( test.whenInputIs ), function () {
      expect( prepare.string.removeSplChars( test.whenInputIs ) ).to.equal( test.expectedOutputIs );
    } );
  } );

  errors.forEach( function ( error ) {
    it( 'should throw ' + error.expectedOutputIs + ' if the input is ' + JSON.stringify( error.whenInputIs ), function () {
      expect( prepare.string.removeSplChars.bind( null, error.whenInputIs ) ).to.throw( error.expectedOutputIs );
    } );
  } );
} );

// ### Remove ellision test cases.

// All elisions are not handled by this function. Only the basic ones are
// removed
// Apostrophes are not handled by ellision functions

describe( 'string.removeElisions()', function () {
  var tests = [
    { whenInputIs: '', expectedOutputIs: '' },
    { whenInputIs: 'What dire offence from am\'rous causes springs', expectedOutputIs: 'What dire offence from am\'rous causes springs' },
    { whenInputIs: 'Is, to dispute well, logic\'s chiefest end?', expectedOutputIs: 'Is, to dispute well, logic\'s chiefest end?' },
    { whenInputIs: 'Isn\'t it?', expectedOutputIs: 'Is it?' },
    { whenInputIs: 'Did the lady\'s purse get stolen?', expectedOutputIs: 'Did the lady\'s purse get stolen?' },
    { whenInputIs: 'Sev\'n comes before eight.', expectedOutputIs: 'Sev\'n comes before eight.' },
    { whenInputIs: '\'Twas enough to make a man stare.', expectedOutputIs: '\'Twas enough to make a man stare.' },
    { whenInputIs: 'I\'ll not start early', expectedOutputIs: 'I not start early' }
  ];

  tests.forEach( function ( test ) {
    it( 'should return ' + test.expectedOutputIs + ' if the input is ' + JSON.stringify( test.whenInputIs ), function () {
      expect( prepare.string.removeElisions( test.whenInputIs ) ).to.equal( test.expectedOutputIs );
    } );
  } );

  errors.forEach( function ( error ) {
    it( 'should throw ' + error.expectedOutputIs + ' if the input is ' + JSON.stringify( error.whenInputIs ), function () {
      expect( prepare.string.removeElisions.bind( null, error.whenInputIs ) ).to.throw( error.expectedOutputIs );
    } );
  } );
} );

// ### Split ellision test cases.

describe( 'string.splitElisions()', function () {
  var tests = [
    { whenInputIs: '', expectedOutputIs: '' },
    { whenInputIs: 'Whatever we ain\'t got, that\'s what you want.', expectedOutputIs: 'Whatever we ai n\'t got, that \'s what you want.' },
    { whenInputIs: 'Oh, you can\'t help that," said the Cat: "we\'re all mad here. I\'m mad. You\'re mad.', expectedOutputIs: 'Oh, you ca n\'t help that," said the Cat: "we \'re all mad here. I \'m mad. You \'re mad.' },
    { whenInputIs: 'Isn\'t', expectedOutputIs: 'Is n\'t' },
  ];

  tests.forEach( function ( test ) {
    it( 'should return ' + test.expectedOutputIs + ' if the input is ' + JSON.stringify( test.whenInputIs ), function () {
      expect( prepare.string.splitElisions( test.whenInputIs ) ).to.equal( test.expectedOutputIs );
    } );
  } );

  errors.forEach( function ( error ) {
    it( 'should throw ' + error.expectedOutputIs + ' if the input is ' + JSON.stringify( error.whenInputIs ), function () {
      expect( prepare.string.splitElisions.bind( null, error.whenInputIs ) ).to.throw( error.expectedOutputIs );
    } );
  } );
} );

// ### Amplify Not ellision test cases.

describe( 'string.amplifyNotElision()', function () {
  var tests = [
    { whenInputIs: '', expectedOutputIs: '' },
    { whenInputIs: 'Whatever we ain\'t got, that\'s what you want.', expectedOutputIs: 'Whatever we ai not got, that\'s what you want.' },
    { whenInputIs: 'Oh, you can\'t help that," said the Cat: "we\’re all mad here. I\’m mad. You\’re mad.', expectedOutputIs: 'Oh, you ca not help that," said the Cat: "we\’re all mad here. I\’m mad. You\’re mad.' },
    { whenInputIs: 'Isn\'t', expectedOutputIs: 'Is not' },
    { whenInputIs: 'Can\'t sleep', expectedOutputIs: 'Ca not sleep' },
    { whenInputIs: 'haven\'t', expectedOutputIs: 'have not' },
    { whenInputIs: 'doesn\'t, aren\'t, mustn\'t', expectedOutputIs: 'does not, are not, must not' }
  ];

  tests.forEach( function ( test ) {
    it( 'should return ' + test.expectedOutputIs + ' if the input is ' + JSON.stringify( test.whenInputIs ), function () {
      expect( prepare.string.amplifyNotElision( test.whenInputIs ) ).to.equal( test.expectedOutputIs );
    } );
  } );

  errors.forEach( function ( error ) {
    it( 'should throw ' + error.expectedOutputIs + ' if the input is ' + JSON.stringify( error.whenInputIs ), function () {
      expect( prepare.string.amplifyNotElision.bind( null, error.whenInputIs ) ).to.throw( error.expectedOutputIs );
    } );
  } );
} );

// ### Generate marker test cases.

describe( 'string.marker()', function () {
  var tests = [
    { whenInputIs: '', expectedOutputIs: '' },
    { whenInputIs: '        ', expectedOutputIs: ' ' },
    { whenInputIs: 'rachna', expectedOutputIs: 'achnr' },
    { whenInputIs: 'archna', expectedOutputIs: 'achnr' },
    { whenInputIs: 'aaaaaaaaa', expectedOutputIs: 'a' },
    { whenInputIs: 'the quick brown fox jumps over the lazy dog', expectedOutputIs: ' abcdefghijklmnopqrstuvwxyz' },
  ];

  tests.forEach( function ( test ) {
    it( 'should return ' + test.expectedOutputIs + ' if the input is ' + JSON.stringify( test.whenInputIs ), function () {
      expect( prepare.string.marker( test.whenInputIs ) ).to.deep.equal( test.expectedOutputIs );
    } );
  } );

  errors.slice( 0, 2 ).forEach( function ( error ) {
    it( 'should throw ' + error.expectedOutputIs + ' if the input is ' + JSON.stringify( error.whenInputIs ), function () {
      expect( prepare.string.marker.bind( null, error.whenInputIs ) ).to.throw( error.expectedOutputIs );
    } );
  } );
} );

// ### SOC test cases.

describe( 'string.soc()', function () {
  it( 'should return set of a, p, l, e', function () {
    var myset = prepare.string.soc( 'apple' );
    expect( myset.has( 'a' ) ).to.deep.equal( true );
    expect( myset.has( 'p' ) ).to.deep.equal( true );
    expect( myset.has( 'l' ) ).to.deep.equal( true );
    expect( myset.has( 'e' ) ).to.deep.equal( true );
    expect( myset.size ).to.deep.equal( 4 );
    expect( myset.has( 'm' ) ).to.deep.equal( false );
  } );

  it( 'indexer result should return an index of a and b', function () {
    var socIndex = prepare.helper.index();
    prepare.string.soc( 'apple', socIndex.build, 0 );
    prepare.string.soc( 'banana', socIndex.build, 1 );
    prepare.string.soc( 'blackberry', socIndex.build, 2 );
    prepare.string.soc( 'apricot', socIndex.build, 3 );
    prepare.string.soc( 'avocado', socIndex.build, 4 );
    prepare.string.soc( 'blueberry', socIndex.build, 5 );
    var result = socIndex.result();
    expect( result ).to.deep.equal( { a: [ 0, 3, 4 ], b: [ 1, 2, 5 ] } );
  } );
} );

// ### Create ngrams test cases.

describe( 'string.ngrams()', function () {
  var tests = [
    { whenInputIs: [ '' ], expectedOutputIs: [] },
    { whenInputIs: [ 'some string', -1 ], expectedOutputIs: [] },
    { whenInputIs: [ '', 2 ], expectedOutputIs: [] },
    { whenInputIs: [ '        ', 2 ], expectedOutputIs: [ '  ', '  ', '  ', '  ', '  ', '  ', '  ' ] },
    { whenInputIs: [ 'archna', 2 ], expectedOutputIs: [ 'ar', 'rc', 'ch', 'hn', 'na' ] },
    { whenInputIs: [ 'rachna', 2 ], expectedOutputIs: [ 'ra', 'ac', 'ch', 'hn', 'na' ] },
    { whenInputIs: [ 'rachna', 6 ], expectedOutputIs: [ 'rachna' ] },
    { whenInputIs: [ 'rachna', 0 ], expectedOutputIs: [ 'ra', 'ac', 'ch', 'hn', 'na' ] },
    { whenInputIs: [ 'rachna' ], expectedOutputIs: [ 'ra', 'ac', 'ch', 'hn', 'na' ] },
    { whenInputIs: [ 'rachna', 7 ], expectedOutputIs: [] },
    { whenInputIs: [ 'mamma', 2 ], expectedOutputIs: [ 'ma', 'am', 'mm', 'ma' ] },
    { whenInputIs: [ 'rain rain', 3 ], expectedOutputIs: [ 'rai', 'ain', 'in ', 'n r', ' ra', 'rai', 'ain' ] },
    { whenInputIs: [ 'rain rain', -3 ], expectedOutputIs: [] },
    { whenInputIs: [ 'fastidious', 11 ], expectedOutputIs: [] }
  ];

  tests.forEach( function ( test ) {
    it( 'should return ' + JSON.stringify( test.expectedOutputIs ) + ' if the input is ' + JSON.stringify( test.whenInputIs ), function () {
      expect( prepare.string.ngrams.apply( null, test.whenInputIs ) ).to.deep.equal( test.expectedOutputIs );
    } );
  } );

  errors.slice( 0, 2 ).forEach( function ( error ) {
    it( 'should throw ' + error.expectedOutputIs + ' if the input is ' + JSON.stringify( error.whenInputIs ), function () {
      expect( prepare.string.ngrams.bind( null, error.whenInputIs ) ).to.throw( error.expectedOutputIs );
    } );
  } );
} );


// ### Create bong test cases.

describe( 'string.bong()', function () {
  var tests = [
    { whenInputIs: [ '' ], expectedOutputIs: Object.create( null ) },
    { whenInputIs: [ 'some string', -1 ], expectedOutputIs: Object.create( null ) },
    { whenInputIs: [ '', 2 ], expectedOutputIs: Object.create( null ) },
    { whenInputIs: [ '        ', 2 ], expectedOutputIs: { '  ': 7 } },
    { whenInputIs: [ 'archna', 2 ], expectedOutputIs: { ar: 1, rc: 1, ch: 1, hn: 1, na: 1 } },
    { whenInputIs: [ 'rachna', 2 ], expectedOutputIs: { ra: 1, ac: 1, ch: 1, hn: 1, na: 1 } },
    { whenInputIs: [ 'rachna', 6 ], expectedOutputIs: { rachna: 1 } },
    { whenInputIs: [ 'rachna', 0 ], expectedOutputIs: { ra: 1, ac: 1, ch: 1, hn: 1, na: 1 } },
    { whenInputIs: [ 'rachna' ], expectedOutputIs: { ra: 1, ac: 1, ch: 1, hn: 1, na: 1 } },
    { whenInputIs: [ 'rachna', 7 ], expectedOutputIs: Object.create( null ) },
    // See indexer part: `ma` for each string is considered only once.
    { whenInputIs: [ 'mamma', 2 ], expectedOutputIs: { ma: 2, am: 1, mm: 1 } },
    { whenInputIs: [ 'mama', 2 ], expectedOutputIs: { ma: 2, am: 1 } },
    { whenInputIs: [ 'rain rain', 3 ], expectedOutputIs: { ' ra': 1, ain: 2, 'in ': 1, 'n r': 1, rai: 2 } },
    { whenInputIs: [ 'rain rain', -3 ], expectedOutputIs: { } },
    { whenInputIs: [ 'fastidious', 11 ], expectedOutputIs: { } }
  ];

  tests.forEach( function ( test ) {
    it( 'should return ' + JSON.stringify( test.expectedOutputIs ) + ' if the input is ' + JSON.stringify( test.whenInputIs ), function () {
      expect( prepare.string.bong.apply( null, test.whenInputIs ) ).to.deep.equal( test.expectedOutputIs );
    } );
  } );

  it( 'indexer result should return an index of 2-grams of rachna & archna', function () {
    var bongIndex = prepare.helper.index();
    prepare.string.bong( 'mamma', 2, bongIndex.build, 0 );
    prepare.string.bong( 'mama', 2, bongIndex.build, 1 );
    var result = bongIndex.result();
    expect( result ).to.deep.equal( { ma: [ 0, 1 ], am: [ 0, 1 ], mm: [ 0 ] } );
  } );

  errors.slice( 0, 2 ).forEach( function ( error ) {
    it( 'should throw ' + error.expectedOutputIs + ' if the input is ' + JSON.stringify( error.whenInputIs ), function () {
      expect( prepare.string.bong.bind( null, error.whenInputIs ) ).to.throw( error.expectedOutputIs );
    } );
  } );
} );

// ### SONG test cases.

describe( 'string.song()', function () {
  it( 'should return set of 3-grams of apple', function () {
    var myset = prepare.string.song( 'apple', 3 );
    expect( myset.has( 'app' ) ).to.deep.equal( true );
    expect( myset.has( 'ppl' ) ).to.deep.equal( true );
    expect( myset.has( 'ple' ) ).to.deep.equal( true );
    expect( myset.size ).to.deep.equal( 3 );
    expect( myset.has( 'ap' ) ).to.deep.equal( false );
  } );

  it( 'indexer result should return an index of a and b', function () {
    var songIndex = prepare.helper.index();
    prepare.string.song( 'mamma', 2, songIndex.build, 0 );
    prepare.string.song( 'mama', 0, songIndex.build, 1 );
    var result = songIndex.result();
    expect( result ).to.deep.equal( { ma: [ 0, 1 ], am: [ 0, 1 ], mm: [ 0 ] } );
  } );
} );

// ### Create sentences test cases.

describe( 'string.sentences()', function () {
  var tests = [
    { whenInputIs: [ ' ' ], expectedOutputIs: [ '' ] },
    { whenInputIs: [ 'rain rain go away, come again another day. Little Adrianna wants to go out and play.' ], expectedOutputIs: [ 'rain rain go away, come again another day.', 'Little Adrianna wants to go out and play.' ] },
    { whenInputIs: [ 'what ended in the year 1919 ~?  1918 year ended when the year 1919 began:-)! Isn\'t it?', '^' ], expectedOutputIs: [ 'what ended in the year 1919 ~?', '1918 year ended when the year 1919 began:-)!', 'Isn\'t it?' ] },
    { whenInputIs: [ 'The goods from Mexico in 2015 were worth about $60 billion more than the goods exported to Mexico! So federal revenue in the short term would increase by roughly $12 billion.', '|' ], expectedOutputIs: [ 'The goods from Mexico in 2015 were worth about $60 billion more than the goods exported to Mexico!', 'So federal revenue in the short term would increase by roughly $12 billion.' ] },
  ];

  tests.forEach( function ( test ) {
    it( 'should return ' + JSON.stringify( test.expectedOutputIs ) + ' if the input is ' + JSON.stringify( test.whenInputIs ), function () {
      expect( prepare.string.sentences.apply( null, test.whenInputIs ) ).to.deep.equal( test.expectedOutputIs );
    } );
  } );

  errors.slice( 0, 2 ).forEach( function ( error ) {
    it( 'should throw ' + error.expectedOutputIs + ' if the input is ' + JSON.stringify( error.whenInputIs ), function () {
      expect( prepare.string.sentences.bind( null, error.whenInputIs ) ).to.throw( error.expectedOutputIs );
    } );
  } );
} );


// ### Create tokenize0 test cases.

// tests  basic tokenze functionality with alpha, numbers and underscores
// all other characters are stripped from the output.

describe( 'string.tokenize0()', function () {
  var tests = [
    { whenInputIs: [ ' ' ], expectedOutputIs: [] },
    { whenInputIs: [ 'rain rain go away, come again another day.' ], expectedOutputIs: [ 'rain', 'rain', 'go', 'away', 'come', 'again', 'another', 'day' ] },
    { whenInputIs: [ 'what\'s ended in the year 1919 ~?  1918 year ended when the year 1919 began:-)' ], expectedOutputIs: [ 'what', 'ended', 'in', 'the', 'year', '1919', '1918', 'year', 'ended', 'when', 'the', 'year', '1919', 'began' ] },
    { whenInputIs: [ 'Isn\'t it? ' ], expectedOutputIs: [ 'Is', 'not', 'it' ] },
    { whenInputIs: [ 'John\'s work ISN\'t done! ' ], expectedOutputIs: [ 'John', 's', 'work', 'IS', 'not', 'done' ] },
    { whenInputIs: [ 'This cannot be handled!' ], expectedOutputIs: [ 'This', 'can', 'not', 'be', 'handled' ] },
    { whenInputIs: [ 'This is an _ character in the sentence.' ], expectedOutputIs: [ 'This', 'is', 'an', '_', 'character', 'in', 'the', 'sentence' ] },
    { whenInputIs: [ '.Started with a non-word character' ], expectedOutputIs: [ 'Started', 'with', 'a', 'non', 'word', 'character' ] }
  ];

  tests.forEach( function ( test ) {
    it( 'should return ' + JSON.stringify( test.expectedOutputIs ) + ' if the input is ' + JSON.stringify( test.whenInputIs ), function () {
      expect( prepare.string.tokenize0.apply( null, test.whenInputIs ) ).to.deep.equal( test.expectedOutputIs );
    } );
  } );

  errors.slice( 0, 2 ).forEach( function ( error ) {
    it( 'should throw ' + error.expectedOutputIs + ' if the input is ' + JSON.stringify( error.whenInputIs ), function () {
      expect( prepare.string.tokenize0.bind( null, error.whenInputIs ) ).to.throw( error.expectedOutputIs );
    } );
  } );
} );


// ### Create tokenize test cases.

describe( 'string.tokenize()', function () {
  var tests = [
    { whenInputIs: [ ' ' ], expectedOutputIs: [ '' ] },
    { whenInputIs: [ 'rain rain go away, come again another day' ], expectedOutputIs: [ 'rain', 'rain', 'go', 'away', ',', 'come', 'again', 'another', 'day' ] },
    { whenInputIs: [ 'rain rain_ go away, come again another day' ], expectedOutputIs: [ 'rain', 'rain_', 'go', 'away', ',', 'come', 'again', 'another', 'day' ] },
    { whenInputIs: [ 'what\'s ended in the year 1919 ~?  The $1 was equal to 1.2 rupees.' ], expectedOutputIs: [ 'what', '\'s', 'ended', 'in', 'the', 'year', '1919', '~', '?', 'The', '$', '1', 'was', 'equal', 'to', '1.2', 'rupees', '.' ] },
    { whenInputIs: [ 'what ended in the 1919 year~?  The £1 was equal to 1.2 rupees.' ], expectedOutputIs: [ 'what', 'ended', 'in', 'the', '1919', 'year~', '?', 'The', '£', '1', 'was', 'equal', 'to', '1.2', 'rupees', '.' ] },
    { whenInputIs: [ 'what\'ll \'end in the year 1919\'?  The ¥1 was equal to 1.2 rupees.' ], expectedOutputIs: [ 'what', '\'ll', '\'', 'end', 'in', 'the', 'year', '1919', '\'', '?', 'The', '¥', '1', 'was', 'equal', 'to', '1.2', 'rupees', '.' ] },
    { whenInputIs: [ 'what ended in the year\'s last month ?  The €1 cannot be equal to 1.2 rupees.' ], expectedOutputIs: [ 'what', 'ended', 'in', 'the', 'year\'s', 'last', 'month', '?', 'The', '€', '1', 'can', 'not', 'be', 'equal', 'to', '1.2', 'rupees', '.' ] },
    { whenInputIs: [ 'Isn\'t... it? ' ], expectedOutputIs: [ 'Is', 'not', '…', 'it', '?' ] },
  ];

  tests.forEach( function ( test ) {
    it( 'should return ' + JSON.stringify( test.expectedOutputIs ) + ' if the input is ' + JSON.stringify( test.whenInputIs ), function () {
      expect( prepare.string.tokenize.apply( null, test.whenInputIs ) ).to.deep.equal( test.expectedOutputIs );
    } );
  } );

  errors.slice( 0, 2 ).forEach( function ( error ) {
    it( 'should throw ' + error.expectedOutputIs + ' if the input is ' + JSON.stringify( error.whenInputIs ), function () {
      expect( prepare.string.tokenize.bind( null, error.whenInputIs ) ).to.throw( error.expectedOutputIs );
    } );
  } );
} );

// ### Create phonetize test cases.

describe( 'string.phonetize()', function () {
  var tests = [
    // { whenInputIs: [ '' ], expectedOutputIs: [ '' ] },
    { whenInputIs: 'day', expectedOutputIs: 'd' },
    { whenInputIs: 'rain rain go away, come again another day', expectedOutputIs: 'rn rn g w, km gn n0r d' },
    { whenInputIs: 'luteinizing', expectedOutputIs: 'ltnsng' },
    { whenInputIs: 'science', expectedOutputIs: 'sns' },
    { whenInputIs: 'bomb', expectedOutputIs: 'bm' },
    { whenInputIs: 'sanjaya', expectedOutputIs: 'snjy' },
    { whenInputIs: 'sanjay', expectedOutputIs: 'snj' },
    { whenInputIs: 'sanjai', expectedOutputIs: 'snj' },
    { whenInputIs: 'clock', expectedOutputIs: 'klk' },
    { whenInputIs: 'chapter', expectedOutputIs: 'chptr' },
    { whenInputIs: 'knot', expectedOutputIs: 'nt' },
    { whenInputIs: 'computer', expectedOutputIs: 'kmptr' },
    { whenInputIs: 'clever', expectedOutputIs: 'klvr' },
    { whenInputIs: 'perspective', expectedOutputIs: 'prspktv' },
    { whenInputIs: 'intermediate', expectedOutputIs: 'intrmdt' },
    { whenInputIs: 'quirky', expectedOutputIs: 'krk' },
    { whenInputIs: 'rehabilitate', expectedOutputIs: 'rhbltt' },
    { whenInputIs: 'ostentatious', expectedOutputIs: 'ostntxs' },
    { whenInputIs: 'phenomenon', expectedOutputIs: 'fnmnn' },
    { whenInputIs: 'peripheri', expectedOutputIs: 'prfr' },
    { whenInputIs: 'prefer', expectedOutputIs: 'prfr' },
    { whenInputIs: 'dodge', expectedOutputIs: 'dj' },
    { whenInputIs: 'switch', expectedOutputIs: 'swch' },
    { whenInputIs: 'that', expectedOutputIs: '0t' },
    { whenInputIs: 'alopecia', expectedOutputIs: 'alpx' },
    { whenInputIs: 'perforated', expectedOutputIs: 'prfrtd' },
    { whenInputIs: 'flypast', expectedOutputIs: 'flpst' },
    { whenInputIs: 'motion', expectedOutputIs: 'mxn' },
    { whenInputIs: 'phonetize', expectedOutputIs: 'fnts' },
    { whenInputIs: 'wrong', expectedOutputIs: 'rng' },
    { whenInputIs: 'wait', expectedOutputIs: 'wt' },
    { whenInputIs: 'vowel', expectedOutputIs: 'vwl' },
    { whenInputIs: 'where', expectedOutputIs: 'whr' },
    { whenInputIs: 'were', expectedOutputIs: 'wr' },
    { whenInputIs: 'tough', expectedOutputIs: 'tf' },
    { whenInputIs: 'schematic', expectedOutputIs: 'skmtc' },
    { whenInputIs: 'lodge', expectedOutputIs: 'lj' },
    { whenInputIs: 'fudgy', expectedOutputIs: 'fj' },
    { whenInputIs: 'nudging', expectedOutputIs: 'njng' },
    { whenInputIs: 'wedgier', expectedOutputIs: 'wjr' },
    { whenInputIs: 'eat', expectedOutputIs: 'et' },
    { whenInputIs: 'erase', expectedOutputIs: 'ers' },
    { whenInputIs: 'ears', expectedOutputIs: 'ers' },
    { whenInputIs: 'eyes', expectedOutputIs: 'eys' },
    { whenInputIs: 'happy', expectedOutputIs: 'hp' },
    { whenInputIs: 'hippy', expectedOutputIs: 'hp' },
    { whenInputIs: 'hippo', expectedOutputIs: 'hp' },
    { whenInputIs: 'maximise', expectedOutputIs: 'mksms' },
    { whenInputIs: 'reflex', expectedOutputIs: 'rflks' },
    { whenInputIs: 'weave', expectedOutputIs: 'wv' },
    { whenInputIs: 'wrench', expectedOutputIs: 'rnch' },
    { whenInputIs: 'vowel', expectedOutputIs: 'vwl' },
    { whenInputIs: 'how', expectedOutputIs: 'hw' },
    { whenInputIs: 'geranium', expectedOutputIs: 'grnm' },
    { whenInputIs: 'girrafe', expectedOutputIs: 'grf' },
    { whenInputIs: 'bag', expectedOutputIs: 'bg' },
    { whenInputIs: 'badge', expectedOutputIs: 'bj' },
    { whenInputIs: 'humming', expectedOutputIs: 'hmng' },
    { whenInputIs: 'signed', expectedOutputIs: 'sgnd' },
    { whenInputIs: 'singer', expectedOutputIs: 'sngr' },
    { whenInputIs: 'signal', expectedOutputIs: 'sgnl' },
    { whenInputIs: 'sleigh', expectedOutputIs: 'slgh' },
    { whenInputIs: 'hedging', expectedOutputIs: 'hjng' },
    { whenInputIs: 'groggy', expectedOutputIs: 'grg' },
    { whenInputIs: 'hybrid', expectedOutputIs: 'hbrd' },
    { whenInputIs: 'behalf', expectedOutputIs: 'bhlf' },
    { whenInputIs: 'shy', expectedOutputIs: 'x' },
    { whenInputIs: 'island', expectedOutputIs: 'islnd' },
    { whenInputIs: 'intermediate', expectedOutputIs: 'intrmdt' },
    { whenInputIs: 'relay', expectedOutputIs: 'rl' },
    { whenInputIs: 'ferrous', expectedOutputIs: 'frs' },
    { whenInputIs: 'inertia', expectedOutputIs: 'inrx' },
    { whenInputIs: 'scion', expectedOutputIs: 'xn' },
    { whenInputIs: 'school', expectedOutputIs: 'skl' },
    { whenInputIs: 'away', expectedOutputIs: 'aw' },
  ];

  tests.forEach( function ( test ) {
    it( 'should return ' + JSON.stringify( test.expectedOutputIs ) + ' if the input is ' + JSON.stringify( test.whenInputIs ), function () {
      expect( prepare.string.phonetize( test.whenInputIs ) ).to.deep.equal( test.expectedOutputIs );
    } );
  } );

  errors.slice( 0, 2 ).forEach( function ( error ) {
    it( 'should throw ' + error.expectedOutputIs + ' if the input is ' + JSON.stringify( error.whenInputIs ), function () {
      expect( prepare.string.phonetize.bind( null, error.whenInputIs ) ).to.throw( error.expectedOutputIs );
    } );
  } );
} );

// ### Create tokens stem test cases.

describe( 'prepare.tokens.stem()', function () {
  var tests = [
    { whenInputIs: [ 'composed', 'esthetician', 'ergonomics', 'epidemic', 'bicentennial' ], expectedOutputIs: [ 'compos', 'esthetician', 'ergonom', 'epidem', 'bicentenni' ] },
    { whenInputIs: [ 'difference', 'digression', 'hemorrhage', 'hepatitis', 'herbicide', 'hexagon', 'homogeneous', 'hyperactive', 'irredeemable', 'geriatrics'  ], expectedOutputIs: [ 'differ', 'digress', 'hemorrhag', 'hepat', 'herbicid', 'hexagon', 'homogen', 'hyperact', 'irredeem', 'geriatr' ] },
    { whenInputIs: [ 'raining' ], expectedOutputIs: [ 'rain' ] },
  ];

  tests.forEach( function ( test ) {
    it( 'should return ' + JSON.stringify( test.expectedOutputIs ) + ' if the input is ' + JSON.stringify( test.whenInputIs ), function () {
      expect( prepare.tokens.stem( test.whenInputIs ) ).to.deep.equal( test.expectedOutputIs );
    } );
  } );

  errors.slice( 0, 2 ).forEach( function ( error ) {
    it( 'should throw ' + error.expectedOutputIs + ' if the input is ' + JSON.stringify( error.whenInputIs ), function () {
      expect( prepare.tokens.stem.bind( null, error.whenInputIs ) ).to.throw( error.expectedOutputIs );
    } );
  } );
} );

// ### Create tokens phonetize test cases.

describe( 'prepare.tokens.phonetize()', function () {
  var tests = [
    { whenInputIs: [ 'girl', 'is', 'walking', 'towards', 'school' ], expectedOutputIs: [ 'grl', 'is', 'wlkng', 'twrds', 'skl' ] },
    { whenInputIs: [  ], expectedOutputIs: [  ] },
    { whenInputIs: [ 'someone', 'called', 'me', 'yesterday' ], expectedOutputIs: [ 'smn', 'kld', 'm', 'ystrd' ] },
  ];

  tests.forEach( function ( test ) {
    it( 'should return ' + JSON.stringify( test.expectedOutputIs ) + ' if the input is ' + JSON.stringify( test.whenInputIs ), function () {
      expect( prepare.tokens.phonetize( test.whenInputIs ) ).to.deep.equal( test.expectedOutputIs );
    } );
  } );

  errors.slice( 0, 2 ).forEach( function ( error ) {
    it( 'should throw ' + error.expectedOutputIs + ' if the input is ' + JSON.stringify( error.whenInputIs ), function () {
      expect( prepare.tokens.phonetize.bind( null, error.whenInputIs ) ).to.throw( error.expectedOutputIs );
    } );
  } );
} );


// ### Create tokens removeWords test cases.

describe( 'prepare.tokens.removeWords()', function () {
  var tests = [
    { whenInputIs: [ 'mary', 'had', 'a', 'little', 'lamb' ], expectedOutputIs: [ 'mary', 'little', 'lamb' ] },
    { whenInputIs: [ 'this', 'world', 'is', 'small', 'if', 'you', 'are', 'well', 'connected' ], expectedOutputIs: [ 'world', 'small', 'well', 'connected' ] },
  ];

  tests.forEach( function ( test ) {
    it( 'should return ' + JSON.stringify( test.expectedOutputIs ) + ' if the input is ' + JSON.stringify( test.whenInputIs ), function () {
      expect( prepare.tokens.removeWords( test.whenInputIs ) ).to.deep.equal( test.expectedOutputIs );
    } );
  } );

  errors.slice( 0, 2 ).forEach( function ( error ) {
    it( 'should throw ' + error.expectedOutputIs + ' if the input is ' + JSON.stringify( error.whenInputIs ), function () {
      expect( prepare.tokens.removeWords.bind( null, error.whenInputIs ) ).to.throw( error.expectedOutputIs );
    } );
  } );
} );

// ### Create tokens bow without log2 test cases.

describe( 'prepare.tokens.bow()', function () {
  var tests = [
    { whenInputIs: [ 'mary', 'had', 'a', 'little', 'lamb', 'mary', 'had', 'a', 'little', 'lamb' ], expectedOutputIs: { mary: Math.log2( 2 + 1 ), little: Math.log2( 2 + 1 ), lamb: Math.log2( 2 + 1 ), had: Math.log2( 2 + 1 ), a: Math.log2( 2 + 1 ) } },
    { whenInputIs: [ 'rain', 'rain', 'go', 'away', 'come', 'again', 'rain', 'and', 'again', 'go', 'away' ], expectedOutputIs: { rain: Math.log2( 3 + 1 ), go: Math.log2( 2 + 1 ), away: Math.log2( 2 + 1 ), come: Math.log2( 1 + 1 ), and: Math.log2( 1 + 1 ), again: Math.log2( 2 + 1 ) } },
    { whenInputIs: [ '', '   ', 'go', 'away', 'come', 'again', 'rain', 'and', 'again', 'go', 'away' ], expectedOutputIs: { '': Math.log2( 1 + 1 ), '   ': Math.log2( 1 + 1 ), rain: Math.log2( 1 + 1 ), go: Math.log2( 2 + 1 ), away: Math.log2( 2 + 1 ), come: Math.log2( 1 + 1 ), and: Math.log2( 1 + 1 ), again: Math.log2( 2 + 1 )  } },
  ];

  tests.forEach( function ( test ) {
    it( 'should return ' + JSON.stringify( test.expectedOutputIs ) + ' if the input is ' + JSON.stringify( test.whenInputIs ), function () {
      expect( prepare.tokens.bow( test.whenInputIs, true ) ).to.deep.equal( test.expectedOutputIs );
    } );
  } );

  it( 'indexer result should return an index of 2-grams of rachna & archna', function () {
    var bowIndex = prepare.helper.index();
    prepare.tokens.bow( [ 'mary', 'had', 'a', 'lamb' ], false, bowIndex.build, 0 );
    prepare.tokens.bow( [ 'blue', 'lamb', 'white', 'lamb' ], false, bowIndex.build, 1 );
    var result = bowIndex.result();
    expect( result ).to.deep.equal( { blue: [ 1 ], mary: [ 0 ], lamb: [ 0, 1 ], a: [ 0 ], had: [ 0 ], white: [ 1 ] } );
  } );

  errors.slice( 0, 2 ).forEach( function ( error ) {
    it( 'should throw ' + error.expectedOutputIs + ' if the input is ' + JSON.stringify( error.whenInputIs ), function () {
      expect( prepare.tokens.bow.bind( null, error.whenInputIs ) ).to.throw( error.expectedOutputIs );
    } );
  } );
} );

describe( 'tokens.sow()', function () {
  it( 'should return set', function () {
    var myset = prepare.tokens.sow( [ 'apples', 'fall', 'under', 'gravity', 'and', 'apples', 'rise' ] );
    expect( myset.has( 'apples' ) ).to.deep.equal( true );
    expect( myset.has( 'fall' ) ).to.deep.equal( true );
    expect( myset.has( 'under' ) ).to.deep.equal( true );
    expect( myset.has( 'gravity' ) ).to.deep.equal( true );
    expect( myset.has( 'rise' ) ).to.deep.equal( true );
    expect( myset.has( 'and' ) ).to.deep.equal( true );
    expect( myset.size ).to.deep.equal( 6 );
    expect( myset.has( 'bananas' ) ).to.deep.equal( false );
  } );

  it( 'indexer result should return an index', function () {
    var sowIndex = prepare.helper.index();
    prepare.tokens.sow( [ 'apple', 'is', 'a', 'company' ], sowIndex.build, 0 );
    prepare.tokens.sow( [ 'apple', 'is', 'a', 'fruit' ], sowIndex.build, 1 );
    var result = sowIndex.result();
    expect( result ).to.deep.equal( { a: [ 0, 1 ], apple: [ 0, 1 ], is: [ 0, 1 ], company: [ 0 ], fruit: [ 1 ] } );
  } );
} );


// ### Create words - without mapper test cases

// Higher order function, can only test the true/false status with inputs
// Actual result is not expected with these testcases.
var myWords = prepare.helper.words( [ 'Mary', 'Lamb' ], [ prepare.string.lowerCase ] );
describe( 'prepare.helper.words()', function () {
  var tests = [
    { whenInputIs: 'mary', expectedOutputIs: false },
    { whenInputIs: 'Mary', expectedOutputIs: true },
    { whenInputIs: 'merry', expectedOutputIs: true },
    { whenInputIs: 'lamb', expectedOutputIs: false },
    { whenInputIs: 'marylamb', expectedOutputIs: true },
    { whenInputIs: 'unknown', expectedOutputIs: true },
    { whenInputIs: undefined, expectedOutputIs: true },
    { whenInputIs: null, expectedOutputIs: true }
  ];

  tests.forEach( function ( test ) {
    it( 'should return ' + JSON.stringify( test.expectedOutputIs ) + ' if the input is ' + JSON.stringify( test.whenInputIs ), function () {
      expect( myWords.exclude( test.whenInputIs ) ).to.deep.equal( test.expectedOutputIs );
    } );
  } );

  it( 'should return the set with myWords.set()', function () {
    var myset = myWords.set();
    expect( myset.has( 'mary' ) ).to.deep.equal( true );
    expect( myset.has( 'Mary' ) ).to.deep.equal( false );
    expect( myset.has( 'lamb' ) ).to.deep.equal( true );
    expect( myset.has( 'merry' ) ).to.deep.equal( false );
  } );
} );

// ### helper.index

// Test by building a separate index.
var myIndex = prepare.helper.index();
var resIndex = {
  had: [ 2, 5 ],
  lamb: [ 3 ],
  little: [ 1 ],
  mary: [ 0 ],
  sparrow: [ 6 ],
  tom: [ 4 ]
};
describe( 'prepare.helper.index()', function () {
  var tests = [
    { whenInputIs: [ 'mary', 0 ], expectedOutputIs: true },
    { whenInputIs: [ 'little', 1 ], expectedOutputIs: true },
    { whenInputIs: [ 'had', 2 ], expectedOutputIs: true },
    { whenInputIs: [ 'lamb', 3 ], expectedOutputIs: true },
    { whenInputIs: [ 'tom', 4 ], expectedOutputIs: true },
    { whenInputIs: [ 'had', 5 ], expectedOutputIs: true },
    { whenInputIs: [ 'sparrow', 6 ], expectedOutputIs: true }
  ];
  // Build index.
  tests.forEach( function ( test ) {
    it( 'should return ' + JSON.stringify( test.expectedOutputIs ) + ' if the input is ' + JSON.stringify( test.whenInputIs ), function () {
      expect( myIndex.build.apply( null, test.whenInputIs ) ).to.deep.equal( test.expectedOutputIs );
    } );
  } );
  // Check index.
  it( 'should return index when result is called', function () {
    expect( myIndex.result( ) ).to.deep.equal( resIndex );
  } );
  // Observer impact of no validations!
  it( 'should return index when result is called', function () {
    expect( myIndex.build( ) ).to.deep.equal( true );
  } );

  it( 'should return updated index when result is called', function () {
    // Update index with error that got thru in the previous step.
    resIndex.undefined = [ undefined ];
    expect( myIndex.result( ) ).to.deep.equal( resIndex );
  } );
} );

// ### helper.returnQuotedTextExtractor

describe( 'helper.returnQuotedTextExtractor', function () {
  // Use default quotes first
  var extractor1 = prepare.helper.returnQuotedTextExtractor();
  var tests1 = [
    { whenInputIs: undefined, expectedOutputIs: null },
    { whenInputIs: null, expectedOutputIs: null },
    { whenInputIs: 1, expectedOutputIs: null },
    { whenInputIs: '', expectedOutputIs: null },
    { whenInputIs: 'dummy', expectedOutputIs: null },
    { whenInputIs: '"dummy"', expectedOutputIs: [ 'dummy' ] },
    { whenInputIs: 'I said "Hi", you said "Hello" but I expected "Ola"', expectedOutputIs: [ 'Hi', 'Hello', 'Ola' ] },
    { whenInputIs: 'I said "Hi", you said "Hello" but I expected "Ola', expectedOutputIs: [ 'Hi', 'Hello' ] },
    { whenInputIs: 'I said "Hi", you said "Hello" but I expected ""', expectedOutputIs: [ 'Hi', 'Hello', '' ] }
  ];

  tests1.forEach( function ( test ) {
    it( 'should return ' + JSON.stringify( test.expectedOutputIs ) + ' when input is ' + JSON.stringify( test.whenInputIs ), function () {
      expect( extractor1( test.whenInputIs ) ).to.deep.equal( test.expectedOutputIs );
    } );
  } );
  // now incorrect values leading to default
  var extractor2 = prepare.helper.returnQuotedTextExtractor( 1, 1 );
  var tests2 = [
    { whenInputIs: undefined, expectedOutputIs: null },
    { whenInputIs: null, expectedOutputIs: null },
    { whenInputIs: 1, expectedOutputIs: null },
    { whenInputIs: '', expectedOutputIs: null },
    { whenInputIs: 'dummy', expectedOutputIs: null },
    { whenInputIs: '"dummy"', expectedOutputIs: [ 'dummy' ] },
    { whenInputIs: 'I said "Hi", you said "Hello" but I expected "Ola"', expectedOutputIs: [ 'Hi', 'Hello', 'Ola' ] },
    { whenInputIs: 'I said "Hi", you said "Hello" but I expected "Ola', expectedOutputIs: [ 'Hi', 'Hello' ] },
    { whenInputIs: 'I said "Hi", you said "Hello" but I expected ""', expectedOutputIs: [ 'Hi', 'Hello', '' ] }
  ];

  tests2.forEach( function ( test ) {
    it( 'should return ' + JSON.stringify( test.expectedOutputIs ) + ' when input is ' + JSON.stringify( test.whenInputIs ), function () {
      expect( extractor2( test.whenInputIs ) ).to.deep.equal( test.expectedOutputIs );
    } );
  } );

  // Balanced but 2 chars
  var extractor3 = prepare.helper.returnQuotedTextExtractor( '{{', '}}' );
  var tests3 = [
    { whenInputIs: undefined, expectedOutputIs: null },
    { whenInputIs: null, expectedOutputIs: null },
    { whenInputIs: 1, expectedOutputIs: null },
    { whenInputIs: '', expectedOutputIs: null },
    { whenInputIs: 'dummy', expectedOutputIs: null },
    { whenInputIs: '{{dummy}}', expectedOutputIs: [ 'dummy' ] },
    { whenInputIs: 'I said {{Hi}}, you said {{Hello}} but I expected {{Ola}}', expectedOutputIs: [ 'Hi', 'Hello', 'Ola' ] },
    { whenInputIs: 'I said {{Hi}}, you said {{Hello}} but I expected {{Ola}', expectedOutputIs: [ 'Hi', 'Hello' ] },
    { whenInputIs: 'I said {{Hi}}, you said {{Hello}} but I expected {{}}', expectedOutputIs: [ 'Hi', 'Hello', '' ] }
  ];

  tests3.forEach( function ( test ) {
    it( 'should return ' + JSON.stringify( test.expectedOutputIs ) + ' when input is ' + JSON.stringify( test.whenInputIs ), function () {
      expect( extractor3( test.whenInputIs ) ).to.deep.equal( test.expectedOutputIs );
    } );
  } );

  // Balanced but 1 char
  var extractor4 = prepare.helper.returnQuotedTextExtractor( '[', ']' );
  var tests4 = [
    { whenInputIs: undefined, expectedOutputIs: null },
    { whenInputIs: null, expectedOutputIs: null },
    { whenInputIs: 1, expectedOutputIs: null },
    { whenInputIs: '', expectedOutputIs: null },
    { whenInputIs: 'dummy', expectedOutputIs: null },
    { whenInputIs: '[dummy]', expectedOutputIs: [ 'dummy' ] },
    { whenInputIs: 'I said [Hi], you said [Hello] but I expected [Ola]', expectedOutputIs: [ 'Hi', 'Hello', 'Ola' ] },
    { whenInputIs: 'I said [Hi], you said [Hello] but I expected [Ola', expectedOutputIs: [ 'Hi', 'Hello' ] },
    { whenInputIs: 'I said [Hi], you said [Hello] but I expected []', expectedOutputIs: [ 'Hi', 'Hello', '' ] }
  ];

  tests4.forEach( function ( test ) {
    it( 'should return ' + JSON.stringify( test.expectedOutputIs ) + ' when input is ' + JSON.stringify( test.whenInputIs ), function () {
      expect( extractor4( test.whenInputIs ) ).to.deep.equal( test.expectedOutputIs );
    } );
  } );
} );

// ### Create remove html tags test cases.

// Tests all except hexacodes

describe( 'string.removeHTMLTags()', function () {
  var tests = [
    { whenInputIs: ' ', expectedOutputIs: ' ' },
    { whenInputIs: 'HTML uses elements like <b> and <i> for formatting output', expectedOutputIs: 'HTML uses elements like   and   for formatting output' },
    { whenInputIs: ' <i>This text is italic</i>', expectedOutputIs: '  This text is italic ' },
    { whenInputIs: '<p>Vive la France&nbsp;&#160;!</p>', expectedOutputIs: ' Vive la France  ! ' },
  ];

  tests.forEach( function ( test ) {
    it( 'should return ' + JSON.stringify( test.expectedOutputIs ) + ' if the input is ' + JSON.stringify( test.whenInputIs ), function () {
      expect( prepare.string.removeHTMLTags( test.whenInputIs ) ).to.deep.equal( test.expectedOutputIs );
    } );
  } );

  errors.slice( 0, 2 ).forEach( function ( error ) {
    it( 'should throw ' + error.expectedOutputIs + ' if the input is ' + JSON.stringify( error.whenInputIs ), function () {
      expect( prepare.string.removeHTMLTags.bind( error.whenInputIs ) ).to.throw( error.expectedOutputIs );
    } );
  } );
} );

// ### Propagate Negation test cases.

describe( 'prepare.tokens.propagateNegations()', function () {
  var tests = [
    { whenInputIs: [ [ 'mary', 'is', 'feeling', 'good', 'today' ] ], expectedOutputIs: [ 'mary', 'is', 'feeling', 'good', 'today' ] },
    { whenInputIs: [ [ 'mary', 'is', 'not', 'feeling', 'good', 'today' ] ], expectedOutputIs: [ 'mary', 'is', 'not', '!feeling', '!good', 'today' ] },
    { whenInputIs: [ [ 'mary', 'is', 'not', 'feeling', 'good', 'today' ], 300 ], expectedOutputIs: [ 'mary', 'is', 'not', '!feeling', '!good', '!today' ] },
    { whenInputIs: [ [ 'mary', 'is', 'not', 'feeling', 'good', 'today' ], 3 ], expectedOutputIs: [ 'mary', 'is', 'not', '!feeling', '!good', '!today' ] },
    { whenInputIs: [ [ 'mary', 'is', 'not', 'feeling', 'good', 'today' ], 1 ], expectedOutputIs: [ 'mary', 'is', 'not', '!feeling', 'good', 'today' ] },
    { whenInputIs: [ [ 'mary', 'is', 'not', 'feeling', 'good', 'today', ',', 'was', 'ok', 'yesterday' ] ], expectedOutputIs: [ 'mary', 'is', 'not', '!feeling', '!good', 'today', ',', 'was', 'ok', 'yesterday' ] },
    { whenInputIs: [ [ 'mary', 'is', 'not', 'feeling', 'good', 'today', ',', 'was', 'ok', 'yesterday' ], 3 ], expectedOutputIs: [ 'mary', 'is', 'not', '!feeling', '!good', '!today', ',', 'was', 'ok', 'yesterday' ] },
    { whenInputIs: [ [ 'mary', 'is', 'not', 'feeling', 'good', 'today', ',', 'was', 'ok', 'yesterday' ], 4 ], expectedOutputIs: [ 'mary', 'is', 'not', '!feeling', '!good', '!today', ',', 'was', 'ok', 'yesterday' ] },
    { whenInputIs: [ [ 'mary', 'is', 'not', 'feeling', 'good', 'today', ',', 'was', 'ok', 'yesterday' ], 400 ], expectedOutputIs: [ 'mary', 'is', 'not', '!feeling', '!good', '!today', ',', 'was', 'ok', 'yesterday' ] },
    { whenInputIs: [ [ 'mary', 'is', 'not', 'feeling', 'good', 'today', ',', 'was', 'not', 'ok', 'yesterday' ], 400 ], expectedOutputIs: [ 'mary', 'is', 'not', '!feeling', '!good', '!today', ',', 'was', 'not', '!ok', '!yesterday' ] },
  ];

  tests.forEach( function ( test ) {
    it( 'should return ' + JSON.stringify( test.expectedOutputIs ) + ' if the input is ' + JSON.stringify( test.whenInputIs ), function () {
      expect( prepare.tokens.propagateNegations.apply( null, test.whenInputIs ) ).to.deep.equal( test.expectedOutputIs );
    } );
  } );

  errors.slice( 0, 2 ).forEach( function ( error ) {
    it( 'should throw ' + error.expectedOutputIs + ' if the input is ' + JSON.stringify( error.whenInputIs ), function () {
      expect( prepare.tokens.removeWords.bind( null, error.whenInputIs ) ).to.throw( error.expectedOutputIs );
    } );
  } );
} );
