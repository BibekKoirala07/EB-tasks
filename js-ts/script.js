"use strict";
function removeHoverClasses(parentDiv) {
    parentDiv.classList.remove("bg-blue");
    parentDiv.classList.remove("bg-red");
}
let tasks = [
    { name: "Learn TypeScript", status: Status.ToDo },
    { name: "Learn Java script", status: Status.ToDo },
    { name: "Build Task App", status: Status.Doing },
    { name: "Build Uber", status: Status.Doing },
    { name: "Deploy to GitHub", status: Status.Done },
    { name: "Be real", status: Status.Done },
];
/* ----------------- Container Form -------------------- */
const inputField = document.getElementById("container-form-input");
const addBtn = document.getElementById("container-form-btn");
/* ------------ Tasks Types Display Area --------------- */
const containerTasksTodoDisplay = document.getElementById("container-tasks-todo-display");
const containerTasksDoingDisplay = document.getElementById("container-tasks-doing-display");
const containerTasksDoneDisplay = document.getElementById("container-tasks-done-display");
/* ----------- Main Tasks Div ------------ */
const containerTasksTodo = document.querySelector(".container-tasks-todo");
const containerTasksDoing = document.querySelector(".container-tasks-doing");
const containerTasksDone = document.querySelector(".container-tasks-done");
console.log("container", containerTasksDoing, containerTasksDone, containerTasksTodo);
function addTasks(name) {
    tasks.push({ name: name, status: Status.ToDo });
}
function deleteTasks(name) {
    tasks = tasks.filter((each) => each.name != name);
}
function getParentDiv(element) {
    return element.parentElement;
}
let draggedTasks = null;
inputField.addEventListener("input", checkDuplicateTaskName);
checkDuplicateTaskName();
function checkDuplicateTaskName() {
    const taskName = inputField.value.trim();
    const isDuplicate = tasks.some((task) => task.name.toLowerCase() === taskName.toLowerCase());
    addBtn.disabled = taskName === "" || isDuplicate;
}
const handleDragLeave = (e) => {
    const parentDiv = getParentDiv(e.currentTarget);
    removeHoverClasses(parentDiv);
};
function handleDragStart(e) {
    const target = e.target;
    const taskName = target.dataset.name;
    const taskStatus = target.dataset.status;
    draggedTasks = {
        name: taskName,
        status: taskStatus,
    };
}
function handleDragEng(e) {
    console.log("e in drag end", e);
    draggedTasks = null;
    [containerTasksDoing, containerTasksDone, containerTasksTodo].map((each) => {
        if (each) {
            removeHoverClasses(each);
        }
    });
}
function handleDragOver(e) {
    console.log("handleDragOver", e.currentTarget);
    e.preventDefault();
    const oldStatus = draggedTasks?.status;
    const dragOverParent = getParentDiv(e.currentTarget);
    if (oldStatus === Status.ToDo &&
        dragOverParent.classList.contains("container-tasks-done")) {
        dragOverParent.classList.add("bg-red");
    }
    else {
        dragOverParent.classList.add("bg-blue");
    }
    console.log("dragOverParent", dragOverParent);
}
function handleDrop(e) {
    console.log("handleDrop", e);
    e.preventDefault();
    if (!draggedTasks)
        return;
    const dropZone = e.currentTarget;
    const columnId = dropZone.id;
    const oldStatus = draggedTasks.status;
    const dropParent = getParentDiv(dropZone);
    dropParent.classList.remove("bg-blue");
    let newStatus;
    if (columnId === "container-tasks-todo-display") {
        newStatus = Status.ToDo;
    }
    else if (columnId === "container-tasks-doing-display") {
        newStatus = Status.Doing;
    }
    else if (columnId === "container-tasks-done-display") {
        if (oldStatus === Status.ToDo) {
            alert("Invalid Move");
            return;
        }
        newStatus = Status.Done;
    }
    else {
        return; // invalid drop zone
    }
    console.log("newStatus", newStatus, columnId, dropZone);
    moveTask(draggedTasks.name, draggedTasks.status, newStatus);
}
function setUpDropZones() {
    console.log("setup Zones");
    [
        containerTasksDoingDisplay,
        containerTasksDoneDisplay,
        containerTasksTodoDisplay,
    ].forEach((each) => {
        console.log("each", each);
        each.addEventListener("dragover", handleDragOver);
        each.addEventListener("dragleave", handleDragLeave);
        each.addEventListener("drop", handleDrop);
    });
}
function moveTask(taskName, oldStatus, newStatus) {
    console.log(`Moving ${taskName} from ${oldStatus} to ${newStatus}`);
    const taskToMove = tasks.find((task) => task.name === taskName && task.status === oldStatus);
    if (!taskToMove) {
        console.log("Task not found!!");
        return;
    }
    taskToMove.status = newStatus;
    displayAllTasks();
    console.log("Task moved successfully");
}
function displayTasksByStatus(status, container) {
    container.innerHTML = "";
    const filteredTasks = tasks.filter((task) => task.status === status);
    filteredTasks.forEach((task) => {
        const li = document.createElement("li");
        li.classList.add("each-list");
        const span = document.createElement("span");
        span.textContent = task.name;
        span.classList.add("task-name");
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "🗑️";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.title = "Delete Task";
        li.appendChild(span);
        li.appendChild(deleteBtn);
        deleteBtn.addEventListener("click", () => {
            deleteTasks(task.name);
            displayTasksByStatus(status, container);
        });
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
    addTasks(taskName);
    inputField.value = "";
    displayAllTasks();
});
displayAllTasks();
setUpDropZones();
