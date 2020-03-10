const http = require('http');
const mongoose = require('mongoose');
const model = require('./model.js'); 



http.createServer(function (req, res) {

	if(req.url.substring(0, 10) == '/tramvaie/'){
		if(req.url == '/tramvaie/' && req.method == "GET"){	
			model.Tramvaie.find({}, function (err, tramvaie) {
				res.writeHead(200, {'Content-Type': 'application/json'});
				te = []
				tramvaie.forEach( function(ti, index) {
					te.push({numar: ti.numar, traseu: ti.traseu})
				});
				res.write(JSON.stringify(te))
				res.end();
			})
		}
		else{
			if((req.url.split('/').length == 4) && (req.url.split('/')[3] == '') && (! isNaN(req.url.split('/')[2]))){
				if(req.method == 'GET'){
					model.Tramvaie.findOne({numar: parseInt(req.url.split('/')[2])}, function (err, tramvai) {
						res.writeHead(200, {'Content-Type': 'application/json'});
						res.write(JSON.stringify({traseu: tramvai.traseu}))
						res.end();
					})
				}
				else{
					if(req.method == "POST"){
						var body = '';

				        req.on('data', function (data) {
				            body += data;

				            // Too much POST data, kill the connection!
				            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
				            if (body.length > 1e6)
				                req.connection.destroy();
				        });

				        req.on('end', function () {
							model.Tramvaie.count({numar: parseInt(JSON.parse(body).numar)}, function (err, count) {
								if(count > 0){
									res.writeHead(409);
									res.end();
								}
								else{
									model.Tramvaie.create({
									numar: JSON.parse(body).numar,
									traseu:JSON.parse(body).traseu
									},
									function (err, ti){
										if (err){
											res.writeHead(500, {'Content-Type': 'text/plain'});
											res.write("Server error")
											res.end();}
										else{
											res.writeHead(201);
											res.end();
										}
									})
								}
							})
				        })
					}
					else{
						if(req.method == "PUT"){
							var body = '';

					        req.on('data', function (data) {
					            body += data;

					            // Too much POST data, kill the connection!
					            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
					            if (body.length > 1e6)
					                req.connection.destroy();
					        });

					        req.on('end', function () {
								model.Tramvaie.count({numar: JSON.parse(body).numar, traseu:JSON.parse(body).traseu}, function (err, count) {
									if(count > 0){
										res.writeHead(409);
										res.end();
									}
									else{
										model.Tramvaie.count({numar: JSON.parse(body).numar}, function (err, count) {
											if(count == 0){
												res.writeHead(404, {'Content-Type': 'text/plain'});
												res.write("Not found")
												res.end();
											}
											else{
												model.Tramvaie.findOneAndUpdate({numar: JSON.parse(body).numar},
													{$set: {traseu:JSON.parse(body).traseu}},
													function(err, doc){
														if(err){
															res.writeHead(500, {'Content-Type': 'text/plain'});
															res.write("Server error")
															res.end();
														}
														else{
															res.writeHead(200, {'Content-Type': 'application/json'});
															res.write(JSON.stringify({numar: JSON.parse(body).numar, 
																traseu:JSON.parse(body).traseu}))
															res.end();
														}
													}
												);
											}
										})
									}
								})
					        })
						}
						else{
							if(req.method == "DELETE"){
								model.Tramvaie.find({numar: parseInt(req.url.split('/')[2])}).remove().exec(function(err, data) {
									if(data.deletedCount == 0){
										res.writeHead(404, {'Content-Type': 'text/plain'});
										res.write("Not found")
										res.end();
									}
									else{
										res.writeHead(204);
										res.end();
									}
								})
							}
							else{
								res.writeHead(501, {'Content-Type': 'text/plain'});
								res.write("Not implemented")
								res.end();
							}
						}
					}
				}
			}
			else{
				res.writeHead(404, {'Content-Type': 'text/plain'});
				res.write("Not found")
				res.end();
			}
		}

	}
	else{
		if(req.url.substring(0, 10) == '/autobuze/'){
			if(req.url == '/autobuze/' && req.method == "GET"){
				model.Autobuze.find({}, function (err, autobuze) {
					res.writeHead(200, {'Content-Type': 'application/json'});
					ae = []
					autobuze.forEach( function(az, index) {
						ae.push({numar: az.numar, traseu: az.traseu})
					});
					res.write(JSON.stringify(ae))
					res.end();
				})
			}
			else{
				if((req.url.split('/').length == 4) && (req.url.split('/')[3] == '') && (! isNaN(req.url.split('/')[2]))){
					if(req.method == 'GET'){
						model.Autobuze.findOne({numar: parseInt(req.url.split('/')[2])}, function (err, autobuz) {
							res.writeHead(200, {'Content-Type': 'application/json'});
							res.write(JSON.stringify({traseu: autobuz.traseu}))
							res.end();
						})
					}
					else{
						if(req.method == "POST"){
							var body = '';

					        req.on('data', function (data) {
					            body += data;

					            // Too much POST data, kill the connection!
					            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
					            if (body.length > 1e6)
					                req.connection.destroy();
					        });

					        req.on('end', function () {
								model.Autobuze.count({numar: parseInt(JSON.parse(body).numar)}, function (err, count) {
									if(count > 0){
										res.writeHead(409);
										res.end();
									}
									else{
										model.Autobuze.create({
										numar: JSON.parse(body).numar,
										traseu:JSON.parse(body).traseu
										},
										function (err, az){
											if (err){
												res.writeHead(500, {'Content-Type': 'text/plain'});
												res.write("Server error")
												res.end();}
											else{
												res.writeHead(201);
												res.end();
											}
										})
									}
								})
					        })						
					    }
						else{
							if(req.method == "PUT"){
								var body = '';

						        req.on('data', function (data) {
						            body += data;

						            // Too much POST data, kill the connection!
						            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
						            if (body.length > 1e6)
						                req.connection.destroy();
						        });

						        req.on('end', function () {
									model.Autobuze.count({numar: JSON.parse(body).numar, traseu:JSON.parse(body).traseu}, function (err, count) {
										if(count > 0){
											res.writeHead(409);
											res.end();
										}
										else{
											model.Autobuze.count({numar: JSON.parse(body).numar}, function (err, count) {
												if(count == 0){
													res.writeHead(404, {'Content-Type': 'text/plain'});
													res.write("Not found")
													res.end();
												}
												else{
													model.Autobuze.findOneAndUpdate({numar: JSON.parse(body).numar},
														{$set: {traseu:JSON.parse(body).traseu}},
														function(err, doc){
															if(err){
																res.writeHead(500, {'Content-Type': 'text/plain'});
																res.write("Server error")
																res.end();
															}
															else{
																res.writeHead(200, {'Content-Type': 'application/json'});
																res.write(JSON.stringify({numar: JSON.parse(body).numar, 
																	traseu:JSON.parse(body).traseu}))
																res.end();
															}
														}
													);
												}
											})
										}
									})
						        })
							}
							else{
								if(req.method == "DELETE"){
									model.Autobuze.find({numar: parseInt(req.url.split('/')[2])}).remove().exec(function(err, data) {
										if(data.deletedCount == 0){
											res.writeHead(404, {'Content-Type': 'text/plain'});
											res.write("Not found")
											res.end();
										}
										else{
											res.writeHead(204);
											res.end();
										}
									})
								}
								else{
									res.writeHead(501, {'Content-Type': 'text/plain'});
									res.write("Not implemented")
									res.end();
								}
							}
						}
					}
				}
				else{
					res.writeHead(404, {'Content-Type': 'text/plain'});
					res.write("Not found")
					res.end();
				}
			}

		}
		else{
			res.writeHead(404, {'Content-Type': 'text/plain'});
			res.write("Not found")
			res.end();
		}
	}
	

}).listen(8080);