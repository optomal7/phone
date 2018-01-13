var express = require('express');
var router = express.Router();
var accountSid = 'ACb40d3b9b432b6b576d445ec137002ee4'; // Your Account SID from www.twilio.com/console
var authToken = '7cdda3b8cff79fc06d77cf7d7ce361d9';   // Your Auth Token from www.twilio.com/console
var countries = require('country-data').countries;
//const client = require('twilio')(accountSid, authToken);

var twilio = require('twilio');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
var client = new twilio(accountSid, authToken);

let todo = ['Complete this objective.'];
let command;
let list;

router.get('/', function(req, res, next) {
  console.log( 'stop that' );

});

router.post('/', function(req, res, next) {
  //console.log(req.body.FromCountry);
  let country =  countries[req.body.FromCountry].name;
  //console.log(country, req.body)
  command = req.body.Body.slice(0, req.body.Body.indexOf(' '));
  if (req.body.Body.indexOf(' ') == -1) {
		command = req.body.Body;
	}

	console.log('command program actually sees --->', command.toLowerCase());
	console.log('where it came from ############>', req.body.Body);
	console.log('value of req.body.Body.indexOf(" "):', req.body.Body.indexOf(' '));
	if (command.toLowerCase() == 'add') {
		todo.push(req.body.Body.slice(req.body.Body.indexOf(' ') + 1, req.body.Body.length))
		console.log('>>>>>>>>', todo)
		const twiml = new MessagingResponse();
		twiml.message('generic add message');
		res.writeHead(200, {'Content-Type': 'text/xml', 'statusCallback' : 'http://2997e116.ngrok.io/status'});
		res.end(twiml.toString());
	} else if (command.toLowerCase() == 'list') {
    console.log('>>>>>>>>', todo)
		list = '';
    for (let i = 0; i < todo.length; i++) {
			list += (i + 1) + ' ' + todo[i] + ', '
		}
		const twiml = new MessagingResponse();
		twiml.message(list)
		res.writeHead(200, {'Content-Type': 'text/xml'});
		console.log(res)
		res.end(twiml.toString());
	} else if (command.toLowerCase() == 'remove') {
		let toRemove = parseInt(req.body.Body.slice(req.body.Body.indexOf(' ') + 1, req.body.Body.length)) - 1
		console.log('index of the thing we are removing from todo arrray', toRemove)
		todo.splice(toRemove, 1);
		console.log(todo)
		client.messages
			.create({
				body: "Hail, it is done",
				to: req.body.From,
				from: req.body.To,
				statusCallback: 'http://2997e116.ngrok.io/status',
			})
	} else if (command.toLowerCase() == 'roll') {
			let dieToRoll = parseInt(req.body.Body.slice(req.body.Body.indexOf(' ') + 1, req.body.Body.length))
			let result = Math.floor(Math.random() * dieToRoll) + 1;

			const twiml = new MessagingResponse();
			twiml.message('Your d' + dieToRoll + ' clatters to the table. It settles into place and reveals a ' + result);
			res.writeHead(200, {'Content-Type': 'text/xml'});
			res.end(twiml.toString());
	} else {
		  const twiml = new MessagingResponse();
		  twiml.message('system not configured to accept that command')
		  res.writeHead(200, {'Content-Type': 'text/xml'});
		  res.end(twiml.toString());
	}



  /*client.messages.create({
    body:  'Hi! It looks like your phone number was born in ' + countryreq.body.FromCountry,
    to: req.body.From,
    from: req.body.To
  })
  .then((message) => console.log(message.sid));*/
});

module.exports = router;
