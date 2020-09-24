const { v4: uuid } = require('uuid')


const bookmarks = [
  { id: uuid(),
    title: 'ExpressJs',
    url: 'https://expressjs.com/en/api.html',
    description: 'Go here to check ExpressJS API',
    rating: 5 },
  { id: uuid(),
    title: 'Google',
    url: 'https://www.google.com',
    description: 'Best search engine',
    rating: 4 },
  { id: uuid(),
    title: 'MDN',
    url: 'https://developer.mozilla.org',
    description: 'Best place for JS documentation',
    rating: 5 },
]
module.exports = { bookmarks }