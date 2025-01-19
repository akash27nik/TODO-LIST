// script.js

// Fetching elements from the DOM
const taskInput = document.getElementById("task-input"); // Input field for task
const taskButton = document.getElementById("task-btn"); // Button to add task
const taskList = document.getElementById("task-list"); // Container for the list of tasks

// Initialize tasks from localStorage or an empty array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to display tasks
function displayTasks() {
  taskList.innerHTML = ""; // Clear the list before displaying tasks

  tasks.forEach((task, index) => {
    const taskItem = document.createElement("li"); // Create a list item

    // Add class for completed tasks
    if (task.completed) {
      taskItem.classList.add("completed");
    }

    // Add task content with actions
    taskItem.innerHTML = `
      <div class="task">
        <div class="task-text-date">
          <span class="task-text">${task.text}</span>
          <span class="task-date">${new Date(task.date).toLocaleString()}</span>
        </div>

        <div class="task-action">
          <button class="edit-btn" onclick="editTask(${index})">Edit</button>
          <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
          <button class="toggle-btn" onclick="toggleTask(${index})">${task.completed ? "Unmark" : "Complete"}</button>
        </div>
      </div>
    `;

    taskList.appendChild(taskItem); // Append the task to the list
  });
}

// Event listener for adding tasks
taskButton.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  
  if (taskText) {
    const newTask = {
      text: taskText,
      date: new Date().toISOString(),
      completed: false,
    };

    tasks.unshift(newTask); // Add new task to the top of the array
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Save to localStorage

    taskInput.value = ""; // Clear input field
    displayTasks(); // Refresh task list
  } else {
    alert("Please enter a task.");
  }
});

// Function to toggle task completion
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed; // Toggle completion status
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Update localStorage
  displayTasks(); // Refresh task list
}

// Function to delete a task
function deleteTask(index) {
  tasks.splice(index, 1); // Remove task from array
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Update localStorage
  displayTasks(); // Refresh task list
}

// Function to edit a task
function editTask(index) {
  const newText = prompt("Edit your task:", tasks[index].text);
  if (newText !== null) {
    tasks[index].text = newText.trim(); // Update task text
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Update localStorage
    displayTasks(); // Refresh task list
  }
}

// Initial call to display tasks
displayTasks();
