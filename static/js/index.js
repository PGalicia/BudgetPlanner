$(document).ready(function() {

// Updates the list
$.fn.myFunction = function(list){

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
        row.append("<div class='id'>" + id + "</div>");
        row.append("<div class='price'>" + allocated_money + "/" + price + "</div>");
        row.append("<button type='button' class='btn btn-primary edit-item' data-toggle='modal' data-target='#itemModal'>Edit</button>");
        row.append("<button type='button' class='btn btn-danger delete'>Delete</button>");
    }

    return result;
};

    // Add Item
    $("#add").click(function() {
        $.ajax({
            data : {
                name : $("#name").val(),
                priority : $("#priority").val(),
                price : $("#price").val(),
                money : 0
            },
            type : "POST",
            url :  "/add"
        })
        .done(function(data) {
            if (data.message) {
                $(".item-wrapper").myFunction(data.allItems);
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
                $(".item-wrapper").myFunction(data.allItems);
//                $(".result").text(data.message);
            }
        });
    });


//    $("#get").on("submit", function(event) {
//        $.ajax({
//            data : { id : $("#item_id_get").val() },
//            type : "POST",
//            url : "/item"
//        })
//        .done(function(data) {
//            if (data.message) {
//                $(".get_result").text(data.message)
//            } else {
//                $(".get_result").text(data.item)
//            }
//        });
//        event.preventDefault()
//    });


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

    // Update item
    $(".modal-footer").on("click", ".apply", function() {
        var id = $(".item-id").html();
        var category = $("input[name='category']:checked").val();
        $.ajax({
            data : {
                id : id,
                value : $("#new").val()
            },
            type : "POST",
            url : "/edit/" + category
        })
        .done(function(data) {
//            $(".update_result").text(data.message);
            $(".item-wrapper").myFunction(data.allItems);
        });
    });

    // Update Money Information
    $(".modal-footer").on("click", ".apply-money", function() {
        var category = $("input[name='money']:checked").val();
        console.log(category);
        $.ajax({
            data : { value : $("#new-money").val() },
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