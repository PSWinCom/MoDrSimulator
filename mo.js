exports.receive = function(type, callback) {
  return function(req, res) {
    console.log(req.body);

    if (req.get('Content-Type') == 'application/xml') {
      var xml2js = require('xml2js');
      var builder = new xml2js.Builder();
      res.set('Content-Type', 'application/xml');
      res.send(builder.buildObject({ MSGLST: { MSG: [ { ID: 1, STATUS: "OK" } ] } }));
      callback({ 
        event: type, 
        body: req.body.MSGLST.MSG[0] || req.body.MSGLST.MSG,
        'content-type': req.get("Content-Type")
      });
    } else if (req.get('Content-Type') == "text/xml") {
      // SOAP
      var xml2js = require('xml2js');
      var builder = new xml2js.Builder();
      res.set('Content-Type', 'text/xml');
      req.send(builder.buildObject({ "soap:envelope": { }}));
      callback({ 
        event: type, 
        body: req.body,
        'content-type': req.get("Content-Type")
      });
    } else {
      res.set('Content-Type', 'text/plain');
      res.send("0\nOK\n");
      callback({ 
        event: type, 
        body: req.body, 
        'content-type': req.get("Content-Type") 
      });
    }
  }
};

exports.list = function() {
  return JSON.stringify(mos);  
}