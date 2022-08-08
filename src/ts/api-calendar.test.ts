import { dbInit } from "./api-calendar";

// const states: OrderState[] = [
//   "initial",
//   "inWork",
//   "buyingSupplies",
//   "producing",
//   "fullfilled",
// ];

describe("function dbInit", () => {
    it("dbInit to be instance of Function", () => {
        expect(dbInit).toBeInstanceOf(Function);
  });
});  

//   it("return ['initial', 'inWork', 'fullfilled']", () => {
//     expect(getUserOrderStates(states)).toEqual([
//       "initial",
//       "inWork",
//       "fullfilled",
//     ]);
//   });
// });
