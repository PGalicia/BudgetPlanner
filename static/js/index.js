$(document).ready(function() {
    console.log("In JS");
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
                $(".list").text(data.allItems);
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
                $(".list").text(data.allItems);
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
            $(".list").text(data.allItems);
        });
        event.preventDefault()
    });

});