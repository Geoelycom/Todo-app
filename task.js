 //define UI varaible
 const form = document.querySelector('#task-form');
 const taskList = document.querySelector('.collection');
 const clearBtn = document.querySelector('.clear-tasks');
 const filter = document.querySelector('#filter');
 const taskInput = document.querySelector('#task');

 //load all event Listeners

 loadEventListeners();

 function loadEventListeners() {
     // DOM load event
     document.addEventListener('DOMContentLoaded', getTasks);
     // add task event
     form.addEventListener('submit', addTask);

     //remove task event
     taskList.addEventListener('click', removeTask);
     // clear task
     clearBtn.addEventListener('click', clearTasks);
     //filter tasks event
     filter.addEventListener('keyup', filterTasks);
 }
 // get Tasks from Ls
 function getTasks() {
     let tasks;
     if (localStorage.getItem('tasks') === null) {
         tasks = [];
     } else {
         tasks = JSON.parse(localStorage.getItem('tasks'));
     }
     tasks.forEach(function(task) {
         //create Li Element
         const li = document.createElement('li');
         //add class
         li.className = 'collection-item';
         //create the TextNode and append to li
         li.appendChild(document.createTextNode(task));
         //create a new link Element
         const link = document.createElement('a');
         //add class
         link.className = 'delete-item secondary-content';
         // add icon to the element
         link.innerHTML = '<i class ="fa fa-remove"></i>';
         //append the link to li
         li.appendChild(link);
         //append li to ul
         taskList.appendChild(li);
     });
 }

 function addTask(e) {
     if (taskInput.value === '') {

         alert('add a task');
     }

     //create Li Element
     const li = document.createElement('li');
     li.className = 'collection-item';
     //create the TextNode
     li.appendChild(document.createTextNode(taskInput.value));
     //create a new link Element
     const link = document.createElement('a');
     link.className = 'delete-item secondary-content';
     // add icon to the element
     link.innerHTML = '<i class ="fa fa-remove"></i>';
     li.appendChild(link);

     taskList.appendChild(li);
     //store in Ls
     storeTaskInLocalStorage(taskInput.value);

     //clear input
     taskInput.value = '';
     e.preventDefault();
 }
 //store Task
 function storeTaskInLocalStorage(task) {
     let tasks;
     if (localStorage.getItem('tasks') === null) {
         tasks = [];
     } else {
         tasks = JSON.parse(localStorage.getItem('tasks'));
     }
     tasks.push(task);
     localStorage.setItem('tasks', JSON.stringify(tasks));
 }


 // remove task
 function removeTask(e) {
     if (e.target.parentElement.classList.contains('delete-item')) {
         if (confirm('are you sure?')) {
             e.target.parentElement.parentElement.remove();
             //  remove from LS
             removeTaskFromLocalStorage
                 (e.target.parentElement.parentElement);
         }
     }
 }
 //remove from Ls
 function removeTaskFromLocalStorage() {
     let tasks;
     if (localStorage.getItem('tasks') === null) {
         tasks = [];
     } else {
         tasks = JSON.parse(localStorage.getItem('tasks'));
     }

     tasks.forEach(function(task, index) {
         if (taskItem.textContent === task) {
             tasks.splice(index, 1);
         }
     });
     localStorage.setItem('task', JSON.stringify(tasks));

 }
 //create a new function clear task
 function clearTasks() {
     taskList.innerHTML = '';

 }
 // clear  from LS
 clearTasksFromLocalStorage();
 
 // clear Tasks from LS
 function clearTasksFromLocalStorage() {
localStorage.clear();
 }

 // filter Tasks
 function filterTasks(e) {
     const text = e.target.value.toLowerCase();
     document.querySelectorAll('.collection-item').forEach(function(task) {
         const item = task.firstChild.textContent;
         if (item.toLowerCase().indexOf(text) != -1) {
             task.style.display = 'block';
         } else {
             task.style.display = 'none';
         }
     });
 }
 