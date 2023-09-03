var formEl = document.querySelector('#task-form');
var tasksToDoEl = document.querySelector('#task-to-do');
var pageContentEl = document.querySelector("#page-content");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var taskIdCounter = 0;
var tasks = [];

var completeEditTask = function (taskName, taskType, taskId) {
    console.log(taskName, taskType, taskId);
    
    // find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    // loop through tasks array anf task object with new content
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    };

    saveTasks()

    alert("Task Updated!")

    formEl.removeAttribute("data-task-id");
    document.querySelector('#save-task').textContent = "Add Task";
}

var taskFormHandler = function (event) {
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // Basic form input validator. Simply check to see if any value is read from the form inpiuts.
    // We're seeing if either `taskNameInput or `taskTypeInput` is empty or if BOTH are empty
    if (!taskNameInput || !taskTypeInput) {
        alert('You need to fill out the task form in its entirety!');
        return false;
    }

    formEl.reset();

    var isEdit = formEl.hasAttribute("data-task-id");
    console.log(isEdit);

    if  (isEdit) {
        var taskId = form.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
    // no data attribute, so create object as normal and pass to createTaskEl function
    else {
        // get the currently selected option's value and convert to lowercase
        //var statusValue = event.target.value.toLowerCase();
        // Package up data as an object
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput,
            status: "to do"
        }    
    };

    // Send data as an argument to createTaskEl
    createTaskEl(taskDataObj);

    console.log('Form Submitted');
    console.dir(formEl);
};

var taskStatusChangeHandler = function(event){
    console.log(event.target);
    console.log(event.target.getAttribute("data-task-id"));

    // get the item's id
    var taskId = event.target.getAttribute("data-task-id");

    // get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();
    console.log(statusValue)

    // find the parent task item element based on id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    } else if (statusValue === "in progress"){
        tasksInProgressEl.appendChild(taskSelected)
    } else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }

    // update task's in tasks array
    for (var i =0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)){
            tasks[i].status = statusValue
        }
    }

    console.log(tasks)
    saveTasks()
};

var createTaskEl = function(taskDataObj){
    console.log(taskDataObj);
    console.log(taskDataObj.status);
    // create list item
    var listItemEl = document.createElement('li');
    listItemEl.className = 'task-item';

    // add task id as a custom attribute
    listItemEl.setAttribute('data-task-id', taskIdCounter);
    
    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement('div');
    
    // give it a CSS class name
    taskInfoEl.className = 'task-info';
    
    //add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    
    // append <div> to <li>
    listItemEl.appendChild(taskInfoEl);

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);
    
    // add entire lsit item to list (append <li> to <ul>)
    tasksToDoEl.appendChild(listItemEl);

    taskDataObj.id = taskIdCounter;

    tasks.push(taskDataObj);

    saveTasks()

    // increase the counter the next unique id
    taskIdCounter++; // The value of the first task created will be `0`
};

var createTaskActions = function (taskId) {
    var actionContainerEl = document.createElement('div');
    actionContainerEl.className = 'task-actions';

    // Create edit button
var editButtonEl = document.createElement('button');
editButtonEl.textContent = 'Edit';
editButtonEl.className = 'btn edit-btn';
editButtonEl.setAttribute('data-task-id', taskId);

actionContainerEl.appendChild(editButtonEl);

// Create delete button
var deleteButtonEl = document.createElement('button');
deleteButtonEl.textContent = 'Delete';
deleteButtonEl.className = 'btn delete-btn';
deleteButtonEl.setAttribute('data-task-id', taskId)

actionContainerEl.appendChild(deleteButtonEl);

var statusSelectEL = document.createElement("select");
statusSelectEL.className = "select-status";
statusSelectEL.setAttribute("name", "status-change");
statusSelectEL.setAttribute("data-task-id", taskId);

actionContainerEl.appendChild(statusSelectEL);

var statusChoices = ["To Do", "In Progress", "Completed"];

for (var i = 0; i <statusChoices.length; i++) {
    // create option element
    var statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute("value", statusChoices[i]);

    // append to select
    statusSelectEL.appendChild(statusOptionEl);
}
return actionContainerEl;
};



formEl.addEventListener('submit', taskFormHandler);

var taskButtonHandler = function(event) {
    console.log(event.target);

    // get target element from event
    var targetEl = event.target;

    // edit button wass clicked
    if (targetEl.matches(".edit-btn")){
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }

    // delete button was clicked

    else if (event.target.matches(".delete-btn")){
        // get the element's task id'
        var taskId = event.target.getAttribute("data-task-id")
        deleteTask(taskId);
    }
};

var editTask = function(taskId){
    console.log("editing  task #" + taskId);

    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // get content from task name nad type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    console.log(taskName)

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    console.log(taskType);

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";

    formEl.setAttribute("data-task-id", taskId)
};

var deleteTask = function(taskId){
    var taskSelected = document.querySelector(".task-item[data-task-id='"+ taskId + "'");
    taskSelected.remove();
    console.log(taskSelected);

    // create new array to hold updated list of tasks
    var updatedTaskArr = [];

    // loop through current tasks
    for (var i = 0; i < tasks.length; i++){
        // if taks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
        if (tasks[i].id !== parseInt(taskId)){
            updatedTaskArr.push(tasks[i]);
        }
    }

    // reassign tasks array to be the same as updatedTaskArr
    tasks = updatedTaskArr;

    saveTasks()
};

var saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

var loadTasks = function(){
    // Get task items from `localStorage`
    var savedTasks = localStorage.getItem("tasks");
    console.log(saveTasks)

    if (saveTasks === null) {
        return false;
    }    

    // Convert tasks from the string format back into an array of objects.
    saveTasks = JSON.parse(savedTasks);
    console.log(tasks);
    // Iterate through a tasks array and creates task elements on the page from it.
    for (var i = 0; i < savedTasks.length; i++){
        // pass each task object into the `createTaskEl()` function
        console.log(saveTasks[i])
        createTaskEl(saveTasks[i])
    }

}

pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);
loadTasks()
