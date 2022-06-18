const express = require('express');
const path = require('path')
const app = express()
const port = 3000

app.use(express.static('./public'))

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './homepage.html'))
});

app.get('/colorizer', (req, res) => {
    res.status(200).send('Colorizer Page');
});

app.get('/about', (req, res) => {
    res.sendFile(path.resolve(__dirname, './about.html'))
});

app.all('*', (req, res) => {
    res.status(404).send('<h1>Page Not Found</h1>')
})

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});