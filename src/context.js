const { handler } = require('./handler');

// context is used to connect all handlers and allow bot to produce next action
const upcase = (data) => {
  console.log('Data', data);
  return data.toUpperCase();
};

let handlers = [
  upcase,
  handler
];

const compose = (f2, f1, ...data) => {
  return f2(f1.apply(null, data));
};

const context = (event, data) => {
  return compose(...handlers, event, data);
};

module.exports = { context };
