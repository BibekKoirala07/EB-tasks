var Status;
(function (Status) {
    Status["ToDo"] = "To do";
    Status["Doing"] = "Doing";
    Status["Done"] = "Done";
})(Status || (Status = {}));
var tasks = [
    { name: "Learn TypeScript", status: Status.ToDo },
    { name: "Learn TypeScript", status: Status.ToDo },
    { name: "Learn TypeScript", status: Status.ToDo },
    { name: "Build Task App", status: Status.Doing },
    { name: "Build Task App", status: Status.Doing },
    { name: "Build Task App", status: Status.Doing },
    { name: "Deploy to GitHub", status: Status.Done },
    { name: "Deploy to GitHub", status: Status.Done },
    { name: "Deploy to GitHub", status: Status.Done },
];
var inputField = document.getElementById("container-form-input");
var addBtn = document.getElementById("container-form-btn");
/* ------------ Tasks Types --------------- */
var containerTasksTodoDisplay = document.getElementById("container-tasks-todo-display");
var containerTasksDoingDisplay = document.getElementById("container-tasks-doing-display");
var containerTasksDoneDisplay = document.getElementById("container-tasks-done-display");
var draggedTasks = null;
function handleDragStart(e) {
    console.log("e in drag start", e);
}
function handleDragEng(e) {
    console.log("e in drag end", e);
}
function displayTasksByStatus(status, container) {
    container.innerHTML = "";
    var filteredTasks = tasks.filter(function (task) { return task.status === status; });
    filteredTasks.forEach(function (task) {
        var li = document.createElement("li");
        li.textContent = task.name;
        li.draggable = true;
        li.dataset.name = task.name;
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
addBtn.addEventListener("click", function (e) {
    e.preventDefault();
    var taskName = inputField === null || inputField === void 0 ? void 0 : inputField.value.trim();
    if (!taskName) {
        alert("Please enter a task name.");
        return;
    }
    var newTask = {
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
