/* global describe, it */

const {assert} = require('chai');
const schema = require('./schema');
const {createChecker, types} = require('./../index');

describe('Type checker', () => {
    it('Check types', () => {
        const checker = createChecker(schema);

        function emptyFunction() {
            console.log('I need for test only');
        }

        const rawObject = {
            myString: 'my string',
            myNumber: 11,
            myBoolean: true,
            iShouldBeRemove: true, // will remove, cause schema has no this property
            myFunction: emptyFunction,
            myArray: [
                {
                    myProperty: 1,
                    mySecondProperty: 'my second value 1' // will remove, cause schema has no this property
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

        const checkResult = checker(rawObject);

        assert(checkResult.isValid === true);
        assert(checkResult.isInvalid === false);
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

        const rawObject = {
            myString: 'my string'
        };

        const checkResult = checker(rawObject);

        assert(checkResult.isValid === true);
        assert(checkResult.isInvalid === false);
    });

    it('Check required - fail', () => {
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

        const checkResult = checker(rawObject);

        assert(checkResult.isValid === false);
        assert(checkResult.isInvalid === true);
        assert(checkResult.path === '/myString');
    });
});
