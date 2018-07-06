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

});