'use strict';
// const
//     async = require('async'),
//     request = require('request'),
//     views = require('./lib/view.js');
// let doc = {views : {}};
// doc.views.name = '1';
// doc.name = 'doc';
// console.log(doc);

//     console.log(Object.keys(views).forEach((name) => {
//         console.log(views[name]);
//     }));


let test = function(){
    // console.log(this);
    let test2 = () =>{
        console.log(this);
    }
}
test.test2;
        // Object.key(views).forEach(function(name){
        //     doc.views[name] = views[name];
        // });
    //     request({
    //         method : 'PUT',
    //         url : 'http://localhost:5984/books/_design/books',
    //         json : doc
    //     },next);
    // 