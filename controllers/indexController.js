exports.getHompage = (req, res) => {
    res.render('homepage',  { 
        title: 'Home - Image Explorer Colorizer', 
        layout: 'home', 
        css: ['main.css', 'home.css']
    });
}

exports.getColorizer = (req, res) => {
    res.render('colorizer',  { 
        title: 'Colorizer - Image Explorer Colorizer', 
        layout: 'colorizer', 
        css: ['main.css', 'colorizer.css']
    });
}

exports.getAbout = (req, res) => {
    res.render('about',  { 
        title: 'About Us - Image Explorer Colorizer', 
        layout: 'about', 
        css: ['main.css', 'about.css']
    });
}

exports.getError = (req, res) => {
    res.render('error',  { 
        title: 'Error - Image Explorer Colorizer', 
        layout: 'error', 
        css: ['main.css', 'error.css']
    });
}