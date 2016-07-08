var redis = require("redis"),
    client = redis.createClient();
//authentication
client.auth('123456',function(){
	console.log("authentication successed!");
});

client.on("error", function (err) {
    console.log("Error " + err);
});
//monitor mode allows client see all the action on redis server including actions from other clients
client.monitor(function (err, res) {
    console.log("Entering monitoring mode.");
});
client.on("monitor", function (time, args, raw_reply) {
    console.log(time + ": " + args); // 1458910076.446514:['set', 'foo', 'bar']
});