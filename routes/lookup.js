var express = require('express');
var router = express.Router();
var accountSid = 'ACb40d3b9b432b6b576d445ec137002ee4'; // Your Account SID from www.twilio.com/console
var authToken = '7cdda3b8cff79fc06d77cf7d7ce361d9';   // Your Auth Token from www.twilio.com/console

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
