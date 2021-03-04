var linebot = require('linebot');
var express = require('express');
const GphApiClient = require("giphy-js-sdk-core");
const giphy = GphApiClient("QTT424cEg6KX2IOv1KJ6mCKnTWOmTMhI");

var bot = linebot({
  channelId: "1655718134",
  channelSecret: "481b0e9de7669b34cd70d321f85cedbf",
  channelAccessToken: "x4b/37bMUW0JwD8WrGR4u0cCaNI2dmAVXhJMAcYS6ZKnpTNPShbDq9q4OIpR+usVt0gh9XQyCjdv0N1VSU9HfbnfrWfe30fng4jKQ5TKElugD4VDAYX+YbgX6FGOy5G+2IX3QGAqjoSpAW2kIJDzKQdB04t89/1O/w1cDnyilFU=",
});

bot.on("message", function (event) {
  if ((event.message.type = "text")) {
    var msg = event.message.text;
    if (msg.startsWith("!img")) {
      const content = encodeURI(msg.replace("!img ", "")) || "fail";
      giphy.search("gifs", { q: content }).then((res) => {
        const { length } = res.data;
        const index = Math.floor(Math.random() * length) + 1;
        const { url, mp4 } = res.data[index].images.fixed_height;
        console.log(url);
        console.log(mp4);
        const imgObj = { type: "video", originalContentUrl: mp4, previewImageUrl: url };
        event.reply(imgObj)
      });
    }
    
  }
});

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log("App now running on port", port);
});
