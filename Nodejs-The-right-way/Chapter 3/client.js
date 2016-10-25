'use strict';
const
	events = require('events'),
	util = require('util'),
	dataHandler = function(){
	events.EventEmitter.call(this);
	let
		buffer = '',
		self = this;

	this.appendData = function(data){
		buffer += data;
		buffer.substring(1,1);
		let boundary = buffer.indexOf('\n');
		let res = '';
		while(boundary !== -1){
			let input = buffer.substring(0,boundary);
			buffer = buffer.substring(boundary + 1);
			try{
				res = JSON.parse(input);
			}catch(e){
				res = 'Invalid JSON Format';
			}
			boundary = buffer.indexOf('\n');
		}
		return res;
	}
};

util.inherits(dataHandler,events.EventEmitter);
exports.dataHandler = dataHandler;
exports.create = function(){
	return new dataHandler();
}
