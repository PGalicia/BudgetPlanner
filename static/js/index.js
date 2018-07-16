$(document).ready(function() {

    // Update the item list
    $.fn.updateItemList = function(list){

        // Clear the content
        $(this).empty();

        var result = $(this);
        for(var i = 0; i < list.length; i++) {

            var id = list[i][0];
            var name = list[i][1];
            var priority = list[i][2];
            var price = list[i][3];
            var allocated_money = list[i][4];

            // Add each item
            result.append("<div class='row item'></div>");
            var row = $(".item").last();

            row.html("<div class='priority'>" + priority + "</div>");
            row.append("<div class='col-5 name-col'>" + name + "</div>");
            row.append("<div class='id d-none'>" + id + "</div>");
            row.append("<div class='price'>" + allocated_money + "/" + price + "</div>");
            row.append("<button type='button' class='btn btn-primary edit-item' data-toggle='modal' data-target='#itemModal'>Edit</button>");
            row.append("<button type='button' class='btn btn-danger delete'>Delete</button>");
        }

        return result;
    };

    // Check if a string is empty
    function isEmpty(value) {
        return (value == "") ? true : false;
    };

    // Checks if any of the radio button is pressed
    function isChecked(name) {
        return $("input:radio[name = '" + name + "']").is(":checked");
    };

    // Reset the modal functionality
    function resetModal() {
        $(".label-priority").addClass("d-none");
        $("#new-priority").addClass("d-none");
        $(".label-price").addClass("d-none");
        $("#new-price").addClass("d-none");
        $(".label-name").addClass("d-none");
        $("#new-name").addClass("d-none");
        $(".label-total").addClass("d-none");
        $("#new-total").addClass("d-none");
        $(".label-percentage").addClass("d-none");
        $("#new-percentage").addClass("d-none");
    }

    // Reset Alert Box
    function updateAlertBoxColor(color) {
        // Reset alert box color
        if($(".alert").hasClass("alert-success")) { $(".alert").removeClass("alert-success") };
        if($(".alert").hasClass("alert-danger")) { $(".alert").removeClass("alert-danger") };

        // Add the right alert box color
        if(color) {
            $(".alert").addClass("alert-success");
        } else {
            $(".alert").addClass("alert-danger");
        }
    }

    // Close Alert Box
    $(".alert").on("click", ".close", function() {

        $(".alert-information").hide();

    });

    // Ensures that users can only input valid float
    $('#price').maskMoney();
    $('#new-price').maskMoney();
    $('#new-total').maskMoney();

    // Add Item
    $("#add").click(function() {

        var name = $("#name").val();
        var priority = $("#priority").val();
        var price = $("#price").val();

        // Checks if the user inputs a valid item priority
        if(isEmpty(priority)) {
            // Change the alert box to RED
            updateAlertBoxColor(false);

            // Update the message
            $(".alert-information span").text("Input a valid priority number (0 - 9)");

            // Display the alert box
            $(".alert-information").show();

            return;
        }

        // Checks if the user inputs a valid item name
        if(isEmpty(name)) {
            // Change the alert box to RED
            updateAlertBoxColor(false);

            // Update the message
            $(".alert-information span").text("Please enter an item name");

            // Display the alert box
            $(".alert-information").show();

            return;
        }

        // Checks if the user inputs a valid item price
        if(isEmpty(price)) {
            // Change the alert box to RED
            updateAlertBoxColor(false);

            // Update the message
            $(".alert-information span").text("Please input the item price");

            // Display the alert box
            $(".alert-information").show();

            return;
        }

        // If there's no error, the information given will be stored in the server
        $.ajax({
            data : {
                name : name,
                priority : priority,
                price : price,
                money : 0
            },
            type : "POST",
            url :  "/add"
        })
        .done(function(data) {
            // Update the item list
            $(".item-wrapper").updateItemList(data.allItems);

            // Change the alert box to based on the status of the action - success = green | failure = red
            updateAlertBoxColor(data.color);

            // Set the status message
            $(".alert-information span").text(data.message);

            // Display the alert box
            $(".alert-information").show();
        });

    });

    // Delete Item
    $(".item-wrapper").on("click", ".delete", function() {
        var id = $(this).siblings(".id").html();
        $.ajax({
            data : { id : id },
            type : "POST",
            url : "/delete"
        })
        .done(function(data) {
            // Update the item list
            $(".item-wrapper").updateItemList(data.allItems);

            // Change the alert box to based on the status of the action - success = green | failure = red
            updateAlertBoxColor(data.color);

            // Set the status message
            $(".alert-information span").text(data.message);

            // Display the alert box
            $(".alert-information").show();
        });
    });

    // Open item modal
    $(".item-wrapper").on("click", ".edit-item", function() {
        var id = $(this).siblings(".id").html();
        $.ajax({
            data : {},
            type : "POST",
            url : "/modal/" + id
        })
        .done(function(data) {
            // Set the modal name to the item name
            $(".item-title").text(data.name);

            // Set the modal id to the item id
            $(".item-id").text(data.id);
        });
    });

    // Category - Open the right input field for the selected radio button
    $("input[name='category']").change(function () {

        // Reset each item modal and display the correct input field
        var category = $(this).val();
        if(category === "name") {
            resetModal();
            $(".label-name").removeClass("d-none");
            $("#new-name").removeClass("d-none");
        } else if (category === "priority") {
            resetModal();
            $(".label-priority").removeClass("d-none");
            $("#new-priority").removeClass("d-none");
        } else if (category === "price") {
            resetModal();
            $(".label-price").removeClass("d-none");
            $("#new-price").removeClass("d-none");
        }

    });

    // Update item
    $(".modal-footer").on("click", ".apply", function() {
        var id = $(".item-id").html();
        var category = $("input[name='category']:checked").val();
        var value = "";

        // Check if any of the radio button is checked
        if(!isChecked("category")) {
            // Change the alert box to RED
            updateAlertBoxColor(false);

            // Update the message
            $(".alert-information span").text("Please select which attribute you would like to edit");

            // Display the alert box
            $(".alert-information").show();
            return;
        }

        // Get the new value
        value = $("#new-" + category).val();

        // Check if the value is empty
        if(isEmpty(value)) {
            // Change the alert box to RED
            updateAlertBoxColor(false);

            // Update the message
            $(".alert-information span").text("Please input the new value");

            // Display the alert box
            $(".alert-information").show();
            return;
        }

        $.ajax({
            data : {
                id : id,
                value : value
            },
            type : "POST",
            url : "/edit/" + category
        })
        .done(function(data) {
            // Update the item list
            $(".item-wrapper").updateItemList(data.allItems);

            // Change the alert box to based on the status of the action - success = green | failure = red
            updateAlertBoxColor(data.color);

            // Set the status message
            $(".alert-information span").text(data.message);

            // Display the alert box
            $(".alert-information").show();
        });
    });

    // Money - Open the right input field for the selected radio button
    $("input[name='money']").change(function () {

        // Reset each item modal and display the correct input field
        var category = $(this).val();
        if(category === "total") {
            resetModal();
            $(".label-total").removeClass("d-none");
            $("#new-total").removeClass("d-none");
        } else if (category === "percentage") {
            resetModal();
            $(".label-percentage").removeClass("d-none");
            $("#new-percentage").removeClass("d-none");
        }

    });


    // Update Money Information
    $(".modal-footer").on("click", ".apply-money", function() {
        var category = $("input[name='money']:checked").val();
        var value = "";

        // Check if any of the radio button is checked
        if(!isChecked("money")) {
            // Change the alert box to RED
            updateAlertBoxColor(false);

            // Update the message
            $(".alert-information span").text("Please select which attribute you would like to edit");

            // Display the alert box
            $(".alert-information").show();
            return;
        }

        // Get the new value
        value = $("#new-" + category).val();

        // Check if the value is empty
        if(isEmpty(value)) {
            updateAlertBoxColor(false);
            $(".alert-information span").text("Please input the new value");

            // Display the alert box
            $(".alert-information").show();
            return;
        }

        $.ajax({
            data : { value : value },
            type : "POST",
            url : "/update_money/" + category

        })
        .done(function(data) {
            // Update the price information
            $("#available").text(data.budget);
            $("#percent").text(data.percentage);
            $("#total").text(data.total);

            // Update the item list
            $(".item-wrapper").updateItemList(data.allItems);

            // Change the alert box to based on the status of the action - success = green | failure = red
            updateAlertBoxColor(data.color);

            // Set the status message
            $(".alert-information span").text(data.message);

            // Display the alert box
            $(".alert-information").show();
        });
    });

});