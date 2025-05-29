import { deleteTask, tasks } from "../data/data";
import { Status } from "../types/types";
import { displays } from "./domreferences";

function displayTasksByStatus(
  status: Status,
  container: HTMLUListElement
): void {
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
    // li.addEventListener("dragstart", handleDragStart);
    // li.addEventListener("dragend", handleDragEng);
    container.appendChild(li);
  });
}

export function displayAllTasks(): void {
  displayTasksByStatus(Status.ToDo, displays["To do"]);
  displayTasksByStatus(Status.Doing, displays.Doing);
  displayTasksByStatus(Status.Done, displays.Done);
}
