function getFields() {
  var params = [];
  var query = window.location.search.substr(1);
  if( !query ) return params;
  
  var qs = query.split('&');
  for( var i in qs )
  {
    params.push( qs[i].substr(7) );
  }
  return params;
}

$(document).ready( function() {
  var sel = getFields();
  var results = "";
  for( var i in sel )
  {
    results += "<li>" + sel[i] + "</li>";
  }
  $("#resultsList").append(results);
});
