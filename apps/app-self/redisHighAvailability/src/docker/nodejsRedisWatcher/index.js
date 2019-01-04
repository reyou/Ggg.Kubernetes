/*
* https://expressjs.com/en/api.html
*/
const fs = require('fs');
var port = 80;
var sharePath = "/usr/share/redis";
var express = require('express')
var app = express()

//Define request response in root URL (/)
app.get('/', function (req, res) {  
  var debugObj = {
    "DevVersion": "1",
    "Env": process.env,
    "HostName": process.env.HOSTNAME,
    "RedisClaimPath": getRedisClaimPath(),
    "RedisFileExists": isClaimed(),
    "RedisClaims": getRedisClaims()
  }
  var result= JSON.stringify(debugObj, null, 4);
  res.send(`<pre>${result}</pre>`)
})

app.get('/claim', function (req, res) {  
   initializeRedisClaim();
   res.send(`<pre>Claim created.</pre>`)
})

app.get('/delete', function (req, res) {  
   deleteAllClaims();
   res.send(`<pre>All claims deleted.</pre>`)
})

app.listen(port, function () {
  console.log(`Url: http://localhost:${port}`)
})

function deleteAllClaims(){
  let claims = getRedisClaims();
  for(var i=0; i < claims.length; i++){
    let claim = sharePath +"/"+ claims[i];
    fs.unlinkSync(claim);
  }
}

function initializeRedisClaim(){
  createClaimFile();
}
function createClaimFile(){
  var filePath = getRedisClaimPath();
  var redisClaim= {
    hostname: process.env.HOSTNAME
  }
  fs.writeFileSync(filePath, JSON.stringify(redisClaim));
  console.log(`Redis claim created at ${filePath}`);
}
function getRedisClaimPath(){
  return sharePath + "/" + process.env.HOSTNAME + ".json";
}
function isClaimed(){
 var claimPath= getRedisClaimPath();
 return fs.existsSync(claimPath);
}
function getRedisClaims(){
 var claims= fs.readdirSync(sharePath);
 return claims;
}
initializeRedisClaim();