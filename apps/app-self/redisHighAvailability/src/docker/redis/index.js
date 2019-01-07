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
var redisConfigPath = getRedisConfigPath();
var sentinelConfigPath = getSentinelConfigPath();
var express = require("express");
var app = express();
let masterip = "redishapod1-service";
let masterport = "6379";
let redisMasterDbPath = "/usr/share/redis";

//Define request response in root URL (/)
app.get("/", function(req, res) {
  var debugObj = {
    Env: process.env,
    DevVersion: "5",
    HostName: process.env.HOSTNAME
  };
  var result = JSON.stringify(debugObj, null, 4);
  res.send(`<pre>${result}</pre>`);
});

app.listen(port, function() {
  console.log(`Url: http://localhost:${port}`);
});

function setRedisReplicaConfig() {
  let originalRedisConfigPath = getOriginalRedisConfigPath();
  let originalRedisConfig = fs.readFileSync(originalRedisConfigPath, "utf8");

  let newRedisConfig = originalRedisConfig.replace(
    "# replicaof <masterip> <masterport>",
    `replicaof ${masterip} ${masterport}`
  );
  let targetRedisConfigPath = getTargetRedisConfigPath();
  fs.writeFileSync(targetRedisConfigPath, newRedisConfig);
}

// https://redis.io/topics/persistence
function setRedisMasterConfig() {
  let originalRedisConfigPath = getOriginalRedisConfigPath();
  let originalRedisConfig = fs.readFileSync(originalRedisConfigPath, "utf8");

  let newRedisConfig = originalRedisConfig.replace(
    "dir ./",
    `dir ${redisMasterDbPath}`
  );
  newRedisConfig = newRedisConfig.replace(`appendonly no`, `appendonly yes`);
  let targetRedisConfigPath = getTargetRedisConfigPath();
  fs.writeFileSync(targetRedisConfigPath, newRedisConfig);
}
function setSentinelConfig() {
  let originalSentinelConfigPath = getOriginalSentinelConfigPath();
  let originalSentinelConfig = fs.readFileSync(
    originalSentinelConfigPath,
    "utf8"
  );
  let newSentinelConfig = originalSentinelConfig.replace(
    "{master}",
    `${masterip}`
  );
  newSentinelConfig = newSentinelConfig.replace("{port}", `${masterport}`);
  let targetSentinelConfigPath = getTargetSentinelConfigPath();
  fs.writeFileSync(targetSentinelConfigPath, newSentinelConfig);
}
function setServerConfigAndRestart(callback) {
  redisRestart(function(redisRestartResponse) {
    sentinelStart(function(sentinelRestartResponse) {
      sentinelRestartResponse.redisRestartResponse = redisRestartResponse;
      callback(sentinelRestartResponse);
    });
  });
}

function sentinelStart(callback) {
  callback({
    sentinelStart: "Not using HA."
  });
  return;
  setSentinelConfig();
  let targetPath = getTargetSentinelConfigPath();
  executeCommand(`redis-server ${targetPath} --sentinel`, callback);
}
function redisRestart(callback) {
  redisShutDown(function(shutDownResult) {
    redisStart(function(startResult) {
      startResult.shutDownResult = shutDownResult;
      callback(startResult);
    });
  });
}
function redisStart(callback) {
  if (isMaster()) {
    setRedisMasterConfig();
  } else {
    setRedisReplicaConfig();
  }
  let targetPath = getTargetRedisConfigPath();
  executeCommand(`redis-server ${targetPath} --daemonize yes`, callback);
}

function redisShutDown(callback) {
  executeCommand("redis-cli shutdown", callback);
}

function executeCommand(commandText, callback) {
  console.log("executeCommand:", commandText);
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
    callback(resObj);
  });

  dir.on("exit", function(code) {
    resObj.last = "on exit";
    resObj.onExit = true;
  });
  dir.on("close", function(code) {
    resObj.last = "on close";
    resObj.onClose = true;
    if (!resObj.onExit) {
      callback(resObj);
    }
  });
  dir.on("disconnect", function(code) {
    resObj.last = "on disconnect";
    resObj.onDisconnect = true;
    callback(resObj);
  });
  dir.on("message", function(code) {
    resObj.last = "on message";
    resObj.onMessage = true;
    callback(resObj);
  });
}

function isMaster() {
  let isMaster = false;
  if (
    process.env.HOSTNAME &&
    process.env.HOSTNAME.indexOf("redismaster") > -1
  ) {
    isMaster = true;
  }
  return isMaster;
}

function initializeServer() {
  setServerConfigAndRestart(function(responseObject) {
    responseObject.HOSTNAME = process.env.HOSTNAME;
    console.log("initializeRedisClaim:", JSON.stringify(responseObject));
  });
}

initializeServer();

function getRedisConfigPath() {
  if (process.env.USER === "root") {
    return "/home/aozdemir/Documents/Ggg.GitHub/Ggg.Kubernetes/apps/app-self/redisHighAvailability/src/docker/redis/redis.conf";
  } else {
    return "/usr/local/etc/redis/redis.conf";
  }
}

function getSentinelConfigPath() {
  if (process.env.USER === "root") {
    return "/home/aozdemir/Documents/Ggg.GitHub/Ggg.Kubernetes/apps/app-self/redisHighAvailability/src/docker/redis/sentinel.conf";
  } else {
    return "/usr/local/etc/redis/sentinel.conf";
  }
}
function getOriginalRedisConfigPath() {
  if (process.env.USER === "root") {
    return redisConfigPath;
  } else {
    return redisConfigPath + ".original";
  }
}

function getOriginalSentinelConfigPath() {
  if (process.env.USER === "root") {
    return sentinelConfigPath;
  } else {
    return sentinelConfigPath + ".original";
  }
}
function getTargetRedisConfigPath() {
  if (process.env.USER === "root") {
    return "/home/aozdemir/Documents/Ggg.GitHub/Ggg.Kubernetes/apps/app-self/redisHighAvailability/src/docker/redis/redis2.conf";
  } else {
    return redisConfigPath;
  }
}

function getTargetSentinelConfigPath() {
  if (process.env.USER === "root") {
    return "/home/aozdemir/Documents/Ggg.GitHub/Ggg.Kubernetes/apps/app-self/redisHighAvailability/src/docker/redis/sentinel2.conf";
  } else {
    return sentinelConfigPath;
  }
}
