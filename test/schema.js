const {types} = require('../index');

module.exports = {
    // types.object - is default
    // isRequired: false - is default
    props: {
        myString: {
            type: types.string,
            isRequired: true
        },
        myNumber: {
            type: types.number,
            isRequired: false
        },
        myBoolean: {
            type: types.boolean
        },
        myFunction: {
            type: types.function
        },
        myArray: {
            type: types.array,
            isRequired: true,

            props: {
                type: types.object,
                props: {
                    myProperty: {
                        type: types.number,
                        isRequired: true
                    }
                }
            }
        },
        mySecondArray: {
            type: types.array,
            isRequired: true,
            props: {
                type: types.number
            }
        },
        checkByFunction: {
            type: value => value < 3
        },
        checkByRegExp: {
            type: /my[\s\S]+RegExp/i
        }
    }
};
