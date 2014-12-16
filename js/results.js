// "use strict"

// function getParameters(){
// 	var index = document.URL.indexOf('?');
// 	var params = new Array();
// 		if (index != -1) {
// 		var pairs = document.URL.substring(index+1, document.URL.length).split('&');
// 			for (var i=0; i<pairs.length; i++){
// 			paramName = pairs[i].split('=');
// 			params[paramName[0]] = paramName[1];
// 			}

// 		}
// 	return params;

// }

// params = getParameters();
// yourtext = unescape(params["yourtext"]);
// document.write("Your Text = " + yourtext + "<br>");
// fields = unescape(params["fields"]);
// document.write("check box selected is = " + fields + "<br>");


// "use strict"

// var allVals = [];
// $(function() {

// 	  $('#myForm .btn btn-default').click(function() { 
//            allVals = []
//            alert("hello button");

//             $('#myForm :checked').each(function() {
//             allVals.push($(this).val());
//             });
//              alert("Values " + allVals);

//              $.ajax({  
//              type: "POST",  
//              url: "file:///C:/sg/web/TestMe_lite/results.html",  
//              data: "allVals=" + allVals,  
//              success: function(response){  
//                  $('#info').html("OK! Data [" + allVals + "] Sent with Response:" + response);  
//              },  
//              error: function(e){  
//                  $('#info').html("selected Data[" + allVals +"] Not sent with Error:" + e);
//              }  
//          });
        
//       });


// });
