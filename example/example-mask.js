const {createMask} = require('../index');

const schema = require('../test/schema');

const donor = {
    ss: 'ee',
    kk: {
        ll: {
            mm: {
                dd: ''
            }
        },
        yy: 1
    },
    nn: 11,
    bb: true,
    aa: [{gg: 1}, {gg: 2, cc: 1}],
    a1: [1, 2, 3],
    fn: () => {

    },
    cc: 2,
    re: 'MY RG',
    re3: /\d/
};

console.log(createMask(schema)(donor));
