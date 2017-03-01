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
    return text.toLowerCase()
    .replace(/[^\w\s]/g, '').split(/\s+/);
  }

  /**
   * Create index
   * @function
   * @param {string} filename
   * @param {Array} data
   * @return {Object} index object
   */
  createIndex(filename, data) {
    const dictionary = {};

    data.forEach((doc, arrayIndex) => {
      const docWords = doc.text;
      const words = InvertedIndex.getWords(docWords);

      words.forEach((word) => {
        if (dictionary[word]) {
          if (dictionary[word].indexOf(arrayIndex) === -1) {
            dictionary[word].push(arrayIndex);
          }
        } else {
          dictionary[word] = [arrayIndex];
        }
      });
    });

    this.indexes[filename] = dictionary;
  }

  /**
   * Get a particular index
   * @function
   * @param {String} filename
   * @return {Object} index object
   */
  getIndex(filename) {
    return this.indexes[filename];
  }

  /**
   * Search Index.
   * @function
   * @param {String} query query string
   * @param {String} filename filename of index to be searched.
   * @returns {Object|String} search result object.
   */
  searchIndex(query, filename) {
    const queryWords = InvertedIndex.getWords(query);
    const index = this.getIndex(filename);

    if (!index) {
      return `Index with ${filename} does not exist.`;
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
