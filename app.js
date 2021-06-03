//Defining UI variables
const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')

//Load all event listeners
loadEventListeners()

//Function to load all event listeners
function loadEventListeners() {
  //event listener for the dom
  document.addEventListener('DOMContentLoaded', pullTasksFromLocalStorage)

  //add task event - this event will add a new tak to the task list
  form.addEventListener('submit', addTask)

  //remove a task form the list
  taskList.addEventListener('click', removeTask)

  //Clear All tasks from the Task List
  clearBtn.addEventListener('click', clearAllTasks)

  //Filter the tasks
  filter.addEventListener('keyup', filterTasks)
}

//Add Task Function
function addTask(e) {
  if(taskInput.value === '') {
    alert('Please add a Task')
    return;
  }

  //Create li.
  //This li will be added to the ul dynamically as the tasks are being added
  const li = document.createElement('li');

  //add a class to this li
  li.className = 'collection-item'

  //create text node and append it to li as text.
  li.appendChild(document.createTextNode(taskInput.value))

  //create link element a tag
  const link = document.createElement('a')

  //add the class 
  link.className = 'delete-item secondary-content'

  //add the icon to link
  link.innerHTML = '<i class="fa fa-remove"></i>'

  //append this link to li
  li.appendChild(link)

  //append li to the ul in html
  taskList.appendChild(li)

  //Store the task in local storage
  storeTaskInLocalStorage(taskInput.value)

  //clear the input
  taskInput.value = ''

  e.preventDefault()
}

//Remove task function
function removeTask(e) {
  //console.log(e.target) //If you click on the 'x' this will select the i tag
  //we select the parent element of the i tag i.e the a tag
  if(e.target.parentElement.classList.contains('delete-item')) { //This will select the a tag as it has a class name of delete-item
  //We remove the parent element of the a tag i.e the li tag. Before removing we ask for user confirmation
    if(confirm('Are you sure to remove this task?')) {
      e.target.parentElement.parentElement.remove();
    }
  } 

  //Remove this task form the local storage as well
  removeTaskFromLocalStorage(e.target.parentElement.parentElement)
}

//function to clear all the tasks
function clearAllTasks() {
  //We delete all the li i.e tasks from the list i.e. ul by using a while loop
  while(taskList.firstChild) { 
  //while ul has 1st child or ul is not empty, we recursively delete the li from the list
    taskList.removeChild(taskList.firstChild) //remove the li or task
  }

  //clear the local Storage
  clearLocalStorage()
}

//filter the tasks
function filterTasks(e) {
  //convert the typed text to lower case for matching purposes
  const text = e.target.value.toLowerCase();  
  //Select all the li from the ul using queryselectorAll
  //This will return a node list that we can use to loop through and find the match with the entered text in the filter
  document.querySelectorAll('.collection-item').forEach((task) => {
    //select the text from the first item.
    const item = task.firstChild.textContent

    //if there is an li with text that matches with the filter text then display that li else dont display it
    if(item.toLocaleLowerCase().indexOf(text) != -1) {
      task.style.display = 'block' //display the li
    } else {
      task.style.display = 'none' //do not display the element
    }
  }) 
}

//Local Storage Operations

//Store the newely entered Task in local Storage
function storeTaskInLocalStorage(task) {
  //check local storage to see if there exists and array that has tasks stored in it
  let tasks;

  //local storage does not have tasks array
  if(localStorage.getItem('tasks') === null) { 
    tasks=[]; //create tasks array. This array will be pushed later to local storage
  } else { //There is a task array in local storage
    //The item is stored as a string. We parse it as an object
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  //add the new task to the tasks array
  tasks.push(task)

  //store the new tasks array back to the local storage
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

//Pull all the tasks from the local storage
function pullTasksFromLocalStorage() {
  //check local storage to see if there exists and array that has tasks stored in it
  let tasks;
  //local storage does not have tasks array
  if(localStorage.getItem('tasks') === null) { 
    tasks=[]; //create tasks array. This array will be pushed later to local storage
  } else { //There is a task array in local storage
    //The item is stored as a string. We parse it as an object
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  //After getting tasks array from the local storage we loop through each item text and create the li.
  //We then push these li to the ul which will show in the UI

  tasks.forEach((task) =>{
  //Create li.
  //This li will be added to the ul dynamically as the tasks are being added
  const li = document.createElement('li');

  //add a class to this li
  li.className = 'collection-item'

  //create text node and append it to li as text.
  li.appendChild(document.createTextNode(task))

  //create link element a tag
  const link = document.createElement('a')

  //add the class 
  link.className = 'delete-item secondary-content'

  //add the icon to link
  link.innerHTML = '<i class="fa fa-remove"></i>'

  //append this link to li
  li.appendChild(link)

  //append li to the ul in html
  taskList.appendChild(li)
  })
}

//Remove task from local storage
function removeTaskFromLocalStorage(taskItem) {
  //get the tasks array from the local storage
  //check local storage to see if there exists and array that has tasks stored in it
  let tasks;
  //local storage does not have tasks array
  if(localStorage.getItem('tasks') === null) { 
    tasks=[]; //create tasks array. This array will be pushed later to local storage
  } else { //There is a task array in local storage
    //The item is stored as a string. We parse it as an object
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  //loop through the tasks array and search for the task to delete.
  //if task is found we simply delete this task from the array and store it back to local storage
  tasks.forEach((task, index) => {
    if(taskItem.textContent === task) {
      tasks.splice(index,1)
    }
  })

  //Push the tasks array back to the local storage
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

//Clear the local Storage
function clearLocalStorage() {
  localStorage.clear()
}