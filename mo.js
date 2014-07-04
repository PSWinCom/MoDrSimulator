exports.receivemo = function(callback) {
  return function(req, res) {
    callback({ event: 'mo', body: req.body.msglst.msg[0] });
    //res.send("<!DOCTYPE MSGLST SYSTEM \"pswincom_report_response.dtd\">");
    res.send({ MSGLST: { MSG: [ { ID: 1, STATUS: "OK" } ] } });
  }
}

exports.receivedr = function(callback) {
  return function(req, res) {
    callback({ event: 'dr', body: req.body.msglst.msg[0] });
    //res.send("<!DOCTYPE MSGLST SYSTEM \"pswincom_report_response.dtd\">");
    res.send({ MSGLST: { MSG: [ { ID: 1, STATUS: "OK" } ] } });
  }
}

exports.list = function() {
  return JSON.stringify(mos);  
}