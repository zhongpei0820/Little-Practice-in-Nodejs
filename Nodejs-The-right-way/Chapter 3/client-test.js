'use strict';
const
	dh = require('./client.js'),
	dataHandler = dh.create();
	
dataHandler.on('message' , (message) => {
	if(message.type === 'watching'){
		console.log(`Now watching : ${message.file}`);
	}else if(message.type === 'changed'){
		console.log(`File ${message.file} changed at ${new Date(message.timestamp)}`);
	}else{
		throw Error(`Unrecognized message type ${message.type}`);
	}
});

dataHandler.on('error',(err) => {
	console.log(err);
});

dataHandler.appendData('{"type" : "changed" , "file" : "targ' + '\n',this);
// dataHandler.appendData('et.txt" , "timestamp" : 1358175758495}' + '\n');