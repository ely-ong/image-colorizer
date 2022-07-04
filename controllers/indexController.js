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
    from_home = false
    console.log("params here", req.params.original, req.params.colorized)
    if (req.params.original != undefined || req.params.colorized != undefined)
        from_home = true
    console.log("from_home", from_home)
    res.render('colorizer',  { 
        title: 'Colorizer - Image Explorer Colorizer', 
        layout: 'colorizer_layout', 
        from_home,
        css: ['main.css', 'colorizer.css'],
        original_name: req.params.original,
        colorized_name: req.params.colorized,
        js:['colorizer.js']
    });
}
 
exports.postColorizer = (req, res) => {
    console.log('here1')
    console.log(req.body.imageURL)
    file_name = `${req.body.imageURL}`
    colorized_name = `colorized_${file_name}`
    colorized_name = colorized_name.substr(0, colorized_name.lastIndexOf('.'));
    params = `./public/uploads/${req.body.imageURL}  ${colorized_name}`
    const python = spawn('python', ['colorization_master/demo_release.py', params]);

    python.stdout.on('data', (data) => {
        console.log('pattern', data.toString())
        console.log('file and colorized', file_name, colorized_name)
        return res.status(200).json({ file_name: file_name, colorized_name: colorized_name});
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

exports.colorizeImage = (req, res) => {
    console.log('here1')
    console.log(req.body.imageURL)
    file_name = `colorized_${req.body.imageURL}`
    colorized_name = file_name.substr(0, file_name.lastIndexOf('.'));
    params = `./public/uploads/${req.body.imageURL}  ${colorized_name}`
    const python = spawn('python', ['colorization_master/demo_release.py', params]);
    // const python = spawn('python', ['colorization_master/demo_release.py']);

    python.stdout.on('data', (data) => {
    console.log('pattern: ', data.toString());
        return res.status(200).json({ colorized: colorized_name});
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