var http = require('http');
var express = require('express');
var port = process.env.PORT || 1337;;

var app = express();

var mo = require("./mo");

var basicAuth = function(sendevent) { 
  return function(req, res, next) {
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
    else {
      sendevent({ type: 'authreject', body: { username: username, password: password } });
      res.send(statusCode, "Unauthorized");
    }
  }
};

var events = [];

app.set("port", port);
app.use(require("express-xml-bodyparser")());

app.get("/", function(req, res) {
  res.send(JSON.stringify(events));
});

var eventreceived = function (event) {
  event.time = new Date();
  events.push(event);
};

app.post("/dr/secure", basicAuth(eventreceived), mo.receivedr(eventreceived));
app.post("/dr", mo.receivedr(eventreceived));

app.post("/mo/secure", basicAuth(eventreceived), mo.receivemo(eventreceived));
app.post("/mo", mo.receivemo(eventreceived));

var server = app.listen(app.get("port"), function() {
  console.log('Listening on port %d', server.address().port);
});