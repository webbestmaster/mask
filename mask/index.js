function canCopyAsValue(value) {
    const type = typeof value;

    return ['function', 'string', 'number', 'boolean'].indexOf(type) !== -1 || value instanceof RegExp;
}

function maskArray(schema, donor) {
    return schema.props && schema.props.props ?
        donor.map(item => mask(schema.props, item, {})) :
        donor.map(item => item);
}

// schema, donor, receiver
function mask(schema, donor, receiver) {
    Object.keys(schema.props).forEach(schemaKey => {
        if (!donor.hasOwnProperty(schemaKey)) {
            return;
        }

        const value = donor[schemaKey];

        if (canCopyAsValue(value)) {
            Object.assign(receiver, {[schemaKey]: value});
            return;
        }

        if (Array.isArray(value)) {
            Object.assign(receiver, {[schemaKey]: maskArray(schema.props[schemaKey], value)});
            return;
        }

        // here is should be an object, cause canCopyAsValue return false and Array.isArray return false too
        Object.assign(receiver, {[schemaKey]: mask(schema.props[schemaKey], value, {})});
    });

    return receiver;
}

module.exports = mask;
