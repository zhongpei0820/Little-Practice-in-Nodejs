const 
	fs = require('fs'),
	filename = '123.txt';


fs.access(filename, fs.constants.R_OK ,(err) => {
	if(err){
		console.log(`Cannot read ${filename} file`);
	}else{
		fs.watch('target.txt', () => {
			let fileExist = true;
			fs.access('target.txt', fs.constants.R_OK,(err) => {
				if(err){
					fileExist = false;
					console.log("File has been removed!");
				} 
			});
			if(!fileExist) return;
			console.log(`File ${filename} just changed!`);
		});
		console.log(`Now watching ${filename} for changes...`);
	}	
});



