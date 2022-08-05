import { findIndex } from "lodash";

interface Task {
  id: number;
  text: string;
  date: Date;
  status: "done" | "inprogress" | "paused" | "declare";
  tegs: string[];
}

function readAllTasks(db:string) : Promise<Task[]> {
  return new Promise((resolve, reject) => {

    const dbStorage = localStorage.getItem(db);
    if (dbStorage === null) {
      reject(new Error("DB not found"));
    } 

    const allTasks : Task[] = JSON.parse(dbStorage as string);

    resolve(allTasks);

  });
}

function findTaskByID(tasks:Task[], id: number){
  const index = findIndex(tasks, ['id', id] );
  if (index != -1) {
    return tasks[index];
  } else {
    return 'not found';
  } 
}

function deleteTaskByID(tasks:Task[], id: number){
  const index = findIndex(tasks, ['id', id] );
  if (index != -1) {
    tasks.splice(index, 1);
    return tasks;
  } else {
    return 'not found';
  } 
}

function updateTaskByID(tasks:Task[], newTask: Task){
  const index = findIndex(tasks, ['id', newTask.id] );
  if (index != -1) {
    const task = tasks[index]
    task.date = newTask.date;
    task.status = newTask.status;
    task.text = newTask.text;
    task.tegs = newTask.tegs;
    return tasks;
  } else {
    return 'not found';
  }
}

function dbInit(db:string) {
  localStorage.setItem(db, JSON.stringify([]));
}

async function readTask(db:string, id:number) {
  const tasks = await readAllTasks(db);
  return findTaskByID(tasks, id);
}

async function createTask(db:string, task: Task) {
  const tasks = await readAllTasks(db);
  tasks.push(task);
  localStorage.setItem(db, JSON.stringify(tasks))
}

async function deleteTask(db:string, id:number) {
  const tasks = await readAllTasks(db);
  const newTasks = deleteTaskByID(tasks, id);
  localStorage.setItem(db, JSON.stringify(newTasks));
}

async function updateTask(db:string, newTask:Task) {
  const tasks = await readAllTasks(db);  
  const newTasks = updateTaskByID(tasks, newTask);
  localStorage.setItem(db, JSON.stringify(newTasks));
}


export async function main() {

  const task1: Task = {
    id : 1,
    text: "go to the shop",
    date: new Date,
    status: "inprogress",
    tegs: ['mom', 'shop']  
  }

  const task1_update: Task = {
    id : 1,
    text: "go to the shop",
    date: new Date,
    status: "done",
    tegs: ['mom', 'shop']  
  }

  dbInit('tasks');
  console.log(localStorage['tasks']);
  await createTask('tasks', task1);
  console.log(await readTask('tasks', 1));
  // await deleteTask('tasks', 1);
  // console.log(localStorage['tasks']);
  await updateTask('tasks', task1_update);
  console.log(localStorage['tasks']);
}