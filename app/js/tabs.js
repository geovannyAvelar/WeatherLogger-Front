$(document).ready(function() {

  $(".tabs .indicator").css('background-color', 'grey');

  $('.tab').click(function() {
    $(".tabs .indicator").css('background-color', $(this).data('color'));
  });

});
