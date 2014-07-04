var http = require('http');
var express = require('express.io');
var port = process.env.PORT || 1337;;

var app = express();

app.http().io();

var mo = require("./mo");
var credentials = { username: "test", password: "password" };

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
      if (username != credentials.username || password != credentials.password)
        statusCode = 401;

    if (statusCode == 200)
      next();
    else {
      sendevent({ event: 'reject', body: { username: username, password: password } });
      res.send(statusCode, "Unauthorized");
    }
  }
};

var events = [];

app.io.route("events:clear", function(req) {
  console.log("events:clear");
  events = [];
  app.io.broadcast("events:refresh");
});

app.io.route("setpw", function(password) {
  credentials.password = password;
});

app.io.route("setuser", function(user) {
  credentials.user = user;
});

app.set("port", port);
app.use(require("express-xml-bodyparser")());
app.use(express.static(__dirname + '/static'));

app.get("/events", function(req, res) {
  res.send(events);
});

var eventreceived = function (event) {
  event.time = new Date();
  events.push(event);
  app.io.broadcast("event", event);
  console.log("broadcasted");
};

app.post("/dr/secure", basicAuth(eventreceived), mo.receivedr(eventreceived));
app.post("/dr", mo.receivedr(eventreceived));

app.post("/mo/secure", basicAuth(eventreceived), mo.receivemo(eventreceived));
app.post("/mo", mo.receivemo(eventreceived));

var server = app.listen(app.get("port"), function() {
  console.log('Listening on port %d', server.address().port);
});