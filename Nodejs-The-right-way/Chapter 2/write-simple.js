const fs = require('fs');
fs.writeFile('target.txt','new message',function(err){
	if(err) {
		throw err;
	}
	console.log('File saved!');
})