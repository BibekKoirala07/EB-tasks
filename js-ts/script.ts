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
  { name: "Learn Java script", status: Status.ToDo },

  { name: "Build Task App", status: Status.Doing },
  { name: "Build Uber", status: Status.Doing },

  { name: "Deploy to GitHub", status: Status.Done },
  { name: "Be real", status: Status.Done },
];

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
const containerTasksTodo = document.getElementById(
  "container-tasks-todo"
) as HTMLDivElement;
const containerTasksDoing = document.getElementById(
  "container-tasks-doing"
) as HTMLDivElement;
const containerTasksDone = document.getElementById(
  "container-tasks-done"
) as HTMLDivElement;

let draggedTasks: { name: string; status: Status } | null = null;

function checkDuplicateTaskName() {
  const taskName = inputField.value.trim();
  const isDuplicate = tasks.some(
    (task) => task.name.toLowerCase() === taskName.toLowerCase()
  );

  addBtn.disabled = taskName === "" || isDuplicate;
}

const handleDragLeave = (e: DragEvent) => {
  const parentDiv: HTMLDivElement = getParentDiv(
    e.currentTarget as HTMLUListElement
  );

  parentDiv.classList.remove("bg-blue");
};

function getParentDiv(element: HTMLUListElement): HTMLDivElement {
  return element.parentElement as HTMLDivElement;
}

inputField.addEventListener("input", checkDuplicateTaskName);

checkDuplicateTaskName();

function handleDragStart(e: DragEvent) {
  console.log("e in drag start", e);

  // here which task we're dragging
  const target = e.target as HTMLElement;

  const taskName = target.dataset.name!;
  const taskStatus = target.dataset.status!;

  draggedTasks = {
    name: taskName,
    status: taskStatus as Status,
  };

  //   console.log("Started dragging", draggedTasks);
}

function handleDragEng(e: DragEvent) {
  console.log("e in drag end", e);
  draggedTasks = null;
  console.log("finished dragging");
  [containerTasksDoing, containerTasksDone, containerTasksTodo].map((each) => {
    if (each) {
      each.classList.remove("bg-blue");
      each.classList.remove("bg-red");
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
  //   console.log("Dropped!!", draggedTasks);

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
    each.addEventListener("dragover", handleDragOver);
    each.addEventListener("dragleave", handleDragLeave);
    each.addEventListener("drop", handleDrop);
  });
}

function moveTask(
  taskName: string,
  oldStatus: Status,
  newStatus: Status
): void {
  console.log(`Moving ${taskName} from ${oldStatus} to ${newStatus}`);

  const taskToMove = tasks.find(
    (task) => task.name === taskName && task.status === oldStatus
  );

  if (!taskToMove) {
    console.log("Tak not found!!");
    return;
  }

  taskToMove.status = newStatus;

  displayAllTasks();
  console.log("Task moved successfully");
}

function deleteTask(name: string): void {
  const index = tasks.findIndex((task) => task.name === name);
  if (index !== -1) {
    tasks.splice(index, 1);
    displayAllTasks();
  }
}

function displayTasksByStatus(
  status: Status,
  container: HTMLUListElement
): void {
  console.log("display tasks Status");
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
      deleteTask(task.name);
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
