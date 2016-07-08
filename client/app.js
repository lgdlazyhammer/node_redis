var redis = require("redis"),
    client = redis.createClient();
	
//authentication
client.auth('123456',function(){
	console.log("authentication successed!");
});
// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });
client.select(1,function(){
	console.log("select redis db 1 successfully.");
});
client.on("error", function (err) {
    console.log("Error " + err);
});

client.set("username", "peter", redis.print);
client.get("username", function(err, reply) {
    // reply is null when the key is missing
    console.log(reply);
});
client.get("notexist name", function(err, reply) {
    // reply is null when the key is missing
    console.log(reply);
});
/*
    Calling unref() will allow this program to exit immediately after the get command finishes. Otherwise the client would hang as long as the client-server connection is alive.
*/
//client.unref();

client.hset("hash key", "hashtest 1", "some value", redis.print);
client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
client.hkeys("hash key", function (err, replies) {
    console.log(replies.length + " replies:");
    replies.forEach(function (reply, i) {
        console.log("    " + i + ": " + reply);
    });
});

client.hmset(["key", "test keys 1", "test val 1", "test keys 2", "test val 2"], function (err, res) {});
// Works the same as
client.hmset("key", ["test keys 2", "test val 1", "test keys 2", "test val 2"], function (err, res) {});
// Or
client.hmset("key", "test keys 3", "test val 1", "test keys 2", "test val 2", function (err, res) {});
//display
client.hkeys("key", function (err, replies) {
    console.log(replies.length + " replies:");
    replies.forEach(function (reply, i) {
		console.log(JSON.stringify(reply));
        console.log("    " + i + ": " + reply);
    });
});

client.HMSET('hashkey', {
    "0123456789": "abcdefghij", // NOTE: key and value will be coerced to strings
    "some manner of key": "a type of value"
});

//display
client.hkeys("hashkey", function (err, replies) {
    console.log(replies.length + " replies:");
    replies.forEach(function (reply, i) {
		console.log(JSON.stringify(reply));
        console.log("    " + i + ": " + reply);
    });
});
client.hgetall("hashkey", function (err, obj) {
    console.dir(obj);
});

client.quit();