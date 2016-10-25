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
			console.log(`File ${request.path} not found!`);
			responder.send(JSON.stringify({
				err : `File ${request.path} not found!`
			}));
		}else{
			console.log('Sending response message ...');
			responder.send(JSON.stringify({
				content : content.toString(),
				timestamp : Date().now,
				pid : process.pid
			}));
		}
		
	});
});

responder.bind("tcp://127.0.0.1:5555", (err) => {
	console.log(`Listening for request...`);
});


process.on("uncaughtException", () => {
	console.log(`Shuting down...`);
	responder.close();
});