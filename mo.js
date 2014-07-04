exports.receive = function(type, callback) {
  return function(req, res) {
    console.log(req.body);
    callback({ event: type, body: req.body.MSGLST.MSG[0] || req.body.MSGLST.MSG });
    res.send({ MSGLST: { MSG: [ { ID: 1, STATUS: "OK" } ] } });
  }
};

exports.list = function() {
  return JSON.stringify(mos);  
}