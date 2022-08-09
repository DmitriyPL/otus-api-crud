import {
  Firestore,
  Timestamp,
  doc,
  collection,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

import type { DocumentData } from "firebase/firestore";

import { db } from "./api-db-init";

interface Task {
  text: string;
  date: Timestamp;
  status: string;
  tags: string[];
}

export async function createTask(db: Firestore, task: Task) {
  const tasksCollectionRef = collection(db, "tasks");
  const taskRef = doc(tasksCollectionRef);
  await setDoc(taskRef, task);
}

export async function readTask(db: Firestore, id: string) {
  const taskRef = doc(db, "tasks", id);
  const docTask = await getDoc(taskRef);

  if (docTask.exists()) {
    return docTask.data();
  } else {
    return "No such task!";
  }
}

export async function updateTask(db: Firestore, id: string, newTask: Task) {
  const taskRef = doc(db, "tasks", id);
  await setDoc(taskRef, newTask);
}

export async function deleteTask(db: Firestore, id: string) {
  const taskRef = doc(db, "tasks", id);
  await deleteDoc(taskRef);
}

export async function filterTasks(db: Firestore, key: string, val: string[]) {
  const tasksCollectionRef = collection(db, "tasks");

  const res: DocumentData[] = [];

  const q = query(tasksCollectionRef, where(key, "in", val));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const task = doc.data();
    res.push(task);
  });

  return res;
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

  await createTask(db, task1);
  const task1_id = "aaEWSQxW8b68Ash08nYD";
  console.log(await readTask(db, task1_id));
  console.log(await filterTasks(db, "status", ["done"]));
  await updateTask(db, task1_id, task2);
  console.log(await readTask(db, task1_id));
  await deleteTask(db, task1_id);
}
