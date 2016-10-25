'use strict';
const
	net = require('net'),
	ldj = require('./my-ldj.js'),
	netClient = net.connect({port : 5432}),
	ldjClient = new ldj(netClient);

ldjClient.on('message',(message) => {
	if(message.type === 'watching'){
		console.log(`Now watching : ${message.file}`);
	}else if(message.type === 'changed'){
		console.log(`File ${message.filename} changed at ${new Date(message.timestamp)}`);
	}else{
		console.log(message);
	}
});