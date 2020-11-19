const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
const mongoose = require('mongoose')
const routes = require('./src/routes')
const { route } = require('./src/routes')

const app = express()
const port = process.env.PORT || 5000

mongoose.connect('mongodb://localhost:27017/curso-basico-mern', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}, function (error) {
  if (error) {
    console.log(error)
  } else {
    console.log('MongoDB conectado com sucesso!')
  }
})

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(routes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
