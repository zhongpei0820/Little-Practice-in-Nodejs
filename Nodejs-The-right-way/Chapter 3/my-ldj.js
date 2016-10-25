'use strict';
const
	events = require('events'),
	util = require('util'),
	spliter = require('./splitLine.js'),
	pJ = require('./parseJSON.js'),

	LDJClient = function(stream){
		events.EventEmitter.call(this);
		let self = this;
		stream.on('data', (data) => {
			let newLine = spliter.splitLine(data);
			if(newLine != '') {
				let message = pJ.parseJSON(newLine);	
				self.emit('message', message);
			}
		});
	}

util.inherits(LDJClient,events.EventEmitter);

exports.LDJClient = LDJClient;
exports.connect = function(stream){
	return new LDJClient(stream);
}