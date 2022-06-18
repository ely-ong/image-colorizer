const http = require('http')

const port = 3000

const server = http.createServer((req, res) => {    
    if (req.url === '/' || req.url === '/home') {
        res.writeHead(200, {'content-type':'text-html'})
        res.write('<h1>Home Page</h1>')
        res.end()
    }

    else if (req.url === '/colorizer') {
        res.writeHead(200, {'content-type':'text-html'})
        res.write('<h1>Colorizer Page</h1>')
        res.end()
    }

    else if (req.url === '/about') {
        res.writeHead(200, {'content-type':'text-html'})
        res.write('<h1>About Us Page</h1>')
        res.end()
    }
 
    // error page
    else {
        res.writeHead(200, {'content-type':'text-html'})
        res.write('<h1>Page Not Found</h1>')
        res.end()
    }
})

server.listen(port)
console.log(`Listening on port ${port}`);
