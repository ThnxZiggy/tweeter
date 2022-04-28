/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

const createTweetElement = function (tweetObj) {
  let $newTweet = $("<article>").addClass("tweet");
  let $tweetContent = `<header>
  <div class="leftside">
  <img class="avatar" src=${tweetObj.user.avatars}> 
  <p class="username">${tweetObj.user.name}</p>
  </div>
  <p class="handle">${tweetObj.user.handle}</p>
  </header>
  <h4>
  <p class="tweet-body">
    ${tweetObj.content.text}
  </p>
  </h4>
  <footer>
  <div class="date-posted">${timeago.format(tweetObj.created_at)}</div>
  <div class="share"> <i>
      <i class="fa-solid fa-heart"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-flag"></i></i>
  </div>
  </footer>`
  $newTweet.append($tweetContent);
  return $newTweet;

};

const $tweet = createTweetElement(tweetData);

$(document).ready(function () {
  $('.tweet-container').append($tweet);
});

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];




const renderTweets = function (data) {

  for (object of data) {
    createTweetElement(object);
  }
}

