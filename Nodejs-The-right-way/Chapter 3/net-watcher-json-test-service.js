'use strict';
const
	net = require('net'),
	server = net.createServer((connection) => {
		console.log('Subscriber connected');

		connection.write('{"type" : "changed" , "file" : "targ');

		let timer = setTimeout(() => {
			connection.write('et.txt" , "timestamp" : 1358175758495}' + '\n');
			connection.write('{"type" : "changed" , "file" : "targ');
		}, 1000);

		let timer2 = setTimeout(() => {
			connection.write('et.txt" , "timestamp" : 1358175758495}' + '\n');
			connection.write('{"type" : "changed" , "file" : "targ' + '\n');
			connection.end();
		}, 3000);

		connection.on('end',() => {
			// clearTimeout(timer);
			clearTimeout(timer2);
			console.log('Subscriber disconnected');
		});
	});

server.listen(5432,function(){
	console.log('Test server listening for subsribers...');
});