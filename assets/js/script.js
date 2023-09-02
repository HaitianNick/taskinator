var formEl = document.querySelector('#task-form');
var taskToDoEl = document.querySelector('#task-to-do');
var taskIdCounter = 0;

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

    // Package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    // Send data as an argument to createTaskEl
    createTaskEl(taskDataObj);

    console.log('Form Submitted');
    console.dir(formEl);
};


var createTaskEl = function(taskDataObj){
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
    taskToDoEl.appendChild(listItemEl);

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