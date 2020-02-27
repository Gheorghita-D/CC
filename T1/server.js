var http = require('http');
var fs = require('fs')
var url = require('url');
var request = require('request').defaults({ followRedirect : false, encoding : null });

http.createServer(function (req, res) {
	if(req.url == '/'){
		res.writeHead(200, {'Content-Type': 'text/html'});
		html = fs.readFileSync('./index.html')
		res.write(html)
		res.end();
	}
	else{
		if(req.url == '/logs/'){
				fs.readFile('logs.txt', 'utf8', function(err, data) {
			  if (err) throw err;
			  console.log('OK: ');
			  console.log(data)
			});		}
	}
}).listen(8080);