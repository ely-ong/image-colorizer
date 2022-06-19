const express = require('express');
const exphbs = require('express-handlebars');
const hbs = require('handlebars');
const path = require('path')
const app = express()
const port = 3000

const indexRouter = require("./routes/indexRoute");

// app.engine('hbs', exphbs.engine({
//     extname: 'hbs',
// }));

// app.set('view engine', 'hbs');

app.use(express.static('./public'))

// app.use('/', indexRouter);


// ------- TO BE REMOVED -------
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
    res.sendFile(path.resolve(__dirname, './errorpage.html'))
})
// -----------------------------------

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});