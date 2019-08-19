// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.


var nodeConsole = require('console');
var myConsole = new nodeConsole.Console(process.stdout, process.stderr);

const http = require('http')
var my_url = require('url');

function send_http_request(port, path) {
  var http = new XMLHttpRequest();
  robot_hostname = document.getElementById("idInput").value;
  http.open("GET", "http://" + robot_hostname + ".local:" + port + path, /*async*/true);
  http.onreadystatechange = function() {
    if (http.readyState == 4) {
      var ended = new Date().getTime();

      var milliseconds = ended - started;

      if (pong != null) {
        pong(milliseconds);
      }
    }
  };
  try {
    http.send(null);
  } catch(exception) {
    // this is expected
  }
}

const server = http.createServer(function(request, response) {
  const {method, url, headers} = request;
  var q = my_url.parse(url, true);  
  var url_params = q["path"].split("/");
  if (url_params[1] == 'move') {
    send_http_request("5000", url);
    let data = [];
    request.on('error', (err) => {
      myConsole.error(err.stack);
    }).on('data', (chunk) => {
      data.push(chunk);
    }).on('end', () => {
      data = Buffer.concat(data).toString();
      response.on('error', (err) => {
        myConsole.error(err);
      });
      response.statusCode = 200;
      response.setHeader('Content-Type', 'application/json');

      const responseBody = {method, url, headers, data};
            
      response.end(JSON.stringify(responseBody));
    });     
  } else if (url_params[1] == 'speak') {
    send_http_request("5000", url);
    let data = [];
    request.on('error', (err) => {
      myConsole.error(err.stack);
    }).on('data', (chunk) => {
      data.push(chunk);
    }).on('end', () => {
      data = Buffer.concat(data).toString();
      response.on('error', (err) => {
        myConsole.error(err);
      });
      response.statusCode = 200;
      response.setHeader('Content-Type', 'application/json');

      const responseBody = {method, url, headers, data};
            
      response.end(JSON.stringify(responseBody));
    });
  } else if (url_params[1] == 'clockwise-move') {
    send_http_request("5000", url);
    let data = [];
    request.on('error', (err) => {
      myConsole.error(err.stack);
    }).on('data', (chunk) => {
      data.push(chunk);
    }).on('end', () => {
      data = Buffer.concat(data).toString();
      response.on('error', (err) => {
        myConsole.error(err);
      });
      response.statusCode = 200;
      response.setHeader('Content-Type', 'application/json');

      const responseBody = {method, url, headers, data};
            
      response.end(JSON.stringify(responseBody));
    });
  } else if (url_params[1] == 'counterclockwise-move') {
    send_http_request("5000", url);
    let data = [];
    request.on('error', (err) => {
      myConsole.error(err.stack);
    }).on('data', (chunk) => {
      data.push(chunk);
    }).on('end', () => {
      data = Buffer.concat(data).toString();
      response.on('error', (err) => {
        myConsole.error(err);
      });
      response.statusCode = 200;
      response.setHeader('Content-Type', 'application/json');

      const responseBody = {method, url, headers, data};
            
      response.end(JSON.stringify(responseBody));
    });
  } else {
        response.statusCode = 404;
        response.end();
  }
})

const port = 8080
const host = '127.0.0.1'
server.listen(port, host)
myConsole.log(`Listening at http://${host}:${port}`)