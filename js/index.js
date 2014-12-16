"use strict"

$(document).ready(function() {
    
	$('#main').change(function() {
	    
	    if ($(this).is(':checked')) {
	    $('input[name="fields"]:checkbox').attr('checked', true);        
	        
	    } else {
	               
	        $('input[name="fields"]:checkbox').attr('checked', false);
	    }
	});
    
        
$('input[name="fields"]:checkbox').change(function() {
    var chkLength = $('input[name="fields"]:checkbox').length;
    var checkedLen = $('input[name="fields"]:checkbox:checked').length;    
    if (chkLength == checkedLen) {
        $('#main').attr('checked', true);
    } else {
        $('#main').attr('checked', false);
    }
});


$('#submit').on("click",function(){

	var abstract = document.getElementById("Abstract");
	var Publication = document.getElementById("Publication");
	var Inventor = document.getElementById("Inventor");
	var Language = document.getElementById("Language");
	var Source = document.getElementById("Source");
	var Priority = document.getElementById("Priority");


	if (Language.checked == true &&
	    document.getElementById("main").checked == false && 
	    abstract.checked == false &&
	    Publication.checked == false &&
	    Inventor.checked == false &&
	    Source.checked == false &&
	    Priority.checked == false)
	{
		alert("ERROR-- Please choose more items!");

	}

	else if (
		//document.getElementById("lang").checked == true ||
	    document.getElementById("main").checked == true || 
	    abstract.checked == true  ||
	    Publication.checked == true  ||
	    Inventor.checked == true  ||
	    Source.checked == true  ||
	    Priority.checked == true )
	{ 
		
		alert("success");
		document.getElementById("contacts").action = "results.html";
	
    }

//-----------------------------------------------------------------------------------
    		var d=document;
			var contacts = d.getElementById('contacts');

			//submit event registration
			
			    var count = 0;
			    var contactArray = inputsToArray(contacts.children);
			    var data = serializeArray(contactArray, '');
			    console.log(data);
			   localStorage.setItem("count",data);
			   
		

			function inputsToArray (inputs) {
			    var arr = [];
			    for (var i = 0; i < inputs.length; i++) {
			        if (inputs[i].checked)
			            arr.push(inputs[i].value);
			    }
			    return arr;
			}

			    
			function serializeArray (array, name) {
			    var serialized = '';

			    for(var i = 0, j = array.length; i < j; i++) {
			         if(i>0) serialized += ''+"<br/>";

                      serialized += name + '' + array[i];
			    }
			    return serialized;
			}
//--------------------------------------------------------------------------------------







});


});