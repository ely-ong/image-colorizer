const express = require('express');
const exphbs = require('express-handlebars');
const {spawn} = require('child_process')
const bodyparser = require('body-parser');
const hbs = require('handlebars');
const path = require('path')
const app = express()
var fs = require('fs');
const { envPort } = require('./config');

const port = envPort || 3000;

const indexRouter = require("./routes/indexRoute");

app.engine('hbs', exphbs.engine({
    extname: 'hbs',
    helpers :
    {
        if_equal : function(a, b, opts) {
            if (a == b) {
                return opts.fn(this)
            } else {
                return opts.inverse(this)
            }
        }
    }
}));

app.set('view engine', 'hbs'); 


var upload_dir = './public/uploads';
var colorized_dir = './public/colorized';

if (!fs.existsSync(upload_dir)){
    fs.mkdirSync(upload_dir);
}

if (!fs.existsSync(colorized_dir)){
    fs.mkdirSync(colorized_dir);
}

app.use(express.static('./public'))

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true,
}));

app.use('/', indexRouter);


// // ------- TO BE REMOVED -------
// app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, './homepage.html'))
// });

// app.get('/colorizer', (req, res) => {
//     res.sendFile(path.resolve(__dirname, './colorizer.html'));
// });

// app.get('/about', (req, res) => {
//     res.sendFile(path.resolve(__dirname, './about.html'))
// });

// app.all('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, './errorpage.html'))
// })
// -----------------------------------

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});