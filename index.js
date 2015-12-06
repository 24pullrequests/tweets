var EventSource = require('eventsource');
var Twitter = require('twitter');

var es = new EventSource('https://tf-firehose.herokuapp.com/events');

var client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

es.on('pullRequest', function(e) {
  var pr = JSON.parse(e.data)
  var status = pr.user.nickname + " just opened a pull request to " + pr.repo_name + ": " + pr.issue_url
  client.post('statuses/update', {status: status}, function(error, tweet, response){
    if (!error) {
      console.log(tweet);
    } else {
      console.log(error);
    };
  });
});
