const zipObject = require('lodash.zipobject');

const makeActionCreator =
  (type, ...keys) => (...vals) =>
    Object.assign({ type }, zipObject(keys, vals));

export default makeActionCreator;
