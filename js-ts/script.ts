enum Status {
  ToDo = "To do",
  Doing = "Doing",
  Done = "Done",
}

type TypeTask = {
  name: string;
  status: Status;
};

const tasks: TypeTask[] = [
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

const inputField = document.getElementById(
  "container-form-input"
) as HTMLInputElement;
const addBtn = <HTMLButtonElement>document.getElementById("container-form-btn");

/* ------------ Tasks Types --------------- */
const containerTasksTodoDisplay = document.getElementById(
  "container-tasks-todo-display"
) as HTMLUListElement;
const containerTasksDoingDisplay = document.getElementById(
  "container-tasks-doing-display"
) as HTMLUListElement;
const containerTasksDoneDisplay = document.getElementById(
  "container-tasks-done-display"
) as HTMLUListElement;

let draggedTasks: { name: string } | null = null;

function handleDragStart(e: DragEvent) {
  console.log("e in drag start", e);
}

function handleDragEng(e: DragEvent) {
  console.log("e in drag end", e);
}

function handleDragOver(e: DragEvent) {
  e.preventDefault();
  console.log("Dragging over drop zone.");
}

function handleDrop(e: DragEvent) {
  e.preventDefault();
  console.log("Dropped!!");

  const dropZone = e.target as HTMLElement;

  moveTask();
}

function setUpDropZones() {
  [
    containerTasksDoingDisplay,
    containerTasksDoneDisplay,
    containerTasksTodoDisplay,
  ].forEach((each) => {
    each.addEventListener("dragover", handleDragOver);
    each.addEventListener("drop", handleDrop);
  });
}

function moveTask() {}

function displayTasksByStatus(
  status: Status,
  container: HTMLUListElement
): void {
  container.innerHTML = "";

  const filteredTasks = tasks.filter((task) => task.status === status);

  filteredTasks.forEach((task) => {
    const li = document.createElement("li");
    li.textContent = task.name;
    li.draggable = true;
    li.dataset.name = task.name;
    li.addEventListener("dragstart", handleDragStart);
    li.addEventListener("dragend", handleDragEng);
    container.appendChild(li);
  });
}

function displayAllTasks(): void {
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

  const newTask: TypeTask = {
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
