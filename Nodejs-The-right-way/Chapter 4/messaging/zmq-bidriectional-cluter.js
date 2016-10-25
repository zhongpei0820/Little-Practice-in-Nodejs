'use strict';
const
	cluster = require('cluster'),
	zmq = require('zmq');
	

if(cluster.isMaster){
	let
		pusher = zmq.socket('push').bind('ipc://file-pusher.ipc'),
		puller = zmq.socket('pull').bind('ipc://file-puller.ipc'),
		ready_worker = 0;

	puller.on('message' , (message) => {
		let data = JSON.parse(message);
		if(data.type === 'ready'){
			console.log(`${++ready_worker} workers are ready`);
			if(ready_worker == 3){
				console.log(`Sending jobs..`);
				for(let i = 0; i < 30; i++){
					pusher.send(JSON.stringify({
						job : "This is a job"
					}));
				}	
			}
		}
		if(data.type === 'result') console.log(data);
	});

	cluster.on('online', (worker) => {
		console.log(`Worker ${worker.process.pid} is online`);	
	});

	for(let i = 0; i < 3; i++){
		cluster.fork();
	}

}else{
	let
		pusher = zmq.socket('push').connect('ipc://file-puller.ipc'),
		puller = zmq.socket('pull').connect('ipc://file-pusher.ipc');


	puller.on('message', (message) => {
		console.log(JSON.parse(message));
		pusher.send(JSON.stringify({
			type : 'result',
			pid  : process.pid,
			result : 'Job finishied'
		}));
	});

	pusher.send(JSON.stringify({
		type : 'ready'
	}));

}