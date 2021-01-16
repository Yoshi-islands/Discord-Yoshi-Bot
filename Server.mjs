import express from 'express'
import path from 'path'
import serveStatic from 'serve-static'

var app = express()
const __dirname = path.resolve();
app.use(serveStatic(path.join(__dirname, 'dist')))

var port = process.env.PORT || 8000
app.listen(port)
console.log('server started ' + port)