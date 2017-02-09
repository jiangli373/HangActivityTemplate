'use strict';

const mysql = require('mysql');
const config = require('../config');

function handleError (err) {
	let connection = mysql.createPool(config.mysql);
	return connection;
}

module.exports = handleError();
