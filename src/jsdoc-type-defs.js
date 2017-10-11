/**
 * @typedef {Object} wordsFilter
 * @property {function} set contains the set created from the array `words`.
 * @property {function} exclude used with array's filter method to exclude
 * the `words` or mapped `words` if `givenMappers` are defined.
 */

/**
 * @typedef {object} indexer
 * @property {function} build accepts two parameters viz. `element` and `itsIndex` to
 * incrementally build index for each `element/itsIndex` combination passed.
 * @property {function} result is used to access the index. This index is in a
 * form of an object that contains each element as key. The value of each key is an array
 * containing all index positions to the element in question. Note these index positions
 * are nothing but each `itsIndex` value passed for the `element`.
 */
