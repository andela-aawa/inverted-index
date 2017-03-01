(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports=[
  {
    "title": "Alice in Wonderland",
    "text": "Alice falls into a rabbit hole and enters a world full of imagination."
  },

  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  },
  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  }
]

},{}],2:[function(require,module,exports){
module.exports=[
  {
    "title": "This is just another book",
    "text": "Welcome to the room of people Who have rooms of people that they loved one day Docked away Just because we check the guns at the door Doesn't mean our brains will change from hand grenades You'll never know the psychopath sitting next to you You'll never know the murderer sitting next to you You'll think: How'd I get here, sitting next to you? But after all I've said, please don't forget"
  },
  {
    "title": "Random Novel",
    "text": "You keep brushing that hair back outta your eyes And it just keeps falling and so do I Well I'm feeling like the luckiest man alive Today I don't know about tomorrow But right now the whole world feels right And the memory of a day like today Can get you through the rest of your life"
  }
]
},{}],3:[function(require,module,exports){
module.exports=[
    {
        "title": "The Tipping Point",
        "text": "By Malcolm Gladwell"
    },
    {
        "title": "David and Goliath",
        "text": "By Malcolm Gladwell"
    }
]
},{}],4:[function(require,module,exports){
const books = require('./books.json');
const books2 = require('./books2.json');
const books3 = require('./books3.json');

describe('InvertedIndex Class', () => {
  beforeAll(() => {
    this.invertedIndex = new InvertedIndex();
    this.index = this.invertedIndex.createIndex('books', books);
    this.index2 = this.invertedIndex.createIndex('books2', books2);
    this.index3 = this.invertedIndex.createIndex('books3', books3);
  });

  describe('Constructor', () => {
    it('can create inverted index instance', () => {
      expect(typeof this.invertedIndex).toEqual('object');
      expect(this.invertedIndex instanceof InvertedIndex).toBe(true);
    });

    it('has an indexes object to hold all indexes', () => {
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
      expect(this.invertedIndex.getIndex('books')).toBeTruthy();
      expect(this.invertedIndex.getIndex('books2')).toBeTruthy();
    });
    it('creates the correct index', () => {
      expect(this.index.a).toEqual([0, 1, 2]);
      expect(this.index.alice).toEqual([0]);
      expect(this.index2.random).toEqual([1]);
      expect(this.index2.room).toEqual([0]);
    });
  });


  describe('GetIndex', () => {
    it('should return "undefined" if index does not exist', () => {
      expect(this.invertedIndex.getIndex(' ')).toEqual(undefined);
      expect(this.invertedIndex.getIndex('books4')).toEqual(undefined);
    });
    
    it('should return a particular index', () => {
      const index1 = this.invertedIndex.getIndex('books');
      const index2 = this.invertedIndex.getIndex('books2');

      expect(index1.a).toEqual([0, 1, 2]);
      expect(index1.alice).toEqual([0]);
      expect(index2.random).toEqual([1]);
      expect(index2.room).toEqual([0]);

    });

    it('returns the exact result of the index', () => {
      const index3 = this.invertedIndex.getIndex('books3');
      expect(index3).toEqual({
        'the':[0], 
        'tipping':[0], 
        'point':[0], 
        'by':[0,1], 
        'malcolm':[0,1], 
        'gladwell':[0,1],
        'david':[1],
        'and':[1],
        'goliath':[1]
      });
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
      expect(this.invertedIndex.searchIndex('alice unusual wonderland', 'books'))
      .toEqual({'alice': [0], 'unusual': [1,2], 'wonderland': [0]});
      expect(this.invertedIndex.searchIndex('room', 'books2')).toEqual({'room': [0]});
      expect(this.invertedIndex.searchIndex('random', 'books2')).toEqual({'random': [1]});
    });
  });
});

},{"./books.json":1,"./books2.json":2,"./books3.json":3}]},{},[4]);
