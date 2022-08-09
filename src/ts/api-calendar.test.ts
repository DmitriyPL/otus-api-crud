import {
  Task,
  dbInit,
  createTask,
  readTask,
  updateTask,
  deleteTask,
  filterTasks,
} from "./api-calendar";

import { getLocalStorageMock } from "./local-storege-mock";

global.localStorage = getLocalStorageMock();

const DB = "tasks";

const date1 = new Date("December 17, 1995 03:24:00");

const task1: Task = {
  id: 1,
  text: "do homework №28 (API)",
  date: date1.toString(),
  status: "done",
  tags: ["API", "firebase", "CRUD"],
};

const task1_update: Task = {
  id: 1,
  text: "do homework №28 (API)",
  date: date1.toString(),
  status: "inprogress",
  tags: ["API", "firebase", "CRUD"],
};

const task2: Task = {
  id: 2,
  text: "do homework №32 (redux)",
  date: date1.toString(),
  status: "paused",
  tags: ["redux", "API", "store"],
};

const task3: Task = {
  id: 3,
  text: "do homework №14 (weather)",
  date: date1.toString(),
  status: "done",
  tags: ["yandexmap"],
};

describe("function dbInit", () => {
  it("dbInit to be instance of Function", () => {
    expect(dbInit).toBeInstanceOf(Function);
  });

  it("dbInit create db in localStorege", () => {
    dbInit(DB);
    expect(localStorage.getItem(DB)).toBe("[]");
  });
});

describe("function createTask", () => {
  it("createTask to be instance of Function", () => {
    expect(createTask).toBeInstanceOf(Function);
  });

  it("create task in db", async () => {
    await createTask(DB, task1);
    expect(localStorage.getItem("tasks")).toBe(
      '[{"id":1,"text":"do homework №28 (API)","date":"Sun Dec 17 1995 03:24:00 GMT+0300 (Москва, стандартное время)","status":"done","tags":["API","firebase","CRUD"]}]'
    );
  });
});

describe("function readTask", () => {
  it("readTask to be instance of Function", () => {
    expect(readTask).toBeInstanceOf(Function);
  });

  it("read task from db", async () => {
    const task = await readTask(DB, 1);
    expect(task).toStrictEqual(task1);
  });
});

describe("function updateTask", () => {
  it("updateTask to be instance of Function", () => {
    expect(updateTask).toBeInstanceOf(Function);
  });

  it("update task to newTask", async () => {
    await updateTask(DB, task1_update);
    expect(localStorage.getItem("tasks")).toBe(
      '[{"id":1,"text":"do homework №28 (API)","date":"Sun Dec 17 1995 03:24:00 GMT+0300 (Москва, стандартное время)","status":"inprogress","tags":["API","firebase","CRUD"]}]'
    );
  });
});

describe("function deleteTask", () => {
  it("deleteTask to be instance of Function", () => {
    expect(deleteTask).toBeInstanceOf(Function);
  });

  it("delete task from db", async () => {
    await deleteTask(DB, 1);
    expect(localStorage.getItem(DB)).toBe("[]");
  });
});

describe("function filterTasks", () => {
  it("filterTasks to be instance of Function", () => {
    expect(filterTasks).toBeInstanceOf(Function);
  });

  it("filter task by 'status' and 'tags'", async () => {
    await createTask(DB, task1);
    await createTask(DB, task2);
    await createTask(DB, task3);

    const filtered1 = await filterTasks(DB, "status", ["done"]);
    expect(filtered1).toStrictEqual([
      [
        {
          date: "Sun Dec 17 1995 03:24:00 GMT+0300 (Москва, стандартное время)",
          id: 1,
          status: "done",
          tags: ["API", "firebase", "CRUD"],
          text: "do homework №28 (API)",
        },
        {
          date: "Sun Dec 17 1995 03:24:00 GMT+0300 (Москва, стандартное время)",
          id: 3,
          status: "done",
          tags: ["yandexmap"],
          text: "do homework №14 (weather)",
        },
      ],
    ]);

    const filtered2 = await filterTasks(DB, "tags", ["firebase", "yandexmap"]);
    expect(filtered2).toStrictEqual([
      [
        {
          date: "Sun Dec 17 1995 03:24:00 GMT+0300 (Москва, стандартное время)",
          id: 1,
          status: "done",
          tags: ["API", "firebase", "CRUD"],
          text: "do homework №28 (API)",
        },
      ],
      [
        {
          date: "Sun Dec 17 1995 03:24:00 GMT+0300 (Москва, стандартное время)",
          id: 3,
          status: "done",
          tags: ["yandexmap"],
          text: "do homework №14 (weather)",
        },
      ],
    ]);
  });
});
