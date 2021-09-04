var schedule = [];

var loadSchedule = function() {
    schedule = JSON.parse(localStorage.getItem("schedule"));
    if (!schedule) {
        schedule = [];
    } 
    //build html
    for (var i = 9; i<18; i++){
        startDay = moment().hour(i).format('hA');
        var timeBlock = $("<div>")
            .addClass("row time-block")
            .attr("data-id",i);
        var hour = $("<div>")
            .addClass("col-1 hour")
            .attr("data-id",i)
            .text(startDay);
        var description = $("<p>")
            .addClass("col-10 description")
            .attr("data-id",i);
        var saveBtn = $("<div>")
            .addClass("col-1 saveBtn material-icons")
            .attr("data-id",i)
            .html("<i class='far fa-save'></i>");
        timeBlock.append(hour, description,saveBtn);
        
        $(".container").append(timeBlock);
    }
    auditSchedule();
}


var auditSchedule = function() {
    //get current time
    now = moment().hour()
        
    //update colors (attr) and data from local storage
    $(".container").children().each(function() {
        time = $(this).attr("data-id")
        time = parseInt(time);
        if (time === now ) {
            $(this).addClass("present");
        } else if (time > now) {
            $(this).addClass("future");
        } else {
            $(this).addClass("past");
        }
    })
    
    $.each(schedule, function(index) {
        $(".description[data-id*="+schedule[index].id+"]").text(schedule[index].text)
    });
}

//current Day display
$("#currentDay").text(moment().format("dddd, MMMM Do YYYY"));

//load schedule from local storage
loadSchedule();

//click on description
$(".time-block").on("click", "p", function()  {
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
    
    var newDescription = $('<p>')
        .addClass("col-10 description")
        .attr("data-id",id)
        .text(text);
            
    var update = ""
    $.each(schedule, function(index) {
        if (schedule[index].id === id) {
            schedule[index].text = text;
            update= "Updated";
        }
    });
    if (update === ""){
        //save to local storage
        schedule.push({ id: id, text: text})
    }
     //change from textarea to p
     $("#"+id).replaceWith(newDescription);
   
    localStorage.setItem("schedule", JSON.stringify(schedule));
})

//timer interval that check cevery X min and audit schedule
setInterval(function () {
    auditSchedule();
}, 60000);