var formEl = document.querySelector('#task-form');
var taskToDoEl = document.querySelector('#task-to-do');

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

    // Package up data as an ibject
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
    
    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement('div');
    
    // give it a CSS class name
    taskInfoEl.className = 'task-info';
    
    //add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    
    // append <div> to <li>
    listItemEl.appendChild(taskInfoEl);
    
    // add entire lsit item to list (append <li> to <ul>)
    taskToDoEl.appendChild(listItemEl);
};

formEl.addEventListener('submit', taskFormHandler);
