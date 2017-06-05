/* global describe, it */

const {assert} = require('chai');
const schema = require('./schema');
const {createMask} = require('./../index');

describe('Mask', () => {
    it('Masking', () => {
        const mask = createMask(schema);

        function emptyFunction() {
        }

        const rawObject = {
            myObject: {
                property: 'value'
            },
            myString: 'my string',
            myNumber: 11,
            myBoolean: true,
            iShouldBeRemove: true, // will remove, cause schema has no this property
            myFunction: emptyFunction,
            myArray: [
                {
                    myProperty: 'my value 1',
                    mySecondProperty: 'my second value 1' // will remove, cause schema has no this property
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
            myObject: {
                property: 'value'
            },
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
