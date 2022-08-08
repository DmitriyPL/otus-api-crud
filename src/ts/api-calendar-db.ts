import { findIndex, filter, indexOf } from "lodash";
import { Firestore, setDoc, getDoc, doc, collection, Timestamp } from "firebase/firestore";
import { db } from './api-db-init';

interface Task {
  text: string;
  date: Timestamp;
  status: string;
  tags: string[];
}

async function createTask(db: Firestore, task: Task) {
  const tasksCollectionRef = collection(db, 'tasks');
  const taskRef = doc(tasksCollectionRef);
  await setDoc(taskRef, task);
}

async function readTask(db: Firestore, id: string) {
  const taskRef = doc(db, "tasks", id);
  const docTask = await getDoc(taskRef);

  if (docTask.exists()) {
    return docTask.data();
  } else {
    return "No such task!";
  }
}

async function updateTask(db: Firestore, newTask: Task) {

}

async function deleteTask(db: Firestore, id: number) {

}

async function filterTasks(db: Firestore, key: string, val: string[]) {

}

export async function mainFirebase() {
  const task1: Task = {
    text: "go to the shop",
    date: Timestamp.fromDate(new Date()),
    status: "inprogress",
    tags: ["mom", "shop"],
  };

  const task2: Task = {
    text: "clean kitchen",
    date: Timestamp.fromDate(new Date()),
    status: "paused",
    tags: ["mom", "dad"],
  };

  const task3: Task = {
    text: "buy new desk",
    date: Timestamp.fromDate(new Date()),
    status: "done",
    tags: ["dad", "bob"],
  };

  const task1_update: Task = {
    text: "go to the shop",
    date: Timestamp.fromDate(new Date()),
    status: "done",
    tags: ["mom", "shop"],
  };

  // await createTask(db, task1);
  const task1_id : string = "aaEWSQxW8b68Ash08nYD";
  console.log(await readTask(db, task1_id));
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
