$(function() {
  $("#search").on("click",function(e) {
    e.preventDefault();
    console.log($("input").val())
    var parameters = { search: $("input").val() };
    $.get('/searching',parameters, function(data) {
      $('#results').html(data);
      $("#results").show();
      $(':input').val('');
      $("#yay").hide();
      $("#again").show();
    });
  });
  $("#again").on("click",function(e) {
    e.preventDefault()
    $("#yay").show();   
    $("#again").hide();
    $("#results").hide();
  });
});
