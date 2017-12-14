const express = require('express')
const { json } = require('body-parser')
const cors = require('cors')
const massive = require('massive')
const pc = require('./products_controller')

require('dotenv').config()

const port = 3000

const app = express()

app.use(cors())
app.use(json())

massive(process.env.CONNECTION_STRING).then(db => {
  app.set('db', db)
})

app.post('/api/product', pc.create)
app.get('/api/products', pc.getAll)
app.get('/api/product/:id', pc.getOne)
app.put('/api/product/:id', pc.update)
app.delete('/api/product/:id', pc.delete)

app.listen(port, console.log(`Listening on port: ${port}`))
