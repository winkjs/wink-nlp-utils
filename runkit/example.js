// Load wink-nlp-utils
var nlp = require( 'wink-nlp-utils' );

// Extract person's name from a string:
var name = nlp.string.extractPersonsName( 'Dr. Sarah Connor M. Tech., PhD. - AI' );
console.log( name ); // eslint-disable-line no-console
// -> 'Sarah Connor'

// Compose all possible sentences from a string:
var str = '[I] [am having|have] [a] [problem|question]';
console.log( nlp.string.composeCorpus( str ) ); // eslint-disable-line no-console
// -> [ 'I am having a problem',
// ->   'I am having a question',
// ->   'I have a problem',
// ->   'I have a question' ]

// Sentence Boundary Detection.
var para = 'AI Inc. is focussing on AI. I work for AI Inc. My mail is r2d2@yahoo.com';
console.log( nlp.string.sentences( para ) ); // eslint-disable-line no-console
// -> [ 'AI Inc. is focussing on AI.',
//      'I work for AI Inc.',
//      'My mail is r2d2@yahoo.com' ]

// Tokenize a sentence.
var s = 'For details on wink, check out http://winkjs.org/ URL!';
console.log( nlp.string.tokenize( s, true ) ); // eslint-disable-line no-console
// -> [ { value: 'For', tag: 'word' },
//      { value: 'details', tag: 'word' },
//      { value: 'on', tag: 'word' },
//      { value: 'wink', tag: 'word' },
//      { value: ',', tag: 'punctuation' },
//      { value: 'check', tag: 'word' },
//      { value: 'out', tag: 'word' },
//      { value: 'http://winkjs.org/', tag: 'url' },
//      { value: 'URL', tag: 'word' },
//      { value: '!', tag: 'punctuation' } ]

// Remove stop words:
var t = nlp.tokens.removeWords( [ 'mary', 'had', 'a', 'little', 'lamb' ] );
console.log( t ); // eslint-disable-line no-console
// -> [ 'mary', 'little', 'lamb' ]
