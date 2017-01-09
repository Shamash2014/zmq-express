const express = require('express');
const cluster = require('cluster');
const { eventStore } = require('./eventStore.js');
const { context } = require('./context.js');

if (cluster.isMaster) {
  [...Array(5).keys()].forEach(() => cluster.fork());
} else {
  const app = express();
  app.get('/', (req, res) => {
    eventStore(req.body);

    // This step could be moved to different worker || cluster
    // Also, if response is taking too long, we should immediatly react
    let data = { event: 'START', data: 'Hello World' };
    const response = context(data.event, data.data);
    return res.send(response);
  });

  app.listen(process.env.PORT);
}

cluster.on('exit', (worker) => cluster.fork());
