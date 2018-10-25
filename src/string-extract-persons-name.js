//     wink-nlp-utils
//     NLP Functions for amplifying negations, managing elisions,
//     creating ngrams, stems, phonetic codes to tokens and more.
//
//     Copyright (C) 2017-18  GRAYPE Systems Private Limited
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
var rgx = require( './util_regexes.js' );
var ncrgx = require( './name_cleaner_regexes.js' );

// ## string

// ### extractPersonsName
/**
 *
 * Attempts to extract person's name from input string.
 * It assmues the following name format:<br/>
 * `[<salutations>] <name part as FN [MN] [LN]> [<degrees>]`<br/>
 * Entities in square brackets are optional.
 *
 * @memberof string
 * @param {string} str the input string.
 * @return {string} extracted name.
 * @example
 * extractPersonsName( 'Dr. Sarah Connor M. Tech., PhD. - AI' );
 * // -> 'Sarah Connor'
 */
var extractPersonsName = function ( str ) {
  // Remove Degrees by making the list of indexes of each degree and subsequently
  // finding the minimum and slicing from there!
  var indexes = ncrgx.degrees.map( function ( r ) {
    var m = r.exec( str );
    return ( m ) ? m.index : 999999;
  } );
  var sp = Math.min.apply( null, indexes );

  // Generate an Array of Every Elelemnt of Name (e.g. title, first name,
  // sir name, honours, etc)
  var aeen = str.slice( 0, sp ).replace( rgx.notAlpha, ' ').replace( rgx.spaces, ' ').trim().split(' ');
  // Remove titles from the beginning.
  while ( aeen.length && ncrgx.titles.test( aeen[0] ) ) aeen.shift();
  return aeen.join(' ');
}; // extractPersonsName()

module.exports = extractPersonsName;
