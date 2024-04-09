  function  saveTask()
  {
    console.log("Saving tasks");
    //get values
    const title = $("inputTitle").val();
    const desc = $("inoutDescription").val();
    const color = $("inputColor").val();
    const date = $("inputDate").val();
    const status = $("inputStatus").val();
    const budget = $("inputBudget").val();
    // build an object

    let tasktoSave = new Task(title, desc, color,date, status, budget)
    console.log(tasktoSave);
    
    //Save to the server
    $.ajax({
      type: "POST",
      url: "http://fsdiapi.azurewebsites.net/api/tasks/",
      data: JSON.stringify(taskTosave),
      contentType: "application/json",
      success: function(res){
        console.log(res);
      },
      error: function(error){
        console.log(error);
        alert("Unexpected error");
      }
    })

    //display the task 
    displayTask(tasktoSave);
  }

  function loadTask()//this is to read
  {
    //get http://fsdiapi.azurewebsites.net/api/tasks
    //console.log the response
    $.ajax({
      type: "GET",
      url: "http://fsdiapi.azurewebsites.net/api/tasks",
      
      success: function(res){
        let data = JSON.parse(res);
        

        for(let i=0;i<data.length;i++)
        {
          let task = data[i];
          displayTask(task);
          if (task.title=="adrian")
          {
            displayTask(task);
          }
        }
        console.log(res);
        console.log(data);
      },
      error: function(error){
        console.log(error);
        alert("Unexpected error");
      }
    })
  }
function displayTask(task)
{
    let syntax = `<div class="task"
    <h5>${task.title}</h5>
    <h5>${task.description}</h5>
    </div>
    <label class="status">${task.status}</label>
    <div class="date-budget">  
    <label>${task.startDate}</label> 
    <label>${task.budget}</label> 
    </div>`
    $(".pending-task").append(syntax);
}

function testRequest(){
  $.ajax({
    type: "GET",//read
    url:"http://fsdiapi.azurewebsites.net",
    //exceptions
    success: function(response){
      console.log(response)
    },
    error: function(error){
      console.log(error)
    } 
  });
}
function init(){
  //load data
  //retrieve data 
  //hook events
  $("btnSave").click(saveTask);//this is using jQuery
  loadTask();
  //document.getElementById("btnSave"); old fashion

}

window.onload = init;

//try to specify the order of the arguments execution
