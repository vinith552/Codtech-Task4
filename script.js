// Select elements
const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task-button");
const taskList = document.getElementById("task-list");

// Initialize tasks from local storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to render tasks
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.className = "task-item";

    const taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.textContent = task;

    const editButton = document.createElement("button");
    editButton.className = "edit-button";
    editButton.textContent = "Edit";
    editButton.onclick = () => editTask(index);

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => deleteTask(index);

    listItem.appendChild(taskText);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    taskList.appendChild(listItem);
  });
}

// Function to add a task
function addTask() {
  const task = taskInput.value.trim();
  if (task) {
    tasks.push(task);
    taskInput.value = "";
    updateLocalStorage();
    renderTasks();
  } else {
    alert("Task cannot be empty!");
  }
}

// Function to edit a task
function editTask(index) {
  const newTask = prompt("Edit task:", tasks[index]);
  if (newTask !== null && newTask.trim() !== "") {
    tasks[index] = newTask.trim();
    updateLocalStorage();
    renderTasks();
  }
}

// Function to delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  updateLocalStorage();
  renderTasks();
}

// Function to update local storage
function updateLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add event listener to the "Add Task" button
addTaskButton.addEventListener("click", addTask);

// Initial render
renderTasks();
