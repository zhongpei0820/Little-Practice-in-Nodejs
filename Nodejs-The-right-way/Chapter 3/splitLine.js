'use strict';

let buffer = '';

exports.splitLine = function(data){
	let res = [];
	buffer += data;
	let boundary = buffer.indexOf('\n');
	while(boundary !== -1){
		let input = buffer.substring(0,boundary);
		res.push(input);
		buffer = buffer.substring(boundary + 1);
		boundary = buffer.indexOf('\n');
	}
	return res;
}	





