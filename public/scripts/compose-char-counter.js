
$(document).ready(function () {
  let characterCount = 140;
  $('#tweet-text').on('input',function() {
    let count = $(this).val().length;
    let counter = characterCount - count;
    if (counter < 0) {
      $('.counter').val(counter).css({
        color: 'red'
      })
    } else {
    $('.counter').val(counter).css({
      color: '#545149'
    })
    }
  });  
});
