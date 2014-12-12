function submit() {
  if( validate() === false ) return false;
  return true;
};
  
function validate() {
  if( $("#checkboxList input:checked").size() === 1 && $("#checkboxList input[value='Language']").prop("checked") )
  {
    $(".form-error").show();
    return false;
  }
  $(".form-error").hide();
  return true;
};

function updateSelectedList() {
  var html = "";
  var ct = 0;
  
  $("#checkboxList input:checked").each( function() {
    html += "<li>" + $(this).val() + "</li>";
    ct++;
  });  
  
  $("#selectedList").html(html);
  $("#selectedCount").html(ct);
}
  
function selectAll() {
  $("#checkboxList input").each( function() {
    $(this).prop("checked", $("#selectAll").prop("checked"));
  });
  updateSelectedList();
}


function selectIndividual () {
  var elem = document.getElementById('selectAll');
  var listlen = $("#checkboxList input:checked").size();
  $("#selectAll").prop("checked",false);
  elem.indeterminate = false;
  if( listlen === 6 )
  {
    $("#selectAll").prop("checked",true);
  }
  else if( listlen !== 0 )
  {
    elem.indeterminate = true;
  }
  
  updateSelectedList();
}


$(document).ready( function() {
  $("#selectAll").on("change",selectAll);
  $("#checkboxList input").on("change",selectIndividual);
  $("#fieldsForm").on("submit",submit);
  selectIndividual();
});
