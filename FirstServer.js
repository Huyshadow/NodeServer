const http = require('http');
const { handler } = require('./routes.js');
const routes = require('./routes.js');
// const fs = require('fs');


// http.createServer(Listener);
const server = http.createServer(routes.handler);

console.log(routes.someText)
//

// default port will be 80
server.listen(3000);
