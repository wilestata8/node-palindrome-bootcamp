const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

const server = http.createServer(function(req, res) {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
    console.log(page);
    if (page == '/') {
      fs.readFile('index.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
      });
    }
    else if (page == '/api') {
      if('word' in params){
          let forwardArray = params['word']
          let backwardsArray = new Array()
          for(i= forwardArray.length-1; i > -1; i--){
              console.log([i])
              console.log(forwardArray[i])
              backwardsArray.push(forwardArray[i])
          }
          backwardsArray = backwardsArray.join('')
          console.log(backwardsArray)
          console.log(forwardArray)
        if(forwardArray == backwardsArray){ 
          res.writeHead(200, {'Content-Type': 'application/json'});
          const objToJson = {
              word: forwardArray,
              backwards: backwardsArray,
              palindrome: 'Yes',
              what: 'is'
          }
          res.end(JSON.stringify(objToJson));
        }
        else { 
          res.writeHead(200, {'Content-Type': 'application/json'});
          const objToJson = {
              word: forwardArray,
              backwards: backwardsArray,
              palindrome: 'No',
              what: 'is not'
          }
          res.end(JSON.stringify(objToJson));
        }
      }
        }
  else if (page == '/css/style.css'){
    fs.readFile('css/style.css', function(err, data) {
      res.write(data);
      res.end();
    });
  }else if (page == '/js/main.js'){
    fs.readFile('js/main.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  }else{
    figlet('404!!', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000);