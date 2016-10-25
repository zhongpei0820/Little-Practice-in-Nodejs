"use strict";

const
	fs = require("fs"),
	zmq = require("zmq"),

	responder = zmq.socket('rep');

responder.on('message', (data) => {
	let request = JSON.parse(data);
	console.log(`Recieved request to get ${request.path}`);

	fs.readFile(request.path,(err,content) =>{
		if(err){
			console.log('')
		}
		console.log('Sending response message ...');
		responder.send(JSON.stringify({
			content : content.toString(),
			timestamp : Date().now,
			pid : process.pid
		}));
	});
});

responder.bind("tcp://127.0.0.1:5432", (err) => {
	console.log(`Listening for request...`);
});
console.log(responder);

process.on('SIGNT', () => {
	console.log(`Shuting down...`);
	responder.close();
});