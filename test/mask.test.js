/* global describe, it */

const {assert} = require('chai');
const schema = require('./schema');
const {createMask} = require('./../index');

describe('Mask', () => {
    it('Masking', () => {
        const mask = createMask(schema);

        function emptyFunction() {
            console.log('I need for test only');
        }

        const rawObject = {
            myString: 'my string',
            myNumber: 11,
            myBoolean: true,
            myFunction: emptyFunction,
            myArray: [
                {
                    myProperty: 'my value 1',
                    mySecondProperty: 'my second value 1'
                },
                {
                    myProperty: 'my value 2',
                    mySecondProperty: 'my second value 2'
                },
                {
                    myProperty: 'my value 3',
                    mySecondProperty: 'my second value 3'
                }
            ],
            mySecondArray: [1, 2, 3]
        };

        const dryObject = {
            myString: 'my string',
            myNumber: 11,
            myBoolean: true,
            myFunction: emptyFunction,
            myArray: [
                {
                    myProperty: 'my value 1'
                },
                {
                    myProperty: 'my value 2'
                },
                {
                    myProperty: 'my value 3'
                }
            ],
            mySecondArray: [1, 2, 3]
        };

        assert.deepEqual(mask(rawObject), dryObject);
    });
});
