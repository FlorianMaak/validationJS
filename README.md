# validationJS
A compact and dynamic ES6 Validation-Class

# Usage
Include js-file before the closing body-tag of your document.
```html
<script src="/path/to/ValidationJS.js"></script>
```

Now create a new instance of the validationJS-class with your config and you are ready to start.
```html
var validator = new ValidationJS(validatorConfig);
```

# Configuration
The configuration is build as an object and needs to get passed to the ValidationJSs constructor.

## Example
```js
var validatorConfig = {
    validationSelector: '.validation',  // (default: .validation) Class to apply validator to
    triggerOn: 'submit',                // (default: submit)      Event that should trigger validation
    preventDefault: true,               // (default: false)       Disable common behaviour?
    onValid: (form) => {                // (default: undefined)   Function to get executed after successfull validation
        console.log(form);
    },
    onInvalid: (form) => {              // (default: undefined)   Function to get executed after failed validation
        console.log(form);
    }
};
```

## Parameters
*validationSelector*: (string) The validation-selector. (class, id, or any other selector)
*triggerOn*: (string) The form-event that should trigger validation
*preventDefault*: (boolean) Cancel events?
*onValid*: (function) Function to get executed after successfull validation
*onInvalid*: (function) Function to get executed after failed validation

# Methods

## destruct()
Destroys the current validator-instance, but keeps config to restore validation

## restore()
Restores validator, based on current configuration

## validate(vgroup)
Triggers validation manually, inluding classes and function-execution

## isValid(vgroup)
Returns validation-state (boolean)
