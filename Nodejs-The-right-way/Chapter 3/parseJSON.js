'use strict';

exports.parseJSON = function(data){
	let res = [];
	for(let i = 0; i < data.length; i++){
		try{
			res.push(JSON.parse(data[i]));
		}catch(e){
			res.push(`Invalid JSON Format : ${data[i]}`);
		}
	}
	return res;
}
