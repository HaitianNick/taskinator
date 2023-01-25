var buttonEl = document.querySelector("#save-task");

var taskToDoEl = document.querySelector('#task-to-do');

var createTaskHandler = function(){
    var listItemEl = document.createElement('li');
    listItemEl.className = 'task-item';
    listItemEl.textContent = 'This is a new task.';
    taskToDoEl.appendChild(listItemEl);
}

buttonEl.addEventListener('click', createTaskHandler);

console.log(buttonEl);
console.log(taskToDoEl);
console.log(window.document.doctype);

