/* eslint-disable no-underscore-dangle */

class Info {
    constructor() {
        const info = this;

        info._currentKey = '';
        info._keys = [];
        info._errorMessage = '';
        info._errorState = {
            type: null,
            value: null
        };
    }

    setErrorMessage(text) {
        this._errorMessage = text;
    }

    setCurrentKey(key) {
        this._currentKey = key;
    }

    getCurrentKey() {
        return this._currentKey;
    }

    pushKey(key) {
        this._keys.push(key);
    }

    popKey() {
        this._keys.pop();
    }

    setCurrentState(type, value) {
        Object.assign(this._errorState, {
            type: typeof type === 'function' ? type.toString() : type,
            value
        });
    }

    getState() {
        const info = this;

        if (info._errorMessage) {
            return {
                isValid: false,
                isInvalid: true,
                message: info._errorMessage,
                path: info._keys.join('/'),
                state: info._errorState
            };
        }

        return {
            isValid: true,
            isInvalid: false
        };
    }
}

module.exports = Info;
