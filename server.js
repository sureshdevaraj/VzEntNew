var builder = require('botbuilder');
var restify = require('restify');

var bot = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});



var dialog = new builder.LuisDialog('https://api.projectoxford.ai/luis/v1/application?id=5fd863f9-149a-476b-b077-af95cb2176de&subscription-key=4a43888f6be54422b9926075e4fb6762');

bot.add('/', dialog);

// insert intent handlers here

var server = restify.createServer();
server.post('/v1/messages', bot.verifyBotFramework(), bot.listen());

server.listen(process.env.port || 8080, function () {
    console.log('%s listening to %s', server.name, server.url);
});