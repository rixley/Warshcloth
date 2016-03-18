var express = require('express');
var app = express();
var taskRouter = require('./server/api/task').taskRouter;
var NeDBTaskRepo = require('./server/repo/NeDBTaskRepo');
var config = { autoload: true };
var repo = new NeDBTaskRepo(config);
var bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use('/api', taskRouter(repo));

app.listen(3000);
