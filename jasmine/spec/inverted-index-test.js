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
