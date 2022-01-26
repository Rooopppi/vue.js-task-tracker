const _ = require("lodash");
const { tasks } = require("./db.json");

// Higher order functions
function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

// function partial(fn) {
//   const fixed = _.tail(_.toArray(arguments));
//   return function () {
//     return fn.apply(this, _.concat(fixed, arguments));
//   };
// }

const double = _.partial(multiply, 2);
// console.log(double(10));

const half = _.partial(divide, 2);
// console.log(half(4));

// ==============================

const curriedDivide = _.curry(divide);

// console.log(curriedDivide(10, 2));
// console.log(curriedDivide(10)(2));

// ===============================

const notFlatArray = [1, 2, 3, [4, 5]];

const sumFlat = _.flow([_.concat, _.flattenDeep, _.sum]);

// console.log(sumFlat(notFlatArray));

// Data filtration

const output = _(tasks)
  .filter((task) => task.time > 50000)
  .countBy((task) => task.text)
  .toPairs()
  .map((task) => _.zipObject(["text", "times"], task))
  .orderBy((task) => task.text, "desc")
  .take(3)
  .value();

// console.log(output);

// ============================

const greaterThan = _.curryRight(_.gte);
const timeGreaterThan = (num) => _.conforms({ time: greaterThan(num) });
const zip = _.curry(_.zipObject);

const out = _(tasks)
  .filter(timeGreaterThan(50000))
  .countBy("text")
  .toPairs()
  .map(zip(["text", "id"]))
  .orderBy("text", "desc")
  .value()

console.log(out);
