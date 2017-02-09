/**
 * Created by jiangli on 16/6/28.
 * redis
 */
'use strict';
const redis = require("redis"),
    client = redis.createClient('6379', '127.0.0.1');

client.on("error", function (err) {
    console.log("Error " + err);
});

module.exports = client;