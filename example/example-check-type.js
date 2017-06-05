const {createChecker} = require('../index');

const schema = require('../test/schema');

const obj = {
    ss: 'ee',
    nn: 11,
    bb: true,
    aa: [{gg: 1}, {gg: 2}],
    a1: [1, 2, 3],
    fn: function func() {

    },
    cc: 2,
    re: /MY RG/,
    emp: {}
};

console.log(createChecker(schema)(obj));
