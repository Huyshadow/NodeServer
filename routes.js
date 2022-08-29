const fs = require('fs');
const { request } = require('http');

function requestHandler(req, res) {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>')
        res.write('</html>');
        return res.end();
    }
    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        })
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            //fs.writeFileSync('message.txt', message); 
            fs.writeFile('message.txt', message, err => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            })
        }) 
    }
    //process.exit();
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Huy First Server</title></head>');
    res.write('<body><h1>Hello World</h1></body>')
    res.write('</html>');
    res.end();
};

// module.export = requestHandler 

// module.exports = {
//     handler: requestHandler,
//     someText: 'Some hard code Text',
// }

// module.exports.handler = requestHandler;
// module.exports.someText = "Some hard coded Text";

exports.handler = requestHandler;
module.exports.someText = "Some hard coded Text";
