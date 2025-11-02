const express = require('express')
const path = require('node:path')

const app = express()

const staticDir = path.join(__dirname, 'static')

app.use(express.static(staticDir))

app.use(express.urlencoded({ extended: false }))


app.get('/', (req, res, next) => {
  const file = path.join(staticDir, 'pages', 'index.html')
  res.sendFile(file, (err) => {
    if (err) return next(err)
  })
})

app.get('/o-nas', (req, res, next) => {
  const file = path.join(staticDir, 'pages', 'o-nas.html')
  res.sendFile(file, (err) => {
    if (err) return next(err)
  })
})

app.get('/oferta', (req, res, next) => {
  const file = path.join(staticDir, 'pages', 'oferta.html')
  res.sendFile(file, (err) => {
    if (err) return next(err)
  })
})

app.get('/kontakt', (req, res, next) => {
  const file = path.join(staticDir, 'pages', 'kontakt.html')
  res.sendFile(file, (err) => {
    if (err) return next(err)
  })
})

app.post('/kontakt', (req, res) => {
  console.log('Formularz kontaktowy - dane:', req.body)
  res.redirect('/')
})

app.use((err, req, res, next) => {
  console.error(err)
  if (res.headersSent) return next(err)
  res.status(500).send('Internal Server Error')
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})
