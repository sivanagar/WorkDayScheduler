var schedule = [];



var loadSchedule = function() {
    console.log("Loading schedule");
    schedule = JSON.parse(localStorage.getItem("schedule"));
    if (!schedule) {
        schedule = [];
    } 

    //build html
    for (var i = 9; i<18; i++){
        startDay = moment().hour(i).format('hA');
        var timeBlock = $("<div>")
            .addClass("row time-block")
            .attr("data-id",startDay);
        var hour = $("<div>")
            .addClass("col-1 hour")
            .attr("data-id",startDay)
            .text(startDay);
        var description = $("<p>")
            .addClass("col-10 description")
            .attr("data-id",startDay);
        var saveBtn = $("<div>")
            .addClass("col-1 saveBtn material-icons")
            .attr("data-id",startDay)
            .text("save");
        timeBlock.append(hour, description,saveBtn);
        
        $(".container").append(timeBlock);
    }
    auditSchedule();
}

var saveSchedule = function() {
    console.log("Saving schedule");
    //save var to localstorage
}

var auditSchedule = function() {
    console.log("Auditing schedule");
    //update colors and data from local storage

}

//current Day display
$("#currentDay").text(moment().format("dddd, MMMM Do YYYY"));

//load schedule from local storage
loadSchedule();

//click on description
$(".time-block").on("click", "p", function()  {
    console.log("click")
    var id = $(this).attr("data-id");
    
    var text = $(this)
        .text()
        .trim();
  
    var textInput = $("<textarea>")
        .addClass("col-10 description")
        .attr("id",id)
        .val(text);
  
    $(this).replaceWith(textInput);
    textInput.trigger("focus");
        
}); 

//click on save
$(".saveBtn").click(function() {
    var id = $(this).attr("data-id");
    var text = $("#"+id)
    .val()
    .trim();
    
    //save to local storage
    var newDescription = $('<p>')
        .addClass("col-10 description")
        .attr("data-id",id)
        .text(text);
             
    
    //change from textarea to p
    $("#"+id).replaceWith(newDescription);
    
    saveSchedule();
})

//timer interval that check cevery X min and audit schedule
setInterval(function () {
    auditSchedule();
}, 900000);