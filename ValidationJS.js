class ValidationJS {
    constructor(config = {}) {
        this.config = config;
        this.forms = this._buildValidator();
    }


    /**
     * Add forms and inputs to forms-member and apply listeners
     * @return {Array} of Forms, including inputs
     */
    _buildValidator() {
        let formElements = document.querySelectorAll(this.config.validationSelector || '.validation');
        let forms = [];

        for (let elem of formElements) {
            elem.inputs = [...elem.querySelectorAll('input[pattern]')];
            elem.inputs.forEach((elem) => { elem.regex = new RegExp(elem.pattern); });
            elem.addEventListener(this.config.triggerOn || 'submit', this._validationListener.bind(elem, this, false));

            forms.push(elem);
        }

        return forms;
    }


    /**
     * Handles listener
     * @param  {Node} _this     Validator-Instance
     * @param  {Boolean} dryRun Touch elements and exec functions?
     * @return {Boolean}        Validation-Status
     */
    _validationListener(_this, dryRun) {
        let invalid = false;

        this.inputs.forEach(elem => {
            let status = !elem.regex.test(elem.value);
            invalid = (!invalid && status) || invalid ? true : false;

            if (!dryRun) {
                elem.classList.toggle('invalid', status);
                this.classList.toggle('invalid', invalid);
            }
        });

        if (event && _this.config.preventDefault && !dryRun) {
            event.preventDefault();
        }

        if (invalid && _this.config.onInvalid && !dryRun) {
            _this.config.onInvalid(this);
        } else if (!invalid && _this.config.onValid && !dryRun) {
            _this.config.onValid(this);
        }

        return !invalid;
    }


    /**
     * Check if vgroup is valid
     * @param  {String} vgroup  Name of validation-group
     * @return {Boolean}        Validation-Status
     */
    isValid(vgroup) {
        return this.validate(vgroup, true);
    }


    /**
     * Manually trigger form-validation
     * @param  {String}  vgroup     Name of validation-group
     * @param  {Boolean} dryRun     Toggle classes and exec methods after validation?
     * @return {Boolean}            Validation-Status
     */
    validate(vgroup, dryRun = false) {
        for (let form of this.forms) {
            if (form.dataset.vgroup === vgroup && !this._validationListener.bind(form, this, dryRun)()) {
                return false;
            }
        }

        return true;
    }


    /**
     * Removes listeners and clears form-objects
     * @return {Void}
     */
    destruct() {
        this.forms.forEach(elem => {
            elem.removeEventListener(this.config.triggerOn || 'submit', this.validate);
        });

        delete this.forms;
    }


    /**
     * Restore listeners and objects, based on old configuration
     * @return {Validation} Returns current instance
     */
    restore() {
        this.forms = this._buildValidator();

        return this;
    }
}
