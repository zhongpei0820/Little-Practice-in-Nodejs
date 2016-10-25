'use strict';
const
	fs = require('fs'),
	net = require('net'),
	filename = process.argv[2],
	server = net.createServer((connection) => {
		console.log('Subscriber connected');
		connection.write(`Now watching '${filename}' for changes...\n`);

		let watcher = fs.watch(filename, () => {
			let date = Date.now();
			connection.write(`File ${filename} changed ${date} \n`);
		});

		connection.on('close',() => {
			console.log('Subscriber disconnected');
			watcher.close();
		});
	});

	if(!filename) throw Error('No target filename was specified');

	server.listen(5432,() => {
		console.log('Listening for subscribers...');
	});