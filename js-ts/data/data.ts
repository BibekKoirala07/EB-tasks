import { displayAllTasks } from "../dom/renderTasks";
import { Status, TypeTask } from "../types/types";

export let tasks: TypeTask[] = [
  { name: "Learn TypeScript", status: Status.ToDo },
  { name: "Learn Java script", status: Status.ToDo },
  { name: "Build Task App", status: Status.Doing },
  { name: "Build Uber", status: Status.Doing },
  { name: "Deploy to GitHub", status: Status.Done },
  { name: "Be real", status: Status.Done },
];

export function addTask(name: string): void {
  tasks.push({ name, status: Status.ToDo });
}

export function deleteTask(name: string): void {
  tasks = tasks.filter((task) => task.name !== name);
}

function addTasks(name: string) {
  tasks.push({ name: name, status: Status.ToDo });
}

function deleteTasks(name: string) {
  tasks = tasks.filter((each) => each.name != name);
}

export function moveTask(
  taskName: string,
  oldStatus: Status,
  newStatus: Status
): void {
  console.log(`Moving ${taskName} from ${oldStatus} to ${newStatus}`);

  const taskToMove = tasks.find(
    (task) => task.name === taskName && task.status === oldStatus
  );

  if (!taskToMove) {
    console.log("Task not found!!");
    return;
  }

  taskToMove.status = newStatus;

  displayAllTasks();
  console.log("Task moved successfully");
}
