const app = require('../src/app')
const knex = require('knex')
const {makeBookmarksArray} = require('./bookmarks.fixtures')
const BooksmarksService = require('../src/bookmarks/bookmarks-service')
const { expect } = require('chai')

describe('App', () => {
  let db;

  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL
    });
  });

  before(() => db('bookmarks_list').truncate());

  afterEach(() => db('bookmarks_list').truncate());

  after(() => db.destroy());

  context(`Given 'bookmarks_list' has data`, ()=>{
    const expectedItems = makeBookmarksArray();
    console.log(expectedItems)
    beforeEach(() => {
      return db.into('bookmarks_list').insert(expectedItems)
    });

    it('getAllItems()', () => {
      return BooksmarksService.getAllBookmarks(db).then(actual => {
        expect(actual).to.eql(expectedItems);
      })
    })

    it('getById()', () => {
      const idToGet = 2;
      const secondItem = expectedItems[idToGet - 1];

      return BooksmarksService.getById(db, idToGet)
        .then(actual => {
          expect(actual).to.eql({
            id: idToGet,
            title: secondItem.title,
            url: secondItem.url,
            rating: secondItem.rating,
            description: secondItem.description
          })
        })
    })
  })

  context(`Given 'bookmarks_list' has no data`, ()=>{
    it(`getAllItems()`, () => {
      return BooksmarksService.getAllBookmarks(db)
        .then(actual => {
          expect(actual).to.eql([]);
        });
    });
  })
})