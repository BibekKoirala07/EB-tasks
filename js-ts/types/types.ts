export enum Status {
  ToDo = "To do",
  Doing = "Doing",
  Done = "Done",
}

export type TypeTask = {
  name: string;
  status: Status;
};

export interface DraggedTask {
  // id: string;
  name: string;
  status: Status;
}
