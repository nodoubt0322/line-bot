var linebot = require('linebot');
var express = require('express');

var bot = linebot({
  channelId: 1655718134,
  channelSecret: "481b0e9de7669b34cd70d321f85cedbf",
  channelAccessToken: "x4b/37bMUW0JwD8WrGR4u0cCaNI2dmAVXhJMAcYS6ZKnpTNPShbDq9q4OIpR+usVt0gh9XQyCjdv0N1VSU9HfbnfrWfe30fng4jKQ5TKElugD4VDAYX+YbgX6FGOy5G+2IX3QGAqjoSpAW2kIJDzKQdB04t89/1O/w1cDnyilFU=",
});

bot.on('message', function(event) {
  console.log(event); //把收到訊息的 event 印出來看看
});

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log("App now running on port", port);
});