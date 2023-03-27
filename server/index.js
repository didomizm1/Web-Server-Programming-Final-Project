const express = require('express')
const path = require('path')
const app = express()

const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

// Middleware
app
    .use(express.json())
    .use(express.static(path.join(__dirname, '../client/dist')))

// Actions
app
    .get('/api/v1/', (req, res) => {
        res.send('Hello New York Rangers! From Express')
    })

// Catch all
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
})


app.listen(port, () => 
  console.log(`Server running at http://${hostname}:${port}/`)
);
