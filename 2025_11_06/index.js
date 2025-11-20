const express = require('express')
const path = require('node:path')
const mysql = require('mysql2/promise')

const app = express()

const staticDir = path.join(__dirname, 'static')

app.use(express.static(staticDir))
app.use(express.urlencoded({ extended: false }))

let connection

;(async function init() {
  try {
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: '2025_11_06',
      password: ''
    })

    app.listen(3000, () => {
      console.log('App is running on http://localhost:3000')
    })
  } catch (err) {
    console.error('Error connecting to the database:', err)
    process.exit(1)
  }
})()

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

app.post('/kontakt', async (req, res) => {
  console.log('Formularz kontaktowy - dane:', req.body)
  const { name, surname, email, message } = req.body
  if (!name || !surname || !email || !message) {
    return res.sendStatus(400)
  }
  try{
    await connection.execute(
      'INSERT INTO messages (name, surname, email, message) VALUES (?, ?, ?, ?)',
      [req.body.name, req.body.surname, req.body.email, req.body.message]
    )
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
  res.redirect('/')
})

app.get('/api/contact-messages', async (req, res) => {
  try {
    const [rows] = await connection.execute('SELECT * FROM messages')
    res.json(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.get('/api/contact-messages/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    if (!Number.isInteger(id) || id <= 0) {
      return res.sendStatus(400)
    }

    const [rows] = await connection.execute('SELECT * FROM messages WHERE id = ?', [id])

    if (rows.length === 0) {
      return res.sendStatus(404)
    }

    res.json(rows[0])
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
})

app.use((err, req, res, next) => {
  console.error(err)
  if (res.headersSent) return next(err)
    res.sendStatus(500)
})
