$(document).ready(function () {
  let characterCount = 140;

  //take input in tweet field and change counter color if more than 140 characters are written
  $("#tweet-text").on("input", function () {
    let count = $(this).val().length;
    let counter = characterCount - count;
    if (counter < 0) {
      $(".counter").val(counter).css({
        color: "red",
      });
    } else {
      $(".counter").val(counter).css({
        color: "#545149",
      });
    }
  });
});
