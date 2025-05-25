"use strict";
var Status;
(function (Status) {
    Status["ToDo"] = "To do";
    Status["Doing"] = "Doing";
    Status["Done"] = "Done";
})(Status || (Status = {}));
const tasks = [
    { name: "Learn TypeScript", status: Status.ToDo },
    { name: "Learn ypeScript", status: Status.ToDo },
    { name: "Learn Tyt", status: Status.ToDo },
    { name: "Build Tsk App", status: Status.Doing },
    { name: "Build ask App", status: Status.Doing },
    { name: "BuildTask App", status: Status.Doing },
    { name: "Deploy o GitHub", status: Status.Done },
    { name: "Deployto GitHub", status: Status.Done },
    { name: "Deplo to GitHub", status: Status.Done },
];
const inputField = document.getElementById("container-form-input");
const addBtn = document.getElementById("container-form-btn");
/* ------------ Tasks Types --------------- */
const containerTasksTodoDisplay = document.getElementById("container-tasks-todo-display");
const containerTasksDoingDisplay = document.getElementById("container-tasks-doing-display");
const containerTasksDoneDisplay = document.getElementById("container-tasks-done-display");
let draggedTasks = null;
function handleDragStart(e) {
    console.log("e in drag start", e);
    // here which task we're dragging
    const target = e.target;
    const taskName = target.dataset.name;
    const taskStatus = target.dataset.status;
    draggedTasks = {
        name: taskName,
        status: taskStatus,
    };
    //   console.log("Started dragging", draggedTasks);
}
function handleDragEng(e) {
    console.log("e in drag end", e);
    draggedTasks = null;
    console.log("finished dragging");
}
function handleDragOver(e) {
    console.log("handleDragOver");
    // must prevent default to allow dropping
    e.preventDefault();
    //   console.log("Dragging over drop zone.");
}
function handleDrop(e) {
    console.log("handleDrop");
    e.preventDefault();
    //   console.log("Dropped!!", draggedTasks);
    if (!draggedTasks)
        return;
    const dropZone = e.currentTarget;
    const columnId = dropZone.id;
    let newStatus;
    if (columnId === "container-tasks-todo-display") {
        newStatus = Status.ToDo;
    }
    else if (columnId === "container-tasks-doing-display") {
        newStatus = Status.Doing;
    }
    else if (columnId === "container-tasks-done-display") {
        newStatus = Status.Done;
    }
    else {
        return; // invalid drop zone
    }
    moveTask(draggedTasks.name, draggedTasks.status, newStatus);
}
function setUpDropZones() {
    console.log("setup Zones");
    [
        containerTasksDoingDisplay,
        containerTasksDoneDisplay,
        containerTasksTodoDisplay,
    ].forEach((each) => {
        each.addEventListener("dragover", handleDragOver);
        each.addEventListener("drop", handleDrop);
    });
}
function moveTask(taskName, oldStatus, newStatus) {
    console.log(`Moving ${taskName} from ${oldStatus} to ${newStatus}`);
    const taskToMove = tasks.find((task) => task.name === taskName && task.status === oldStatus);
    if (!taskToMove) {
        console.log("Tak not found!!");
        return;
    }
    taskToMove.status = newStatus;
    displayAllTasks();
    console.log("Task moved successfully");
}
function displayTasksByStatus(status, container) {
    console.log("display tasks Status");
    container.innerHTML = "";
    const filteredTasks = tasks.filter((task) => task.status === status);
    filteredTasks.forEach((task) => {
        const li = document.createElement("li");
        li.textContent = task.name;
        li.draggable = true;
        li.dataset.name = task.name;
        li.dataset.status = task.status;
        li.addEventListener("dragstart", handleDragStart);
        li.addEventListener("dragend", handleDragEng);
        container.appendChild(li);
    });
}
function displayAllTasks() {
    displayTasksByStatus(Status.ToDo, containerTasksTodoDisplay);
    displayTasksByStatus(Status.Doing, containerTasksDoingDisplay);
    displayTasksByStatus(Status.Done, containerTasksDoneDisplay);
}
addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const taskName = inputField?.value.trim();
    if (!taskName) {
        alert("Please enter a task name.");
        return;
    }
    const newTask = {
        name: taskName,
        status: Status.ToDo,
    };
    tasks.push(newTask);
    inputField.value = "";
    displayAllTasks();
    console.log("Task added:", newTask);
});
// console.log("here");
displayAllTasks();
setUpDropZones();
