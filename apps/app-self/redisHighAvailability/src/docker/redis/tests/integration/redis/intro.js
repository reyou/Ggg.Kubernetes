// redisDemo.js
console.log("Running redis test.");
var redis = require("redis");
var client = redis.createClient(); // this creates a new client
let port = "6379";
let host = "127.0.0.1";
var client = redis.createClient(port, host);
client.on("connect", function() {
  console.log("Redis client connected");
});
client.on("error", function(err) {
  console.log("Something went wrong " + err);
});
client.set("test", "qqq", redis.print);
client.get("test", function(error, result) {
  if (error) {
    console.log(error);
    throw error;
  }
  console.log("GET result ->" + result);
});
