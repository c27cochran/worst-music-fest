const express = require('express');
const compression = require('compression');
const events = require('./server/events');
const path = require('path');

const app = express();

app.set('port', process.env.PORT || 3002);

app.use(compression());

app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/public', express.static(path.join(__dirname, '/public')));

// Adding CORS support
app.get('*', (req, res, next) => {
  // Set CORS headers: allow all origins, methods, and headers
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE');
  res.header('Access-Control-Allow-Headers', req.header('access-control-request-headers'));

  if (req.method === 'OPTIONS') {
    // CORS Preflight
    res.send();
  } else {
    next();
  }
});

app.get('/events', events.findAll);
app.post('/events', events.addEvent);
app.get('/events/:id', events.findById);
app.put('/events/:id', events.editById);
app.delete('/events/:id', events.removeEvent);

app.listen(app.get('port'), () => {
  console.log(`Express server listening on port ${app.get('port')}`);
});
