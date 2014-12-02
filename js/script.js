$(document).ready ( function () {

	// unselect all checkboxes
	$('.form-group.checkboxes input').prop('checked', false);
	
	clearMessage();
		
	/************************
	* Sorting
	*************************/
	
	var $checkbox_container = $('.form-group.checkboxes');
	var $labels = $('.form-group.checkboxes label');
	
	// crate a clone that will store the sorted elements
	$('body').append ('<div class="hidden clone"></div>');
	var $clone = $('.clone.hidden');
	
	// find all labels
	var labels = new Array ();
	$('.form-group.checkboxes label').each ( function () {
		labels.push ($(this).html().split('>')[1].replace(/\s/g, ""));
	});
	
	// clone the labels array so that we can sort it
	var cloned_labels = cloneArray (labels);
	
	// sort labels
	cloned_labels.sort();
	
	// loop over sorted labels and append the corresponding labels to the hidden element
	for (var i in cloned_labels) {
		var this_label = cloned_labels [i];
		
		var index = labels.indexOf(this_label); 
		
		$clone.append ($labels.eq(index).clone());
	}
	
	$labels.fadeOut (300, function() {
		$labels.remove();
		$checkbox_container.append ($clone.children());
		$clone.remove();
	});
	
	
	
	/**********************
	* Check/uncheck
	***********************/
	
	
	$('#select-all').on ( 'change', function (e) {
		var $this = $(this);
		
		if ($this.prop('checked')) {
			checkAll ();
		}
		
		else {
			uncheckAll ();
		}
		updateFeedback ();
	});
	
	$('body').on ('change', '.form-group.checkboxes input', function (e) {
		var $this = $(this);
		
		checkState();
		updateFeedbackSingle ($this);
	});
	
	// initiate state
	checkState();
	
	/*****************************
	* Submit
	******************************/
	
	var $message = $('.message');
	$('.btn-default').click ( function (e) {
		
		if (inputCheck ()) {
		
		}
		else {
			$message.append('Please choose more items!');
			$('.error-wrapper').fadeIn (300);
			e.preventDefault();
		}
		
	});
	
	$('.btn-reset').click ( function (e) {
		clearMessage ();
		uncheckAll ();
		checkState ();
		updateFeedback ();
	});
	
	$('.close-x').click ( function (e) {
		
		clearMessage ();
		e.preventDefault();
	});
	
	/****************************
	* Results
	*****************************/
	
	if ($('.results').length) {
		var url = window.location;
		var url_query = url.search.substring(1)

		var parameters = url_query.split('&');
		
		var $wrapper = $('.selections-wrapper');
		
		if (url_query == '') {
			$wrapper.append ('<p>Too bad. Nothing was selected.</p>');
			return;
		}
		
		// check if there's anything to display
		if (parameters.length) {
			$wrapper.append ('<ul></ul>');
			
			for (var i in parameters) {
				var this_parameter_array = parameters[i].split ('=');
				var this_parameter_name = decodeURIComponent (this_parameter_array [0]);
				var this_parameter_value = this_parameter_array [1];
			
				$wrapper.find('ul').append ('<li>' + this_parameter_value + '</li>');
			}
		}
		else {
			$wrapper.append ('<p>Too bad. Nothing was selected.</p>');
		}
	}
	
});

function cloneArray (this_array) {

	var clone = new Array();
	
	for (var i in this_array) {
		clone.push (this_array[i]);
	}
	return clone;
}

function clearMessage () {
	$('.error-wrapper').fadeOut (300, function () {
		$('.message').html('<div class="close-x">OK</div>');
	});
}

function checkAll () {
	$('.form-group.checkboxes label input').each ( function () {
		$(this).prop ('checked', true);
	});
}

function uncheckAll () {
	$('.form-group.checkboxes label input').each ( function () {
		$(this).prop ('checked', false);
	});
}

function checkState () {
	var num_checkboxes = $('.form-group.checkboxes label').length;

	var num_checked = $('.form-group.checkboxes input:checked').length;
	
	if (num_checked == num_checkboxes) {
		checkSelectAll ();
	}
	else if (num_checked == 0) {
		uncheckSelectAll ();
	}
	else {
		indeterminateSelectAll ();
	}
}

function indeterminateSelectAll () {
	// Make Select All "indeterminate"
	$("#select-all").prop("indeterminate", true);
}

function checkSelectAll () {
	$("#select-all").prop("indeterminate", false);
	$("#select-all").prop("checked", true);
}

function uncheckSelectAll () {
	$("#select-all").prop("indeterminate", false);
	$("#select-all").prop("checked", false);
}

function inputCheck () {
	var num_checked = $('.form-group.checkboxes input:checked').length;
	
	if (num_checked == 1) {
		if ($('.form-group.checkboxes input:checked').val() == 'Language') return false;
	}

	return true;
	
}

function updateFeedback () {
	var $feedback = $('.feedback .current-selections');
	
	var num_checked = $('.form-group.checkboxes input:checked').length;
	
	if (num_checked == 0) {
		$feedback.hide();
		$feedback.html('');
		$('.feedback-none').show();
		
	}
	else {
		$('.feedback-none').hide();
		$feedback.show(); (300);
		$('.form-group.checkboxes input:checked').each ( function () {
			var label = $(this).parent('label').html().split('>')[1].replace(/\s/g, "");
			checkAppendFeedback (label);				
		});
		
		
	}
}

function updateFeedbackSingle ($input) {
	var $feedback = $('.feedback .current-selections');
	var label = $input.parent('label').html().split('>')[1].replace(/\s/g, "");
	var num_checked = $('.form-group.checkboxes input:checked').length;
	
	if (num_checked == 0) {
		$feedback.fadeOut (300, function () {
			$feedback.html('');
			$('.feedback-none').fadeIn (300);
		});
		
	}
	else {
		if ($input.is(':checked')) {
			$('.feedback-none').hide();
			checkAppendFeedback (label);
			//$feedback.append ('<li>' + label + '</li>');
			$feedback.show ();
		}
		else {
			removeFromFeedback (label);
		}
		

	}
}


function removeFromFeedback (label) {
	var $feedback = $('.feedback .current-selections');
	
	$feedback.find ('li').each ( function () {
		if ($(this).text() == label) $(this).remove();
	});
}

function checkAppendFeedback (label) {
	var $feedback = $('.feedback .current-selections');
	var flag = false;
	
	$feedback.find ('li').each ( function () {
		if ($(this).text() == label) flag = true;
	});
	
	if (!flag) {
		$feedback.append ('<li>' + label + '</li>');
	}	
}