export function removeHoverClasses(parentDiv: HTMLDivElement) {
  parentDiv.classList.remove("bg-blue");
  parentDiv.classList.remove("bg-red");
}

export function getParentDiv(element: HTMLElement): HTMLDivElement {
  return element.parentElement as HTMLDivElement;
}
