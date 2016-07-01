var express = require('express');
var port = process.env.PORT || 1337;;
var bodyparser = require('body-parser');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

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

io.on('connection', function(socket) {
  console.log('socket.io.connection');
  socket.on("events:clear", function(req) {
    console.log("events:clear");
    events = [];
    socket.broadcast.emit("events:refresh");
  });
  socket.on("setpw", function(password) {
    credentials.password = password;
  });
  socket.on("setuser", function(user) {
    credentials.user = user;
  });
})


app.set("port", port);
app.use(function(req, res, next){
  console.log('%s %s', req.method, req.url);
  next();
});
app.use(bodyparser.json());
app.use(bodyparser.urlencoded());
app.use(require("express-xml-bodyparser")({ explicitArray: false }));
app.use(express.static(__dirname + '/dist/static'));

app.get("/events", function(req, res) {
  res.send(events);
});

var eventreceived = function (event) {
  event.time = new Date();
  events.push(event);
  io.emit("event", event);
  console.log("broadcasted");
};

app.post("/dr/secure", basicAuth(eventreceived), mo.receive("dr", eventreceived));
app.post("/dr", mo.receive("dr", eventreceived));

app.post("/mo/secure", basicAuth(eventreceived), mo.receive("mo", eventreceived));
app.post("/mo", mo.receive("mo", eventreceived));

app.get("/mo/secure", basicAuth(eventreceived), mo.receive("mo", eventreceived));
app.get("/mo", mo.receive("mo", eventreceived));


app.post("/stats", function(req, res) {
  console.log(req.body);
  eventreceived({ event: "stats", body: req.body });
  res.send(200);
});

server.listen(app.get("port"), function() {
  console.log('Listening on port %d', server.address().port);
});