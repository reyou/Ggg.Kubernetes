/*
 * http://localhost
 * https://launchpad.net/~chris-lea/+archive/ubuntu/redis-server
 * https://expressjs.com/en/api.html
 * https://stackoverflow.com/questions/37732331/execute-bash-command-in-node-js-and-get-exit-code
 * https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback
 * https://github.com/reyou/Ggg.Redis/wiki/redis-cli
 * https://github.com/reyou/Ggg.Redis/wiki/$-redis-server
 */
var exec = require("child_process").exec;
const fs = require("fs");
var port = 80;
var sharePath = "/usr/share/redis";
var redisConfigPath = "/usr/local/etc/redis/redis.conf";
var redisConfigPath = "/usr/local/etc/redis/sentinel.conf";
var express = require("express");
var app = express();

//Define request response in root URL (/)
app.get("/", function(req, res) {
  var debugObj = {
    Env: process.env,
    DevVersion: "3",
    HostName: process.env.HOSTNAME,
    RedisClaimPath: getRedisClaimPath(),
    RedisFileExists: isClaimed(),
    RedisClaims: getAllClaims()
  };
  var result = JSON.stringify(debugObj, null, 4);
  res.send(`<pre>${result}</pre>`);
});

app.get("/claim", function(req, res) {
  initializeRedisClaim();
  res.send(`<pre>Claim created.</pre>`);
});

app.get("/reload", function(req, res) {
  executeCommand(`redis-server ${redisConfigPath}`, req, res);
});

function getAllClaimPaths() {
  let claims = getRedisClaimFileNames();
  let claimPaths = [];
  for (var i = 0; i < claims.length; i++) {
    let claimPath = sharePath + "/" + claims[i];
    claimPaths.push(claimPath);
  }
  return claimPaths;
}
function getAllClaims() {
  var claimPaths = getAllClaimPaths();
  var claims = [];
  for (var i = 0; i < claimPaths.length; i++) {
    let claimPath = claimPaths[i];
    let claimString = fs.readFileSync(claimPath);
    let claimObject = JSON.parse(claimString);
    claims.push(claimObject);
  }
  return claims;
}
app.get("/join", function(req, res) {
  // get all claims
  var allClaims = getAllClaims();
  // check master
  // claim as master
  // claim as replica
  redisShutDown(req, res);
  res.send(`<pre>Joined.</pre>`);
});

function redisShutDown(req, res) {
  executeCommand("redis-cli shutdown", req, res);
}

function executeCommand(commandText, req, res) {
  var resObj = {};
  var dir = exec(commandText, function(error, stdout, stderr) {
    resObj.onExit = false;
    resObj.commandText = commandText;
    resObj.stdout = stdout;
    resObj.stderr = stderr;
    if (error) {
      resObj.last = "generic error";
      resObj.errorCode = error.code;
    }
  });
  dir.on("error", function(code) {
    resObj.last = "on error";
    resObj.onError = true;
    console.log(JSON.stringify(resObj));
    res.send(JSON.stringify(resObj));
  });

  dir.on("exit", function(code) {
    resObj.last = "on exit";
    resObj.onExit = true;
    console.log(JSON.stringify(resObj));
    // res.send(JSON.stringify(resObj));
  });
  dir.on("close", function(code) {
    resObj.last = "on close";
    resObj.onClose = true;
    if (!resObj.onExit) {
      console.log(JSON.stringify(resObj));
      res.send(JSON.stringify(resObj));
    }
  });
  dir.on("disconnect", function(code) {
    resObj.last = "on disconnect";
    resObj.onDisconnect = true;
    console.log(JSON.stringify(resObj));
    res.send(JSON.stringify(resObj));
  });
  dir.on("message", function(code) {
    resObj.last = "on message";
    resObj.onMessage = true;
    console.log(JSON.stringify(resObj));
    res.send(JSON.stringify(resObj));
  });
}

app.get("/delete", function(req, res) {
  deleteAllClaims();
  res.send(`<pre>All claims deleted.</pre>`);
});

app.listen(port, function() {
  console.log(`Url: http://localhost:${port}`);
});

function deleteAllClaims() {
  let claims = getRedisClaimFileNames();
  for (var i = 0; i < claims.length; i++) {
    let claim = sharePath + "/" + claims[i];
    fs.unlinkSync(claim);
  }
}

function initializeRedisClaim() {
  createClaimFile();
}
function createClaimFile() {
  var filePath = getRedisClaimPath();
  var redisClaim = {
    hostname: process.env.HOSTNAME,
    servicename: process.env.HOSTNAME + "-" + "service"
  };
  fs.writeFileSync(filePath, JSON.stringify(redisClaim));
  console.log(`Redis claim created at ${filePath}`);
}
function getRedisClaimPath() {
  return sharePath + "/" + process.env.HOSTNAME + ".json";
}
function isClaimed() {
  var claimPath = getRedisClaimPath();
  return fs.existsSync(claimPath);
}
function getRedisClaimFileNames() {
  var claims = fs.readdirSync(sharePath);
  return claims;
}
initializeRedisClaim();
