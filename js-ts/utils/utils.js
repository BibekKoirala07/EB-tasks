export function removeHoverClasses(parentDiv) {
    parentDiv.classList.remove("bg-blue");
    parentDiv.classList.remove("bg-red");
}
export function getParentDiv(element) {
    return element.parentElement;
}
