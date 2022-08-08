
import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'

import { findIndex, filter, indexOf } from "lodash";




interface Task {
  id: number;
  text: string;
  date: Date;
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

export function dbInit(nameDN: string) {
  // The first argument is the database filename. If no extension, '.json' is assumed and automatically added.
  // The second argument is used to tell the DB to save after each push
  // If you put false, you'll have to call the save() method.
  // The third argument is to ask JsonDB to save the database in an human readable format. (default false)
  // The last argument is the separator. By default it's slash (/)
  return new JsonDB(new Config(nameDN, true, true, '/'));
}

async function readTask(db: string, id: number) {
  const tasks = await readAllTasks(db);
  return findTaskByID(tasks, id);
}

async function createTask(db: string, task: Task) {
  const tasks = await readAllTasks(db);
  tasks.push(task);
  localStorage.setItem(db, JSON.stringify(tasks));
}

async function deleteTask(db: string, id: number) {
  const tasks = await readAllTasks(db);
  const newTasks = deleteTaskByID(tasks, id);
  localStorage.setItem(db, JSON.stringify(newTasks));
}

async function updateTask(db: string, newTask: Task) {
  const tasks = await readAllTasks(db);
  const newTasks = updateTaskByID(tasks, newTask);
  localStorage.setItem(db, JSON.stringify(newTasks));
}

async function filterTasks(db: string, key: string, val: string[]) {
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

export async function main_jsondb() {
  const task1: Task = {
    id: 1,
    text: "go to the shop",
    date: new Date(),
    status: "inprogress",
    tags: ["mom", "shop"],
  };

  const task2: Task = {
    id: 2,
    text: "clean kitchen",
    date: new Date(),
    status: "paused",
    tags: ["mom", "dad"],
  };

  const task3: Task = {
    id: 3,
    text: "buy new desk",
    date: new Date(),
    status: "done",
    tags: ["dad", "bob"],
  };

  const task1_update: Task = {
    id: 1,
    text: "go to the shop",
    date: new Date(),
    status: "done",
    tags: ["mom", "shop"],
  };

  const DB = dbInit("tasksDB");
  // console.log(localStorage["tasks"]);
  // await createTask("tasks", task1);
  // console.log(await readTask("tasks", 1));
  // // await deleteTask('tasks', 1);
  // // console.log(localStorage['tasks']);
  // await updateTask("tasks", task1_update);
  // console.log(localStorage["tasks"]);

  // await createTask("tasks", task2);
  // await createTask("tasks", task3);

  // console.log(localStorage["tasks"]);

  // console.log(await filterTasks("tasks", "status", ["done", "paused"]));
  // console.log(await filterTasks("tasks", "tags", ["shop"]));
}
