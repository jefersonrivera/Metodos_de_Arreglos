// Donde se almacenan nuestros datos
let tasks = [];

const taskInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const totalTask = document.getElementById("total-task");
const completedTask = document.getElementById("completed-task");
const pendingTask = document.getElementById("pending-task");
const todoList = document.getElementById("todo-list");

function addTask() {
  const description = taskInput.value;

  if (description !== "") {
    const newTask = {
      id: Date.now(),
      description: description,
      completed: false,
    };

    tasks.push(newTask);
    taskInput.value = "";
    renderTask();
  }
}

addBtn.addEventListener("click", addTask);

//Funcion que renderiza el contenido

function renderTask() {
  todoList.innerHTML = tasks
    .map(
      (task) => `
        <li>
            <span>${task.id}</span>
            <span>${task.description}</span>
            <input type="checkbox" ${
              task.completed ? "checked" : ""
            } onchange="toogle(${task.id})"/>
            <button id='delete-btn' onclick="deleteTask(${
              task.id
            })">ELIMINAR</button>
            <button id='edit-btn' onClick="editTask(${task.id})">EDITAR</button>
        </li>
    `
    )
    .join("");

  updateCounter();
}

// funcion que actualiza los contadores

function updateCounter() {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const pending = total - completed;

  totalTask.innerHTML = total;
  completedTask.innerHTML = completed;
  pendingTask.innerHTML = pending;
}

// funcion que borra una tarea

function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  renderTask();
}

// funcion que cambia el estado del checkbox de true a false o de false a true
function toogle(taskId) {
  const task = tasks.find((task) => task.id === taskId);
  if (task) {
    task.completed = !task.completed;
    renderTask();
  }
}

//funcion que edita la tarea

function editTask(taskId) {
  const task = tasks.find((task) => task.id === taskId);
  if (task) {
    const newDescription = prompt("Editar Tarea:", task.description);
    if (newDescription !== null && newDescription.trim() !== "") {
      task.description = newDescription.trim();
      renderTask();
    }
  }
}
