import { Status } from "../types/types.js";
export let tasks = [
    { name: "Learn TypeScript", status: Status.ToDo },
    { name: "Learn Java script", status: Status.ToDo },
    { name: "Build Task App", status: Status.Doing },
    { name: "Build Uber", status: Status.Doing },
    { name: "Deploy to GitHub", status: Status.Done },
    { name: "Be real", status: Status.Done },
];
export function addTasks(name) {
    tasks.push({ name, status: Status.ToDo });
}
export function deleteTasks(name) {
    tasks = tasks.filter((task) => task.name !== name);
}
export function moveTask(taskName, oldStatus, newStatus) {
    const task = tasks.find((t) => t.name === taskName && t.status === oldStatus);
    if (!task)
        return false;
    task.status = newStatus;
    return true;
}
