// type checker
const CheckTypeInfo = require('./check-type/info');
const checkType = require('./check-type/');
const types = require('./check-type/types.json');

function check(schema, obj) {
    const checkTypeInfo = new CheckTypeInfo();

    checkType(schema, obj, checkTypeInfo);

    return checkTypeInfo.getState();
}

module.exports.createChecker = schema => obj => check(schema, obj);
module.exports.types = types;

// mask
const mask = require('./mask');

module.exports.createMask = schema => donor => mask(schema, donor, {});
