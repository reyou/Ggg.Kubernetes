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
var redisConfigPath = getRedisConfigPath();
var sentinelConfigPath = getSentinelConfigPath();
var express = require("express");
var app = express();

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

//Define request response in root URL (/)
app.get("/", function(req, res) {
  var debugObj = {
    Env: process.env,
    DevVersion: "4",
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
  executeCommand(`redis-server ${redisConfigPath}`, function(callback) {
    onRedisReload(req, res, callback);
  });
});

function onRedisReload(req, res, responseObject) {
  res.send(JSON.stringify(responseObject));
}

app.get("/replicaof", function(req, res) {
  // # replicaof <masterip> <masterport>
  setServerAsReplica(function(responseObject) {
    onRedisRestart(req, res, responseObject);
  });
});

function setRedisReplicaConfig() {
  let originalRedisConfigPath = getOriginalRedisConfigPath();
  let originalRedisConfig = fs.readFileSync(originalRedisConfigPath, "utf8");
  let masterip = "redishapod1-service";
  let masterport = "6379";
  let newRedisConfig = originalRedisConfig.replace(
    "# replicaof <masterip> <masterport>",
    `replicaof ${masterip} ${masterport}`
  );
  let targetRedisConfigPath = getTargetRedisConfigPath();
  fs.writeFileSync(targetRedisConfigPath, newRedisConfig);
}
function setSentinelConfig() {
  let originalSentinelConfigPath = getOriginalSentinelConfigPath();
  let originalSentinelConfig = fs.readFileSync(
    originalSentinelConfigPath,
    "utf8"
  );
  let masterip = "redishapod1-service";
  let masterport = "6379";
  let newSentinelConfig = originalSentinelConfig.replace(
    "{master}",
    `${masterip}`
  );
  newSentinelConfig = newSentinelConfig.replace("{port}", `${masterport}`);
  let targetSentinelConfigPath = getTargetSentinelConfigPath();
  fs.writeFileSync(targetSentinelConfigPath, newSentinelConfig);
}
function setServerAsReplica(callback) {
  redisRestart(function(redisRestartResponse) {
    sentinelStart(function(sentinelRestartResponse) {
      sentinelRestartResponse.redisRestartResponse = redisRestartResponse;
      callback(sentinelRestartResponse);
    });
  });
}
function onRedisRestart(req, res, responseObject) {
  res.send("<pre>" + JSON.stringify(responseObject, null, 4) + "</pre>");
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
  setRedisReplicaConfig();
  let targetPath = getTargetRedisConfigPath();
  executeCommand(`redis-server ${targetPath} --daemonize yes`, callback);
}
function redisShutDown(callback) {
  executeCommand("redis-cli shutdown", callback);
}
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
  if (process.env.HOSTNAME != "redishapod1") {
    setServerAsReplica(function(responseObject) {
      responseObject.HOSTNAME = process.env.HOSTNAME;
      console.log("initializeRedisClaim:", JSON.stringify(responseObject));
    });
  } else {
    sentinelStart(function(responseObject) {
      responseObject.HOSTNAME = process.env.HOSTNAME;
      console.log("initializeRedisClaim:", JSON.stringify(responseObject));
    });
  }
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
