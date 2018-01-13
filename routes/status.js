var express = require('express');
var router = express.Router();
var accountSid = 'ACb40d3b9b432b6b576d445ec137002ee4'; // Your Account SID from www.twilio.com/console
var authToken = '7cdda3b8cff79fc06d77cf7d7ce361d9';   // Your Auth Token from www.twilio.com/console
const client = require('twilio')(accountSid, authToken);

/* GET home page. */
router.post('/', function(req, res, next) {
	client.messages(req.body.MessageSid)
  .fetch()
  .then((message) => console.log(message));
});

module.exports = router;
