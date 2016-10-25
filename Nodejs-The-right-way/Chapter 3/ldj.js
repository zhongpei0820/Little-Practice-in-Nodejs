'use strict';
const
	events = require('events'),
	util = require('util'),
	// dh = require('./client.js'),
	// dataHandler = dh.create(),
	splitLine = require('./splitLine.js'),
	parseJSON = require('./parseJSON.js').parseJSON,
	spliter = splitLine.create(),

	LDJClient = function(stream){
		events.EventEmitter.call(this);

		let
			self = this;
			// buffer = '';
		stream.on('data', (data) => {
			// buffer += data;
			let newLine = spliter.splitLine(data);
			if(newLine != '') {
				let message = parseJSON(newLine);	
				self.emit('message', message);
			}
			// console.log();
			// buffer += data;
			// let boundary = buffer.indexOf('\n');
			// while(boundary !== -1){
			// 	let input = buffer.substring(0,boundary);
			// 	buffer = buffer.substring(boundary + 1);
			// 	self.emit('message',JSON.parse(input));
			// 	boundary = buffer.indexOf('\n');
			// }
			// let message = dataHandler.appendData(data);
			// if(message !== '') self.emit('message',message);
		});
	}

util.inherits(LDJClient,events.EventEmitter);

exports.LDJClient = LDJClient;
exports.connect = function(stream){
	return new LDJClient(stream);
}