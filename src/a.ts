// function addN<T>(a: T, b: T): T {
//   return a + b;
// }

type Add<T> = (a: T, b: T) => T;
const addN: Add<number> = (a, b) => a * b;

addN(1, 2);

const addZ = <T = number>(): T => 10;

addZ();

export {};
