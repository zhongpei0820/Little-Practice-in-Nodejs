'use strict';
const
    cluster = require('cluster'),
    fs = require('fs'),
    zmq = require('zmq');

if(cluster.isMaster) {
    // master process

    let
        router = zmq.socket('router').bind('tcp://127.0.0.1:5555'),
        dealer = zmq.socket('dealer').bind('ipc://filer-dealer.ipc');

    router.on('message', function(){
        console.log('router on messge');
        let frames = Array.prototype.slice.call(arguments)
        dealer.send(frames);
    });

    dealer.on('message', function(){
        console.log('dealer on message');
        let frames = Array.prototype.slice.call(arguments)
        router.send(frames);
    });

    cluster.on('online', (worker) => {
        console.log('Worker ' + worker.process.pid + ' is online');
    });

    cluster.on('exit',(code,signal) => {
        if(signal){
            console.log(`Worker has killed by signal : ${signal}`);
        } else if(code !== 0){
            console.log(`Worker exited  with error code : ${code}`);
        }
        cluster.fork();
    });

    for(let i = 0; i < 3 ; i++){
        cluster.fork();
    }

} else {

    let responder = zmq.socket('rep').connect('ipc://filer-dealer.ipc');

    responder.on('message', (data) => {
        let request = JSON.parse(data);
        console.log(process.pid + ' received request for: ' + request.path);

        fs.readFile(request.path, (err, data) => {
            console.log(process.pid + ' sending response');
            responder.send(JSON.stringify(
                {
                    pid: process.pid,
                    data: data.toString(),
                    timestamp: Date.now()
                }
            ))
        });
    });
}