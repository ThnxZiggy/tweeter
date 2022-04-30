/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//HTML safe function
const safeHTML = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweetObj) {
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
    ${safeHTML(tweetObj.content.text)}
  </p>
  </h4>
  <footer>
  <div class="date-posted">${timeago.format(tweetObj.created_at)}</div>
  <div class="share">
      <i class="fa-solid fa-heart"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-flag"></i>
  </div>
  </footer>`;
  $newTweet.prepend($tweetContent);
  return $newTweet;
};

const renderTweets = function(data) {
  let renderTweet = null;
  for (object of data) {
    // loop through all elements of array
    renderTweet = createTweetElement(object); // generate tweet container on each element
    $(".tweet-container").prepend(renderTweet); // append each element to the tweet-container section on the webpage
  }
  return renderTweet;
};

const loadTweets = function() {
  $.ajax({
    type: "GET",
    url: "/tweets",
  }).then(function(ziggy) {
    $(".tweet-container").empty();
    $(".tweet-container").prepend(renderTweets(ziggy));
  });
};

//generate page
$(document).ready(function() {
  loadTweets();
  //hide error message
  $("#error-Msg").hide();
  $("#form").submit(function(event) {
    event.preventDefault();
    const characCounter = $("#tweet-text").val();
    //tweet validation
    if (characCounter === "") {
      $("#error-Msg")
        .text("🚨🚨🚨Cannot🚨tweet🚨empty🚨string🚨🚨🚨")
        .slideDown();
    } else if (characCounter.length > 140) {
      $("#error-Msg").text("🚨🚨🚨Tweet🚨is🚨too🚨long🚨🚨🚨").slideDown();
      return false;
    }
    //store tweet as a string
    let dataString = $(this).serialize();
    //sending tweet data to /tweets object
    $.ajax({
      type: "POST",
      url: "/tweets",
      data: dataString,
      success: { success: "this is working now" },
    })

      .then(function() {
        $("#error-Msg").slideUp(); //removing error msg (if applicable)
        $(".text-box").val("").empty(); //reset box and counter
        $(".counter").val(140).trigger("reset");
        loadTweets(); //generate tweet
      })
      .catch((error) => {
        console.log("this is the error: ", error);
      });
  });

  return false;
});
