var request = require("request");

var options = {
  method: 'GET',
  url: 'https://v3.football.api-sports.io/fixtures/players',
  qs: {fixture: '169080'},
  headers: {
    'x-rapidapi-host': 'v3.football.api-sports.io',
    'x-rapidapi-key': '43984110ca9979e5fbc3d812d6808265'
  }
};

request(options, function (error, response, body) {
	if (error) throw new Error(error);
    var data = JSON.parse(body)

	console.log(data.response);
});