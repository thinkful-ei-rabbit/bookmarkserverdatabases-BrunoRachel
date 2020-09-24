require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const {NODE_ENV} = require('./config')

const bookmarksRouter = require('./bookmarks/bookmarks-Router');
const errorHandler = require('./errorHandler/error-Handler');
const validateBearerToken = require('./validate-Bearer-Token/validate-bearer-token')

const app = express()

const morganOption = (NODE_ENV === 'production') ? 'tiny' : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())
app.use(validateBearerToken)

app.get('/', (req, res) => {
  res.send('Hello, boilerplate!')
})

app.use(bookmarksRouter);
app.use(errorHandler);


module.exports = app