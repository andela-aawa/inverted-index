(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports=[
  {
    "title": "Alice in Wonderland",
    "text": "Alice falls into a rabbit hole and enters a world full of imagination."
  },

  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  }
]

},{}],2:[function(require,module,exports){
const books = require('./books.json')


describe('InvertedIndex Class', () => {
  beforeEach(() => {
    this.invertedIndex = new InvertedIndex();
    this.index = this.invertedIndex.createIndex('books', books);
  });

  describe('Constructor', () => {
    it('can create inverted index instance', () => {
      expect(typeof this.invertedIndex).toEqual('object');
      expect(this.invertedIndex instanceof InvertedIndex).toBe(true);
    });

    it('has default empty indexes object', () => {
      expect(typeof this.invertedIndex.indexes).toEqual('object');
    });
  });

 describe('GetWords', () => {
    it('should return an array of words', () => {
      expect(InvertedIndex.getWords(books[0].title))
        .toEqual(['alice', 'in', 'wonderland']);
    });

    it('filters out symbols', () => {
      expect(InvertedIndex.getWords('alice # in* Won@derland'))
        .toEqual(['alice', 'in', 'wonderland']);
    });
  });

  describe('CreateIndex', () => {
    it('creates an index', () => {
      expect(this.index.a).toEqual([0, 1]);
      expect(this.index.alice).toEqual([0]);
    });
  });


  describe('GetIndex', () => {
    it('should return a particular index', () => {
      const index = this.invertedIndex.getIndex('books');

      expect(index.a).toEqual([0, 1]);
      expect(index.alice).toEqual([0]);
    });
  });


  describe('SearchIndex', () => {
    it('should return "not exist" if index does not exist', () => {
      expect(this.invertedIndex.searchIndex('alice in wonderland', 'movies'))
        .toEqual('Index with movies does not exist.');
    });

    it('should return "not found" for words not in index', () => {
      expect(this.invertedIndex.searchIndex('', 'books'))
        .toEqual('no word found');
    });

    it('should return object with search words', () => {
      const result = this.invertedIndex
                         .searchIndex('alice in wonderland', 'books');
      expect(Object.keys(result)).toContain('alice');
      expect(Object.keys(result)).toContain('wonderland');
      expect(Object.keys(result)).toContain('in');
    });
  });
});

},{"./books.json":1}]},{},[2]);
