$(document).ready(function() {

    // Updates the list -- Change Name
    $.fn.updateItemList = function(list){

        $(this).empty();

        var result = $(this);
        for(var i = 0; i < list.length; i++) {

            var id = list[i][0];
            var name = list[i][1];
            var priority = list[i][2];
            var price = list[i][3];
            var allocated_money = list[i][4];


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

    // Check if a string is empty -- OBSOLETE?
    function isEmpty(value) {
        return (value == "") ? true : false;
    };

    // Checks if the length of the value is at or below the 'limit' -- OBSOLETE?
    function isCorrectLength(value, limit) {
        return (value.length <= limit) ? true : false;
    };

    // Checks if the value equates to a digit number (0-9) -- OBSOLETE?
    function isANumber(value) {
        return !(isNaN(value));
    }

    // Checks if any of the radio button is pressed
    function isChecked(name) {
        return $("input:radio[name = '" + name + "']").is(":checked");
    };

    // Reset the modal functionality
    function reset() {
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

    // Ensures that users can only input valid float
    $('#price').maskMoney();
    $('#new-price').maskMoney();
    $('#new-total').maskMoney();

    // Add Item
    $("#add").click(function() {

        var name = $("#name").val();
        var priority = $("#priority").val();
        var price = $("#price").val();

        // Checks if the user inputs a correct item priority
        if(isEmpty(priority)) {
            alert("Input a valid priority number (0 - 9)");
            return;
        }

        // Checks if the user inputs a correct item name
        if(isEmpty(name)) {
            alert("Please enter the item name")
            return;
        }

        // Checks if the user inputs a correct item name
        if(isEmpty(price)) {
            alert("Please input the item price");
            return;
        }

        // CAN ADD ALERT BOX FUNCTIONALITY HERE

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
            if (data.message) {
                $(".item-wrapper").updateItemList(data.allItems);
//                $(".result").text(data.message);
            }
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
            if (data.message) {
                $(".item-wrapper").updateItemList(data.allItems);
//                $(".result").text(data.message);
            }
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
            $(".item-title").text(data.name);
            $(".item-id").text(data.id);
        });
    });

    // Category - Open the right input field for the selected radio button
    $("input[name='category']").change(function () {

        var category = $(this).val();
        if(category === "name") {
            reset();
            $(".label-name").removeClass("d-none");
            $("#new-name").removeClass("d-none");
        } else if (category === "priority") {
            reset();
            $(".label-priority").removeClass("d-none");
            $("#new-priority").removeClass("d-none");
        } else if (category === "price") {
            reset();
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
            alert("Please select which attribute you would like to edit");
            return;
        }

        // Get the new value
        value = $("#new-" + category).val();

        // Check if the value is empty
        if(isEmpty(value)) {
            alert("Please input the new value");
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
//            $(".update_result").text(data.message);
            $(".item-wrapper").updateItemList(data.allItems);
        });
    });

    // Money - Open the right input field for the selected radio button
    $("input[name='money']").change(function () {

        var category = $(this).val();
        if(category === "total") {
            reset();
            $(".label-total").removeClass("d-none");
            $("#new-total").removeClass("d-none");
        } else if (category === "percentage") {
            reset();
            $(".label-percentage").removeClass("d-none");
            $("#new-percentage").removeClass("d-none");
        }

    });


    // Update Money Information
    $(".modal-footer").on("click", ".apply-money", function() {
        var category = $("input[name='money']:checked").val();
        var value = "";

        console.log(category);
        // Check if any of the radio button is checked
        if(!isChecked("money")) {
            alert("Please select which attribute you would like to edit");
            return;
        }

        // Get the new value
        value = $("#new-" + category).val();

        // Check if the value is empty
        if(isEmpty(value)) {
            alert("Please input the new value");
            return;
        }

        $.ajax({
            data : { value : value },
            type : "POST",
            url : "/update_money/" + category

        })
        .done(function(data) {
            $("#available").text(data.budget);
            $("#percent").text(data.percentage);
            $("#total").text(data.total);
        });
    });

});