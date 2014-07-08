exports.receive = function(type, callback) {
  return function(req, res) {
    console.log(req.body);
    callback({ event: type, body: req.body.MSGLST.MSG[0] || req.body.MSGLST.MSG });

    var xml2js = require('xml2js');
    var builder = new xml2js.Builder();
    res.set('Content-Type', 'application/xml');
    res.send(builder.buildObject({ MSGLST: { MSG: [ { ID: 1, STATUS: "OK" } ] } }));
  }
};

exports.list = function() {
  return JSON.stringify(mos);  
}