/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//HTML safe function
const safeHTML = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

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
    ${safeHTML(tweetObj.content.text)}
  </p>
  </h4>
  <footer>
  <div class="date-posted">${timeago.format(tweetObj.created_at)}</div>
  <div class="share"> <i>
      <i class="fa-solid fa-heart"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-flag"></i></i>
  </div>
  </footer>`;
  $newTweet.prepend($tweetContent);
  return $newTweet;
};

const renderTweets = function (data) {
  let renderTweet = null;
  for (object of data) {
    // loop through all elements of array
    renderTweet = createTweetElement(object); // generate tweet container on each element
    $(".tweet-container").prepend(renderTweet); // append each element to the tweet-container section on the webpage
  }
  return renderTweet;
};

$(document).ready(function () {
  loadTweets();
  $("#form").submit(function (event) {
    const $plainText = $(this).children('div:first-child').children('textarea')
    const characCounter = $plainText.val();
    if (characCounter.length > 140 || characCounter === '') {
      return alert('text too long or no text')
    } 
    event.preventDefault();
    let dataString = $(this).serialize();

    $.ajax({
      type: "POST",
      url: "/tweets",
      data: dataString,
      success: {success: "this is working now"},
    })
      .then(function () {
        // location.reload();
        //dont use .reload instead research jquery.load()
        // $('.tweet-container').empty();
        loadTweets();
      })
      .catch((error) => {
        console.log('this is the error: ', error);
      });
  });
  return false;
});

const loadTweets = function () {
  $.ajax({
    type: "GET",
    url: "/tweets",
  }).then(function (ziggy) {
    $('.tweet-container').empty();
    $(".tweet-container").prepend(renderTweets(ziggy));
    $('.text-box').val('').empty();
    $('.counter').val(140).trigger("reset");
  });
};

// if ( $( "input" ).first().val()) {
//   $( "span" ).text( "Validated..." ).show();
//   return;
// }

// $( "span2" ).text( "Not valid!" ).show().fadeOut( 3000 );
