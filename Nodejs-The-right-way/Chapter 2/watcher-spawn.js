"use strict"
const
	fs = require('fs'),
	spawn = require('child_process').spawn,
	filename = process.argv[2],
	command = process.argv.slice(3);

if(!filename){
	throw Error("A file to watch must be specified!");
}

fs.watch(filename,function(){
	let ls = spawn('ls',command.concat(filename));
	ls.stdout.pipe(process.stdout);

});

console.log("Now Watching "+filename+" for changes...");