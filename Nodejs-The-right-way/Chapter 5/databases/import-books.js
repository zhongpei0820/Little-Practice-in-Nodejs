'use strict';
const
    async = require('async'),
    file = require('file'),
    rdfParser = require('./lib/rdf-parser.js'),
    request = require('request'),

    worker = async.queue((path,done) => {
        console.log(path);
        rdfParser(path,(err,doc) => {
            request({
                method : 'PUT',
                url : 'http://localhost:5984/books/' + doc._id,
                json : doc
            }, (err,res,body) => {
                if(err) throw Error(err);
                console.log(res.statusCode,body);
                done();
            });
        });
    }, 10);
console.log(`begining directory walk`);
file.walk(__dirname + '/cache', (err,dirPath,dirs,files) => {
    files.forEach((path) => {
        if(path.slice(path.length - 4) === ".rdf"){
            worker.push(path);
        }
    });
});