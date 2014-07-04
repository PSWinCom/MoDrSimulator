var http = require('http');
var express = require('express');
var port = process.env.PORT || 1337;;

var app = express();

var mo = require("./mo");

var basicAuth = function(req, res, next) {
  var header=req.headers['authorization']||'',        // get the header
        token=header.split(/\s+/).pop()||'',            // and the encoded auth token
        auth=new Buffer(token, 'base64').toString(),    // convert from base64
        parts=auth.split(/:/),                          // split on colon
        username=parts[0],
        password=parts[1];

  console.log(req.headers);
  console.log('username is "'+username+'" and password is "'+password+'"');
  
  var statusCode = 200;
    if (username != "test" || password != "password")
      statusCode = 401;

  if (statusCode == 200)
    next();
  else
    next("Unauthorized");
};

app.set("port", port);
app.use(require("express-xml-bodyparser")());

app.get("/", function(req, res) {
  res.send(mo.list());
});

app.post("/xml/mo/secure", basicAuth, mo.receive);
app.post("/xml/mo", mo.receive);

var server = app.listen(app.get("port"), function() {
  console.log('Listening on port %d', server.address().port);
});

/*var server = http.createServer(function(req,res) {
  var header=req.headers['authorization']||'',        // get the header
      token=header.split(/\s+/).pop()||'',            // and the encoded auth token
      auth=new Buffer(token, 'base64').toString(),    // convert from base64
      parts=auth.split(/:/),                          // split on colon
      username=parts[0],
      password=parts[1];

  console.log('username is "'+username+'" and password is "'+password+'"');

  var statusCode = 200;
  if (username != "test" || password != "password")
    statusCode = 401;

  res.writeHead(statusCode,{'Content-Type':'text/xml'});
  if (statusCode == 200)
    res.end('<?xml version="1.0"?> \
      <MSGLST> \
        <MSG> \
          <ID>1</ID> \
          <STATUS>OK</STATUS> \
        </MSG> \
      </MSGLST>');
  else
    res.end("Unauthorized");
});

server.listen(port, function () {
  console.log("process.env.PORT = " + process.env.PORT);
  console.log("Listening for MO requests on port " + port);
});*/