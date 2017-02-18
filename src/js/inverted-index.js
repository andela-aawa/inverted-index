/**
 * InvertedIndex class
 * @class
 */
class InvertedIndex {
  /**
   * class constructor
   * @constructor
   */
  constructor() {
    this.indexes = {};
  }

  /**
   * Get individual words from a string of text.
   * @function
   * @param {String} text text to be getWords.
   * @return {Array} array of string tokens
   */
  static getWords(text) {
    return text.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);
  }

  /**
   * Create index
   * @function
   * @param {string} indextitle
   * @param {Array} data
   * @return {Object} index object
   */
  createIndex(indextitle, data) {
    const dictionary = {};

    data.forEach((doc, arrayIndex) => {
      for (const key in doc) {
        if (Object.prototype.hasOwnProperty.call(doc, key)) {
          const words = InvertedIndex.getWords(doc[key]);

          words.forEach((word) => {
            if (dictionary[word]) {
              if (dictionary[word].indexOf(arrayIndex) === -1) {
                dictionary[word].push(arrayIndex);
              }
            } else {
              dictionary[word] = [arrayIndex];
            }
          });
        }
      }
    });

    this.indexes[indextitle] = dictionary;

    return this.indexes[indextitle];
  }

  /**
   * Get a particular index
   * @function
   * @param {String} indextitle
   * @return {Object} index object
   */
  getIndex(indextitle) {
    return this.indexes[indextitle];
  }

  /**
   * Search Index.
   * @function
   * @param {String} query query string
   * @param {String} indextitle indextitle of index to be searched.
   * @returns {Object|String} search result object.
   */
  searchIndex(query, indextitle) {
    const queryWords = InvertedIndex.getWords(query);
    const index = this.getIndex(indextitle);

    if (!index) {
      return `Index with ${indextitle} does not exist.`;
    }

    const result = {};

    queryWords.forEach((word) => {
      if (index[word]) {
        result[word] = index[word];
      }
    });

    return Object.keys(result).length > 0 ?
      result : 'no word found';
  }

}

module.exports = InvertedIndex;
