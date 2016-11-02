#!/usr/bin/env node
'use strict';
const
    async = require('async'),
    request = require('request'),
    views = require('./lib/view.js');

async.waterfall([
    function(next) {
        request.get('http://localhost:5984/books/_design/books',next);
    },

    function(res,body,next){
        if(res.statusCode === 200){
            next(null,JSON.parse(body));
        }else if(res.statusCode === 404){
            next(null,{views : {}});
        }
    },

    function(doc,next){
        Object.keys(views).forEach(function(name){
            doc.views[name] = views[name];
        });
        request({
            method : 'PUT',
            url : 'http://localhost:5984/books/_design/books',
            json : doc
        },next);
    }
],(err, res, body) => {
    if(err){throw err;}
    console.log(res.statusCode,body);
});