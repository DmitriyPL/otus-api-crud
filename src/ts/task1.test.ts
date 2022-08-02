import { getUserOrderStates, OrderState } from "./task1";

const states: OrderState[] = [
  "initial",
  "inWork",
  "buyingSupplies",
  "producing",
  "fullfilled",
];

describe("function getUserOrderStates", () => {
  it("getUserOrderStates to be instance of Function", () => {
    expect(getUserOrderStates).toBeInstanceOf(Function);
  });

  it("return ['initial', 'inWork', 'fullfilled']", () => {
    expect(getUserOrderStates(states)).toEqual([
      "initial",
      "inWork",
      "fullfilled",
    ]);
  });
});
