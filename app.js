'use strict';

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const log4js = require('log4js');
log4js.configure('./logconfig/log4js.json');
const logger = log4js.getLogger("app");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const routes = require('./routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(log4js.connectLogger(logger,{format:':remote-addr - -' +
' ":method :url HTTP/:http-version"' +
' :status :content-length ":referrer"' +
' ":user-agent" :response-timems'}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('hangdali'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);


app.use(function(err, req, res, next) {
	let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

	if(err.status==404){
		logger.error(ip+'--'+decodeURIComponent(req.originalUrl),404);
	}else{
		logger.error(ip+'--'+decodeURIComponent(req.originalUrl),err.stack);
	}
	res.status(err.status || 500);
	res.redirect('focusus.html');
});


module.exports = app;
