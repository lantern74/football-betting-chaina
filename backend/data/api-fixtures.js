var request = require("request");

var options1 = {
  method: 'GET',
  url: 'https://v3.football.api-sports.io/fixtures/headtohead',
  qs: { h2h: '375-645' },
  headers: {
    'x-rapidapi-host': 'v3.football.api-sports.io',
    'x-rapidapi-key': '43984110ca9979e5fbc3d812d6808265'
  }
};

request(options1, function (error, response, body) {
  if (error) throw new Error(error);

  var data = JSON.parse(body);
  var fixtureId = data.response[0]?.fixture?.id;
  console.log(fixtureId)

  if (!fixtureId) {
    console.error("Fixture ID not found");
    return;
  }

  var options2 = {
    method: 'GET',
    url: 'https://v3.football.api-sports.io/predictions',
    qs: { fixture: fixtureId },
    headers: {
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': '43984110ca9979e5fbc3d812d6808265'
    }
  };

  request(options2, function (error, response, body) {
    if (error) throw new Error(error);

    var data = JSON.parse(body);
    console.log(data.response[0]?.predictions?.percent);
  });
});
