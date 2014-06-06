(function($, window, document, undefined) {
    $(function() {

        var $checkboxes = $('#formFields input:checkbox');
        var $selectAll = $('#selectAll');
        var $selectedList = $('#selectedList');

        // sorts checkboxes in alphabetical order
        $('#formFields').html(
            $('#formFields > label').sort(function(a, b) {
                return $(a).text() > $(b).text() ? 1 : -1;
            })
        );

        // toggles all checkbox fields when #selectAll checkbox is clicked
        $selectAll.click(function(event) {
            var selectAllisChecked = this.checked;
            if (selectAllisChecked) {
                $checkboxes.each(function(index, el) {
                    if (!$(this).prop('checked')) {
                        $(this).prop('checked', true);
                        addCheckedList($(el));
                    }
                });
            } else {
                $checkboxes.each(function(index, el) {
                    if ($(this).prop('checked')) {
                        $(this).prop('checked', false);
                        removeCheckedList($(el));
                    }
                });
            }
        });

        // Updates the list of checked checkboxes
        $checkboxes.click(function(event) {
            var $clicked = $(event.target);
            var clickedVal = $clicked.prop('value');
            if ($clicked.prop('checked')) {
                addCheckedList($clicked);
            } else {
                removeCheckedList($clicked);
            }
        });

        //Automatically toggles #selectAll checkbox when all checkboxes are selected or deselected
        $checkboxes.change(function() {
            // select/deselect selectAll checkbox
            var checked = $checkboxes.filter(':checked');
            if (checked.length == $checkboxes.length) {
                $selectAll.prop('checked', true);
            } else if (checked.length == 0) {
                $selectAll.prop('checked', false);
            }
        });

        //on form submission
        $('#cbForm').submit(function(event) {
            event.preventDefault();
            var array = $('#cbForm').serializeArray()
            // console.log(array);

            //if no item is chosen
            if (array.length == 0) {
                errorMessage("Please choose at least one item.");
                return false;
            }

            //if only "Language" is chosen
            if (array.length == 1 && array[0].value == "Language") {
                errorMessage(" Please choose more items!");
                return false;
            }

            var jData = JSON.stringify(array);

            $.ajax({
                url: '/ajax',
                type: 'POST',
                cache: false,
                data: $('#cbForm').serialize(),
            })
                .done(function(data) {
                    //jumps to the result page
                    var query = decodeURIComponent($.param(data));
                    query = query.replace(/\[\]/g, "");
                    window.location.replace("/results?" + query);
                })
                .fail(function() {
                    console.log("error");
                })
                .always(function() {
                    console.log("complete");
                });

        });

        //adds an item from the selected list
        function addCheckedList(selected) {
            var selectedVal = selected.prop('value');
            var $newList = $('<li>').append(selectedVal).attr('id', selectedVal + "Selected").addClass('list-group-item');
            var added = false;
            $('li', $selectedList).each(function(index, el) {
                if (selectedVal < $(el).text()) {
                    $newList.insertBefore($(el)).fadeIn('fast');
                    added = true;
                    return false;
                }
            });
            if (!added) {
                $selectedList.append($newList);
                $newList.fadeIn('fast');
            }
        }

        //removes an item from the selected list
        function removeCheckedList(selected) {
            var selectedVal = selected.prop('value');
            $('#' + selectedVal + "Selected").fadeOut('fast', function() {
                $(this).remove();
            });
        }

        //Displays error message
        function errorMessage(str) {
            $('#alertText').text(str);
            $('#alertBar').fadeIn("slow");
        }




    });
})(window.jQuery, window, document);