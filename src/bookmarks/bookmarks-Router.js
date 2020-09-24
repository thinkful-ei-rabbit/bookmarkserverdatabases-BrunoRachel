const express = require('express')
const { v4: uuid } = require('uuid')
const { isWebUri } = require('valid-url');

const logger = require('../logger')
const {bookmarks} = require('../STORE')
const BookmarksService = require('./bookmarks-service')

const bookmarksRouter = express.Router()
const bodyParser = express.json()

bookmarksRouter
  .route('/bookmarks')
  .get((req, res, next) => {
    // res.status(200).send(bookmarks)
    BookmarksService.getAllBookmarks(req.app.get)

  })
  .post(bodyParser, (req, res) => {
    const { title, url, description=false, rating} = req.body

    if(!title){
      res.status(400).send('title required')
    }

    if(!Number.isInteger(rating) || rating < 0 || rating > 5){

    }

    if(!isWebUri(url)){
      logger.error(`Invalid url '${url}' supplied`)
      return res.status(400).send(`'url' must be a valid URL`)
    }

    const bookmark = { id: uuid(), title, url, description, rating }

    bookmarks.push(bookmark)

    logger.info(`Bookmark with id ${bookmark.id} created`)
    res
      .status(201)
      .location(`http://localhost:8000/bookmarks/${bookmark.id}`)
      .json(bookmark)
  })

bookmarksRouter
  .route('/bookmarks/:id')
  .get((req, res) => {
    const { id } = req.params

    const bookmark = bookmarks.find(c => c.id == id)

    if (!bookmark) {
      logger.error(`Bookmark with id ${id} not found.`)
      return res
        .status(404)
        .send('Bookmark Not Found')
    }

    res.json(bookmark)
  })
  .delete((req, res) => {
    const { id } = req.params

    const bookmarkIndex = bookmarks.findIndex(b => b.id === id)

    if (bookmarkIndex === -1) {
      logger.error(`Bookmark with id ${id} not found.`)
      return res
        .status(404)
        .send('Bookmark Not Found')
    }

    bookmarks.splice(bookmarkIndex, 1)

    logger.info(`Bookmark with id ${id} deleted.`)
    res
      .status(204)
      .end()
  })

module.exports = bookmarksRouter