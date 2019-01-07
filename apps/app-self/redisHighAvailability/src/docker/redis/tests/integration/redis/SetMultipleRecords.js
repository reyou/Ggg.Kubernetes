// redisDemo.js
console.log("Running redis test.");
var redis = require("redis");
var client = redis.createClient(); // this creates a new client
let port = "6379";
let host = "10.152.183.95";
let recordCount = 100000;
var client = redis.createClient(port, host);
client.on("connect", function() {
  console.log("Redis client connected");
});
client.on("error", function(err) {
  console.log("Something went wrong " + err);
});
for (let i = 0; i < recordCount; i++) {
  let key = `test${i}`;
  let value = `http://www.webmd.com?test=${i}`;
  client.set(key, value, redis.print);
  console.log(`Redis Set: ${key}: ${value}`);
}
client.get("test", function(error, result) {
  if (error) {
    console.log(error);
    throw error;
  }
  console.log("GET result ->" + result);
});
