'use strict';
const
    file = require('file'),
    rdfParser = require('./lib/rdf-parser.js');

console.log('beginning directory walk');

file.walk(__dirname + '/cache', (err,dirPath,dirs,files) => {
    // console.log(files);
    files.forEach((path) => {
        if(path.slice(path.length - 4) === ".rdf"){
            console.log(path);
        
        
            rdfParser(path,(err,doc) => {
                if(err) throw err;
                else{
                    console.log(doc);
                }
            });
        }
    });
});