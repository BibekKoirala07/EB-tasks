import { addTask, moveTask, tasks } from "./data/data";
import { displayAllTasks } from "./dom/renderTasks.js";
import { DraggedTask, Status, TypeTask } from "./types/types.js";
import { removeHoverClasses } from "./utils/utils";

/* ----------------- Container Form -------------------- */

const inputField = document.getElementById(
  "container-form-input"
) as HTMLInputElement;

const addBtn = <HTMLButtonElement>document.getElementById("container-form-btn");

/* ------------ Tasks Types Display Area --------------- */

const containerTasksTodoDisplay = document.getElementById(
  "container-tasks-todo-display"
) as HTMLUListElement;
const containerTasksDoingDisplay = document.getElementById(
  "container-tasks-doing-display"
) as HTMLUListElement;
const containerTasksDoneDisplay = document.getElementById(
  "container-tasks-done-display"
) as HTMLUListElement;

/* ----------- Main Tasks Div ------------ */

const containerTasksTodo = document.querySelector(
  ".container-tasks-todo"
) as HTMLDivElement;
const containerTasksDoing = document.querySelector(
  ".container-tasks-doing"
) as HTMLDivElement;
const containerTasksDone = document.querySelector(
  ".container-tasks-done"
) as HTMLDivElement;

console.log(
  "container",
  containerTasksDoing,
  containerTasksDone,
  containerTasksTodo
);

function getParentDiv(element: HTMLUListElement): HTMLDivElement {
  return element.parentElement as HTMLDivElement;
}

let draggedTasks: DraggedTask | null = null;

inputField.addEventListener("input", checkDuplicateTaskName);
checkDuplicateTaskName();
function checkDuplicateTaskName(): void {
  const taskName = inputField.value.trim();
  const isDuplicate = tasks.some(
    (task) => task.name.toLowerCase() === taskName.toLowerCase()
  );
  addBtn.disabled = taskName === "" || isDuplicate;
}

const handleDragLeave = (e: DragEvent): void => {
  const parentDiv: HTMLDivElement = getParentDiv(
    e.currentTarget as HTMLUListElement
  );
  removeHoverClasses(parentDiv);
};

function handleDragStart(e: DragEvent) {
  const target = e.target as HTMLElement;

  const taskName = target.dataset.name!;
  const taskStatus = target.dataset.status!;

  draggedTasks = {
    name: taskName,
    status: taskStatus as Status,
  };
}

function handleDragEng(e: DragEvent) {
  console.log("e in drag end", e);
  draggedTasks = null;
  [containerTasksDoing, containerTasksDone, containerTasksTodo].map((each) => {
    if (each) {
      removeHoverClasses(each);
    }
  });
}

function handleDragOver(e: DragEvent) {
  console.log("handleDragOver", e.currentTarget);
  e.preventDefault();
  const oldStatus: Status = <Status>draggedTasks?.status;
  const dragOverParent: HTMLDivElement = getParentDiv(
    e.currentTarget as HTMLUListElement
  );

  if (
    oldStatus === Status.ToDo &&
    dragOverParent.classList.contains("container-tasks-done")
  ) {
    dragOverParent.classList.add("bg-red");
  } else {
    dragOverParent.classList.add("bg-blue");
  }
  console.log("dragOverParent", dragOverParent);
}

function handleDrop(e: DragEvent) {
  console.log("handleDrop", e);
  e.preventDefault();

  if (!draggedTasks) return;

  const dropZone = e.currentTarget as HTMLElement;
  const columnId = dropZone.id;
  const oldStatus: Status = draggedTasks.status;
  const dropParent: HTMLDivElement = getParentDiv(dropZone as HTMLUListElement);
  dropParent.classList.remove("bg-blue");

  let newStatus: Status;

  if (columnId === "container-tasks-todo-display") {
    newStatus = Status.ToDo;
  } else if (columnId === "container-tasks-doing-display") {
    newStatus = Status.Doing;
  } else if (columnId === "container-tasks-done-display") {
    if (oldStatus === Status.ToDo) {
      alert("Invalid Move");
      return;
    }
    newStatus = Status.Done;
  } else {
    return; // invalid drop zone
  }
  console.log("newStatus", newStatus, columnId, dropZone);

  moveTask(draggedTasks.name, draggedTasks.status, newStatus);
}

function setUpDropZones(): void {
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

// function displayTasksByStatus(
//   status: Status,
//   container: HTMLUListElement
// ): void {
//   container.innerHTML = "";

//   const filteredTasks = tasks.filter((task) => task.status === status);

//   filteredTasks.forEach((task) => {
//     const li = document.createElement("li");
//     li.classList.add("each-list");

//     const span = document.createElement("span");
//     span.textContent = task.name;
//     span.classList.add("task-name");

//     const deleteBtn = document.createElement("button");
//     deleteBtn.textContent = "🗑️";
//     deleteBtn.classList.add("delete-btn");
//     deleteBtn.title = "Delete Task";

//     li.appendChild(span);
//     li.appendChild(deleteBtn);

//     deleteBtn.addEventListener("click", () => {
//       deleteTasks(task.name);
//       displayTasksByStatus(status, container);
//     });

//     li.draggable = true;
//     li.dataset.name = task.name;
//     li.dataset.status = task.status;
//     li.addEventListener("dragstart", handleDragStart);
//     li.addEventListener("dragend", handleDragEng);
//     container.appendChild(li);
//   });
// }

// function displayAllTasks(): void {
//   displayTasksByStatus(Status.ToDo, containerTasksTodoDisplay);
//   displayTasksByStatus(Status.Doing, containerTasksDoingDisplay);
//   displayTasksByStatus(Status.Done, containerTasksDoneDisplay);
// }

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const taskName = inputField?.value.trim();
  addTask(taskName);
  inputField.value = "";
  displayAllTasks();
});

displayAllTasks();
setUpDropZones();
