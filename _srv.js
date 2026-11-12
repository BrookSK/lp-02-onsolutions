var http=require('http'),fs=require('fs'),path=require('path');
var T={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'application/javascript','.png':'image/png'};
http.createServer(function(q,r){
  var u=decodeURIComponent(q.url.split('?')[0]),f=path.join(__dirname,u);
  if(fs.existsSync(f)&&fs.statSync(f).isDirectory())f=path.join(f,'index.html');
  fs.readFile(f,function(e,d){if(e){r.writeHead(404);r.end('404');return;}
    r.writeHead(200,{'Content-Type':T[path.extname(f)]||'application/octet-stream'});r.end(d);});
}).listen(8099);
