const express = require('express');
const cluster = require('cluster');

if (cluster.isMaster) {
  [...Array(5).keys()].forEach(() => cluster.fork());
} else {

  const app = express();
  app.get('/', (req, res) => res.send('Hello World'));

  app.listen(process.env.PORT);
  console.log('APP is running.Worker %d', cluster.worker.id);
}

cluster.on('exit', (worker) => cluster.fork());
