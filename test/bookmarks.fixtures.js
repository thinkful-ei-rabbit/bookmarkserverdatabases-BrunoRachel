function makeBookmarksArray(){
  return [
    { id: 1,
      title: 'ExpressJs',
      url: 'https://expressjs.com/en/api.html',
      description: 'Go here to check ExpressJS API',
      rating: 5 },
    { id: 2,
      title: 'Google',
      url: 'https://www.google.com',
      description: 'Best search engine',
      rating: 4 },
    { id: 3,
      title: 'MDN',
      url: 'https://developer.mozilla.org',
      description: 'Best place for JS documentation',
      rating: 5 },
  ]
}

module.exports = {
  makeBookmarksArray,
}