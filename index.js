var http = require('http');
http.createServer(function(req,res){
  var header=req.headers['authorization']||'',        // get the header
      token=header.split(/\s+/).pop()||'',            // and the encoded auth token
      auth=new Buffer(token, 'base64').toString(),    // convert from base64
      parts=auth.split(/:/),                          // split on colon
      username=parts[0],
      password=parts[1];

  console.log(req.headers);

  console.log('username is "'+username+'" and password is "'+password+'"');
  res.writeHead(200,{'Content-Type':'text/xml'});
  res.end('<?xml version="1.0"?> \
<!DOCTYPE MSGLST SYSTEM "pswincom_receive_response.dtd"> \
<MSGLST> \
  <MSG> \
    <ID>1</ID> \
    <STATUS>OK</STATUS> \
  </MSG> \
</MSGLST>');

}).listen(process.env.PORT || 1337,'127.0.0.1');