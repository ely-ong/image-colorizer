const {spawn} = require('child_process')

exports.getHompage = (req, res) => {
    res.render('homepage',  { 
        title: 'Home - Image Explorer Colorizer', 
        layout: 'home_layout', 
        loc: 'Home',
        css: ['main.css', 'home.css']
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
    const python = spawn('python', ['demo_release.py']);
    var dataToSend;

    python.stdout.on('data', function(data) {
        dataToSend = data.toString();
    });

    python.stderr.on('data', function(data) {
        console.error(`stderr: ${data}`);
    });

    python.on('exit', (code) => {
        console.log(`child process exited with code ${code}, ${dataToSend}`)
    })

    res.render('colorizer',  { 
        title: 'Colorizer - Image Explorer Colorizer', 
        layout: 'colorizer_layout', 
        css: ['main.css', 'colorizer.css'],
        js:['colorizer.js']
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