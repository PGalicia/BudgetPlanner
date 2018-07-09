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
        row.append("<button type='button' class='btn btn-primary' data-toggle='modal' data-target='#itemModal'>Edit</button>");
        row.append("<button type='button' class='btn btn-danger'>Delete</button>");
    }

    return result;
};

    $("#add").on("submit", function(event) {
        $.ajax({
            data : {
                name : $("#name").val(),
                priority : $("#priority").val(),
                price : $("#price").val(),
                money : $("#money").val()
            },
            type : "POST",
            url : "/add"
        })
        .done(function(data) {
            if (data.message) {
                $(".item-wrapper").myFunction(data.allItems);
                $(".result").text(data.message);
            }
        });
        event.preventDefault()
    });

    $("#delete").on("submit", function(event) {
        $.ajax({
            data : { id : $("#item_id").val() },
            type : "POST",
            url : "/delete"
        })
        .done(function(data) {
            if (data.message) {
                $(".item-wrapper").myFunction(data.allItems);
                $(".result").text(data.message);
            }
        });
        event.preventDefault()
    });

    $("#get").on("submit", function(event) {
        $.ajax({
            data : { id : $("#item_id_get").val() },
            type : "POST",
            url : "/item"
        })
        .done(function(data) {
            if (data.message) {
                $(".get_result").text(data.message)
            } else {
                $(".get_result").text(data.item)
            }
        });
        event.preventDefault()
    });

//    $("button").click(function(){
//        var radioValue = $("input[name='gender']:checked").val();
//        if(radioValue){
//            alert("Your are a - " + radioValue);
//        }
//    });

    $("#update").on("submit", function(event) {

        var category = $("input[name='edit']:checked").val();
        $.ajax({
            data : {
                id : $("#item_id_update").val(),
                value : $("#new").val()
            },
            type : "POST",
            url : "/edit/" + category
        })
        .done(function(data) {
            $(".update_result").text(data.message)
            $(".item-wrapper").myFunction(data.allItems);
        });
        event.preventDefault()
    });

});