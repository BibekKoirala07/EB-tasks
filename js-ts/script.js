import { addTasks } from "./data/data.js";
import { checkDuplicateTaskName } from "./handlers/inputHandler.js";
import { setupDropZones } from "./ui/dropZones.js";
import { displayAllTasks } from "./ui/renderTasks.js";
document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("container-form-input");
    const addBtn = document.getElementById("container-form-btn");
    inputField.addEventListener("input", () => checkDuplicateTaskName(inputField, addBtn));
    addBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const taskName = inputField.value.trim();
        if (taskName) {
            addTasks(taskName);
            inputField.value = "";
            displayAllTasks();
        }
    });
    displayAllTasks();
    setupDropZones();
});
