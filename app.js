var https = require('https'); // https server module
var url = require('url');
var fs = require('fs'); //file reading, writing, module
var path = require("path");
var ent = require('ent'); // Blocks HTML characters

//for https (key and certificate)
var hskey = fs.readFileSync('key.pem');
var hscert = fs.readFileSync('cert.pem');
var options = {
	key: hskey,
	cert: hscert,
	NPNProtocols: ['http/2.0', 'spdy', 'http/1.1', 'http/1.0'],
};

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 1200
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '10.14.0.233'

var myApp = https.createServer(options, handleRequest);

myApp.listen(server_port, server_ip_address, function() {
	console.log("Listening on " + server_ip_address + ", server_port " + server_port);
});

function handleRequest(request, response) {
	console.log('Path Hit: ' + request.url);
	if (request.url === '/') {
		fs.readFile(__dirname + '/index.html', function(err, data) {
		if (err) {
			response.writeHead(500);
			return response.end('Error loading index.html');
		}
		response.writeHead(200);
		response.end(data);
		});
	}else {
		fs.readFile(__dirname + request.url, function(err, data) {
			if (err) {
				response.writeHead(500);
				return response.end('Error in loading page');
			}
			response.writeHead(200);
			response.end(data);
		});
	}
};

var io = require('socket.io')(myApp); // use socket.io

io.sockets.on('connection', function(socket, username) {
	socket.on('new_client', function(username) {
		username = ent.encode(username);
		socket.username = username;
		socket.broadcast.emit('new_client', username);
	});

	socket.on('message', function(message) {
		message = ent.encode(message);
		socket.broadcast.emit('message', {
			username: socket.username,
			message: message
		});
	});

	socket.on('video call', function(data) {
    /*console.log("video call type: ");
		console.log(data.type);
		console.log("candidate: ");
		console.log(data.candidate);
		console.log("description: ");
		console.log(data.description);*/
		socket.broadcast.emit('video call', data);
	});
});
