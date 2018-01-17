var express = require('express');
var router = express.Router();
var accountSid = process.env.ACCOUNT_SID; // Your Account SID from www.twilio.com/console
var authToken = process.env.AUTH_TOKEN;   // Your Auth Token from www.twilio.com/console

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Please specify /:number');
});

router.get('/:num', function(req, res, next) {
	console.log(typeof req.params.num)
	const client = require('twilio')(accountSid, authToken);

    client.lookups.v1
      .phoneNumbers(req.params.num)
      .fetch({ countryCode: 'US', type: 'carrier' })
      .then(number => console.log(/*number.carrier.type, number.carrier.name*/number.carrier.type, number.carrier.name));
	//res.send('status looked up')
});

module.exports = router;
