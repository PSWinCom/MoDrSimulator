var mos = [];

exports.receive = function(req, res) {
  mos.push(req.body.msglst.msg[0]);
  res.send({ });
}

exports.list = function() {
  return JSON.stringify(mos);  
}