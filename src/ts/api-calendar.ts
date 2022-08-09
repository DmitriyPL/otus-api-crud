import { findIndex, filter, indexOf } from "lodash";

export interface Task {
  id: number;
  text: string;
  date: string;
  status: "done" | "inprogress" | "paused" | "declare";
  tags: string[];
}

function readAllTasks(db: string): Promise<Task[]> {
  return new Promise((resolve, reject) => {
    const dbStorage = localStorage.getItem(db);
    if (dbStorage === null) {
      reject(new Error("DB not found"));
    }

    const allTasks: Task[] = JSON.parse(dbStorage as string);

    resolve(allTasks);
  });
}

function findTaskByID(tasks: Task[], id: number) {
  const index = findIndex(tasks, ["id", id]);
  if (index != -1) {
    return tasks[index];
  } else {
    return "not found";
  }
}

function deleteTaskByID(tasks: Task[], id: number) {
  const index = findIndex(tasks, ["id", id]);
  if (index != -1) {
    tasks.splice(index, 1);
    return tasks;
  } else {
    return "not found";
  }
}

function updateTaskByID(tasks: Task[], newTask: Task) {
  const index = findIndex(tasks, ["id", newTask.id]);
  if (index != -1) {
    const task = tasks[index];
    task.date = newTask.date;
    task.status = newTask.status;
    task.text = newTask.text;
    task.tags = newTask.tags;
    return tasks;
  } else {
    return "not found";
  }
}

function filterTasksByTag(tasks: Task[], tag: string) {
  const res: Task[] = [];
  tasks.forEach((task) => {
    if (indexOf(task.tags, tag) != -1) {
      res.push(task);
    }
  });
  return res;
}

function filterTasksByStatus(tasks: Task[], key: string, val: string) {
  return filter(tasks, [key, val]);
}

export function dbInit(db: string) {
  localStorage.setItem(db, JSON.stringify([]));
}

export async function createTask(db: string, task: Task) {
  const tasks = await readAllTasks(db);
  tasks.push(task);
  localStorage.setItem(db, JSON.stringify(tasks));
}

export async function readTask(db: string, id: number) {
  const tasks = await readAllTasks(db);
  return findTaskByID(tasks, id);
}

export async function updateTask(db: string, newTask: Task) {
  const tasks = await readAllTasks(db);
  const newTasks = updateTaskByID(tasks, newTask);
  localStorage.setItem(db, JSON.stringify(newTasks));
}

export async function deleteTask(db: string, id: number) {
  const tasks = await readAllTasks(db);
  const newTasks = deleteTaskByID(tasks, id);
  localStorage.setItem(db, JSON.stringify(newTasks));
}

export async function filterTasks(db: string, key: string, val: string[]) {
  const tasks = await readAllTasks(db);
  const res: Task[][] = [];
  switch (key) {
    case "status":
      val.forEach((status) => {
        res.push(filterTasksByStatus(tasks, key, status));
      });
      break;
    case "tags":
      val.forEach((tag) => {
        res.push(filterTasksByTag(tasks, tag));
      });
  }
  return res;
}

export async function main() {
  const today = new Date();

  const task1: Task = {
    id: 1,
    text: "go to the shop",
    date: today.toString(),
    status: "inprogress",
    tags: ["mom", "shop"],
  };

  dbInit("tasks");
  console.log(localStorage["tasks"]);
  await createTask("tasks", task1);
  const task = await readTask("tasks", 1);
  console.log(task);
  console.log(task1);
}
