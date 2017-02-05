$(document).ready(function() {

  $(".tabs .indicator").css('background-color', 'orange');

  $('.tab').click(function() {
    $(".tabs .indicator").css('background-color', $(this).data('color'));
  });

});
