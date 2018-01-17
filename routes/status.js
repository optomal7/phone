var express = require('express');
var router = express.Router();
var accountSid = process.env.ACCOUNT_SID; // Your Account SID from www.twilio.com/console
var authToken = process.env.AUTH_TOKEN;   // Your Auth Token from www.twilio.com/console
const client = require('twilio')(accountSid, authToken);

/* GET home page. */
router.post('/', function(req, res, next) {
	client.messages(req.body.MessageSid)
  .fetch()
  .then((message) => console.log(message));
});

module.exports = router;
