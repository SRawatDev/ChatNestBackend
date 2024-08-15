import Validator from 'validatorjs';
const customvalidation = (body, rules) => {
    const validation = new Validator(body, rules);
    const allowedKeys = Object.keys(rules);
    const bodyKeys = Object.keys(body);
    const unexpectedKeys = bodyKeys.filter(key => !allowedKeys.includes(key));
    if (unexpectedKeys.length > 0) {
        unexpectedKeys.forEach(key => {
            validation.errors.add(key, `The ${key} field is not allowed.`);
        });
    }
    const originalFails = validation.fails;
    validation.fails = () => {
        return originalFails.call(validation) || unexpectedKeys.length > 0;
    };

    return validation;
};

export default customvalidation