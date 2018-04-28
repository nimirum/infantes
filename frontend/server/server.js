const express = require('express')
const app = express()
const fallback = require('express-history-api-fallback')
const port = process.env.PORT ? process.env.PORT : 8080
const root = 'frontend/dist'

app.use(express.static(root))

app.use(express.static('frontend/dist'));

app.use(fallback('index.html', { root }))

app.listen(port, function () {
  console.log(`server listening on port ${port}!`)
})
