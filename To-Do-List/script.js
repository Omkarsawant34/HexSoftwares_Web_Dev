// Select Elements
const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

// Load Tasks from Local Storage
document.addEventListener('DOMContentLoaded', loadTasksFromStorage);

// Add Task Event Listener
addTaskButton.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    addTask(taskText);
    saveTaskToStorage(taskText, false); // New task is not completed by default
    taskInput.value = '';
  }
});

// Add Task Function
function addTask(taskText, completed = false) {
  const taskItem = document.createElement('li');
  taskItem.className = `task-item ${completed ? 'completed' : ''}`;

  taskItem.innerHTML = `
    <span>${taskText}</span>
    <button class="delete-task">&times;</button>
  `;

  // Mark Task as Completed (Click on the Task Text)
  taskItem.querySelector('span').addEventListener('click', () => {
    taskItem.classList.toggle('completed');
    toggleTaskCompletionInStorage(taskText); // Update completion status in Local Storage
  });

  // Delete Task
  taskItem.querySelector('.delete-task').addEventListener('click', () => {
    taskItem.remove();
    removeTaskFromStorage(taskText);
  });

  taskList.appendChild(taskItem);
}

// Save Task to Local Storage
function saveTaskToStorage(taskText, completed) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({ text: taskText, completed });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load Tasks from Local Storage
function loadTasksFromStorage() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach((task) => addTask(task.text, task.completed));
}

// Toggle Task Completion in Local Storage
function toggleTaskCompletionInStorage(taskText) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const task = tasks.find((t) => t.text === taskText);
  if (task) task.completed = !task.completed;
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task from Local Storage
function removeTaskFromStorage(taskText) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter((task) => task.text !== taskText);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
