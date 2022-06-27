var spawn = require("child_process").spawn;
var  { Blob } = require("buffer")


exports.getHomepage = (req, res) => {
    res.render('home',  { 
        title: 'Home - Image Explorer Colorizer', 
        layout: 'home_layout', 
        loc: 'Home',
        css: ['main.css', 'home.css'],
        js:['home.js']
    });
}

exports.getColorizer = (req, res) => {
    res.render('colorizer',  { 
        title: 'Colorizer - Image Explorer Colorizer', 
        layout: 'colorizer_layout', 
        css: ['main.css', 'colorizer.css'],
        js:['colorizer.js']
    });
}
 
exports.colorizeImage = (req, res) => {
    console.log('here1')

    // const python = spawn('python', ['colorization_master/demo_release.py', `-i ${req.body.imageURL}]);
    const python = spawn('python', ['colorization_master/demo_release.py']);

    python.stdout.on('data', (data) => {
    console.log('pattern: ', data.toString());
    });

    python.stderr.on('data', (data) => {
    console.error('err: ', data.toString());
    });

    python.on('error', (error) => {
    console.error('error: ', error.message);
    });

    python.on('close', (code) => {
    console.log('child process exited with code ', code);
    });
}

exports.getAbout = (req, res) => {
    res.render('about',  { 
        title: 'About Us - Image Explorer Colorizer', 
        layout: 'about_layout', 
        loc: 'About',
        css: ['main.css', 'about.css']
    });
}

exports.getError = (req, res) => {
    res.render('error',  { 
        title: 'Error - Image Explorer Colorizer', 
        layout: 'error_layout', 
        css: ['main.css', 'error.css']
    });
}