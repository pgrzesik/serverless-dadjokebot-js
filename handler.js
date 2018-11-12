const Twitter = require("twitter");
const axios = require("axios");

const getJoke = async () => {
  const res = await axios({
    url: "https://icanhazdadjoke.com/",
    headers: {
      Accept: "application/json",
      "User-Agent": "https://twitter.com/SnakeTheJoker",
    },
  });
  return res.data.joke;
};

const twitter = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_API_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET_API_KEY,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

module.exports.joke = async (event, context) => {
  const joke = await getJoke();
  await twitter.post("statuses/update", {
    status: joke,
  });
};
