/* global describe, it */

const {assert} = require('chai');
const schema = require('./schema');
const {createChecker, types} = require('./../index');

describe('Type checker', () => {
    it('Check types', () => {
        const checker = createChecker(schema);

        const rawObject = {
            myObject: {
                property: 'value'
            },
            myString: 'my string',
            myNumber: 11,
            myBoolean: true,
            iShouldBeRemove: true, // will not check, cause schema has no this property
            myFunction: () => {
            },
            myArray: [
                {
                    myProperty: 1,
                    mySecondProperty: 'my second value 1' // will not check, cause schema has no this property
                },
                {
                    myProperty: 1,
                    mySecondProperty: 'my second value 2'
                },
                {
                    myProperty: 1,
                    mySecondProperty: 'my second value 3'
                }
            ],
            mySecondArray: [1, 2, 3]
        };

        assert(checker(rawObject).isValid);
    });

    it('Check required - passed', () => {
        const checker = createChecker({
            props: {
                myString: {
                    type: types.string,
                    isRequired: true
                }
            }
        });

        assert(checker({myString: 'my string'}).isValid);
    });

    it('Check required', () => {
        const checker = createChecker({
            props: {
                myString: {
                    type: types.string,
                    isRequired: true
                }
            }
        });

        const rawObject = {
            notMyString: 'not my string'
        };

        assert(checker(rawObject).isInvalid);
        assert(checker(rawObject).path === '/myString');
    });

    it('Check by function', () => {
        const checker = createChecker({
            props: {
                myValue: {
                    type: value => value < 10,
                    isRequired: true
                }
            }
        });

        assert(checker({myValue: 5}).isValid);
        assert(checker({myValue: 20}).isInvalid);
    });

    it('Check array', () => {
        const checker = createChecker({
            props: {
                array: {
                    type: types.array,
                    isRequired: true,
                    props: {
                        type: types.number,
                        isRequired: true
                    }
                }
            }
        });

        assert(checker({array: 'i am not array'}).isInvalid);
        assert(checker({array: [1, 'string', 3]}).isInvalid);
        assert(checker({array: [1, 2, 3]}).isValid);
    });

    it('Check by Re', () => {
        const checker = createChecker({
            props: {
                string: {
                    type: /js/i,
                    isRequired: true
                }
            }
        });

        assert(checker({string: 'js'}).isValid);
        assert(checker({string: 'love'}).isInvalid);
    });

    it('Not existing type', () => {
        const checker = createChecker({
            props: {
                string: {
                    type: 'wrongType',
                    isRequired: true
                }
            }
        });

        assert.throws(() => checker({string: 'js'}));
    });
});
