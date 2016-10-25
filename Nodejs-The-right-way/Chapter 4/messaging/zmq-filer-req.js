"use strict";

const
	zmq = require("zmq"),
	filename = process.argv[2],
	requester = zmq.socket('req');

requester.on('message', (data) => {
	let response = JSON.parse(data);
	console.log(`Recieved response :`,response);
});

requester.connect('tcp://127.0.0.1:5555');

console.log(`Sending request for ${filename}`);

requester.send(JSON.stringify({
	path : filename
}));

