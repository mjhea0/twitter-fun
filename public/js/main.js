$(function() {

  // variables
  var source = $("#search-results").html();
  var dataTemplate = Handlebars.compile(source);
  $results = $('#results')

  // events
  $("#search").on("click",function(e) {
    e.preventDefault();
    console.log($("input").val())
    var parameters = { search: $("input").val() };
    $.get('/searching',parameters, function(data) {
      if (data instanceof Object) {
        $results.html(dataTemplate({resultsObject:data}));
        console.log(data)
      } else {
        $results.html(data);
        console.log(data)
      };
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
