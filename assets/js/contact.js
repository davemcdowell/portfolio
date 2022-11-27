const contact = function() {
    window.addEventListener('DOMContentLoaded', init);

    function init() {
        console.log('--      contact.js initiated');
        setContactForm();
    }

    function setContactForm() {
        let form = document.querySelector('#contact-form');

        if(!form)
         return;
         
        let nameGroup = form.querySelector('#form-name-group');
        let emailGroup = form.querySelector('#form-email-group');
        let msgGroup = form.querySelector('#form-msg-group');
        let humanGroup = form.querySelector('#form-human-group');
        
        let nameInput = nameGroup.querySelector('input[type="text"]');
        let emailInput = emailGroup.querySelector('input[type="email"]');
        let msgInput = msgGroup.querySelector('textarea');
        let humanInput = humanGroup.querySelector('input[type="text"]');

        nameInput.addEventListener('change', () => {
            setFormGroupValidation(nameGroup, nameInput, isStringValid);
            checkFormValidation(form);
        });

        msgInput.addEventListener('change', () => {
            setFormGroupValidation(msgGroup, msgInput, isStringValid);
            checkFormValidation(form);
        });

        emailInput.addEventListener('change', () => {
            setFormGroupValidation(emailGroup, emailInput, isEmailValid);
            checkFormValidation(form);
        });

        humanInput.addEventListener('change', () => {
            setFormGroupValidation(humanGroup, humanInput, isHumanValid);
            checkFormValidation(form);
        });

        resetContactForm(form);
    }

    function resetContactForm(form) {
        let inputs = form.querySelectorAll('input, textarea');
        let groups = form.querySelectorAll('[data-check-validation]');
        let submitBtn = form.querySelector('#form-submit, input[type="submit"]');

        form.reset();

        for(let i = 0; i < inputs.length; i++) {
            inputs[i].value = '';
        }

        for(let i = 0; i < groups.length; i++) {
            groups[i].removeAttribute('is-valid');
        }

        checkFormValidation(form);
    }

    function setFormGroupValidation(group, input, validationCheck) {
        let inputValue = input.value;
        let validFeedback = group.querySelector('.valid-feedback');
        let invalidFeedback = group.querySelector('.invalid-feedback');

        if(validationCheck(inputValue)) {
            invalidFeedback.style.display = 'none';
            validFeedback.style.display = 'block';
            group.setAttribute('is-valid', '');
        } else {
            validFeedback.style.display = 'none';
            invalidFeedback.style.display = 'block';
            group.removeAttribute('is-valid');
        }
    }

    function checkFormValidation(form) {
        let submitBtn = form.querySelector('#form-submit, input[type="submit"]');
        let btnLabel = form.querySelector('.btn-label');

        let vFields = form.querySelectorAll('[data-check-validation]');
        let countTxt = submitBtn.querySelector('small');
        
        if(isFormValid(form)) {
            submitBtn.classList.remove('disabled');
            submitBtn.setAttribute('aria-disabled', false);
            btnLabel.textContent = 'Send';
            countTxt.textContent = '';
        } else {
            submitBtn.classList.add('disabled');
            submitBtn.setAttribute('aria-disabled', true);
            btnLabel.textContent = 'Write Me';

            let fieldsLeft = (vFields.length - parseInt(form.dataset.validFields));
            (fieldsLeft > 1) ? countTxt.textContent = `${fieldsLeft} fields left` : countTxt.textContent = `${fieldsLeft} field left`;
        }
    }

    function isEmailValid(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const isStringValid = (string) => { return Boolean(string !== ''); };
    const isHumanValid = (answer) => { return Boolean(parseInt(answer) === 7); };

    function isFormValid(form) {
        let groupArray = form.querySelectorAll('[data-check-validation]');
        let gLength = groupArray.length;
        let checkCount = 0;

        for(let i = 0; i < gLength; i++) {
            if(groupArray[i].hasAttribute('is-valid')) {
                checkCount++;
            } 
        }

        form.dataset.validFields = checkCount;
        return Boolean(checkCount === gLength);
    }
}();