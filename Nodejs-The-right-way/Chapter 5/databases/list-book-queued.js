'use strict';
const
    async = require('async'),
    file = require('file'),
    rdfParser = require('./lib/rdf-parser.js'),

    worker = async.queue((path,done) => {
        console.log(path);
        rdfParser(path,(err,doc) => {
            console.log(doc);
            done();
        });
    }, 1000);
console.log(`begining directory walk`);
file.walk(__dirname + '/cache', (err,dirPath,dirs,files) => {
    files.forEach((path) => {
        if(path.slice(path.length - 4) === ".rdf"){
            worker.push(path);
        }
    });
});