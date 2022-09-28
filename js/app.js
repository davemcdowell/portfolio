let app = function() {
    let isDarkMode = true;

    let darkModeToggleBtn = document.querySelector('#toggle-darkmode');

    window.addEventListener('DOMContentLoaded', init);

    function init() {
        bindDarkModeToggle();
        setContactForm();
        setToolTips();
    }

    function setToolTips() {
        let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        let tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }

    function bindDarkModeToggle() {
        darkModeToggleBtn.addEventListener('click', toggleDarkMode, true);
    }
    
    function toggleDarkMode() {
        isDarkMode = !isDarkMode;
        (isDarkMode) ? setDarkMode() : setLightMode();
    }

    function setDarkMode() {
        document.documentElement.classList.remove('light-theme');
        document.documentElement.classList.add('dark-theme');

        darkModeToggleBtn.querySelector('i').classList.remove('bi-sun');
        darkModeToggleBtn.querySelector('i').classList.add('bi-moon');

        darkModeToggleBtn.dataset.bsOriginalTitle = 'Light Mode';
        darkModeToggleBtn.setAttribute('title', 'Light Mode');
        darkModeToggleBtn.setAttribute('aria-label', 'Light Mode');
    }

    function setLightMode() {
        document.documentElement.classList.add('light-theme'); 

        darkModeToggleBtn.querySelector('i').classList.remove('bi-moon');
        darkModeToggleBtn.querySelector('i').classList.add('bi-sun');

        darkModeToggleBtn.dataset.bsOriginalTitle = 'Dark Mode';
        darkModeToggleBtn.setAttribute('title', 'Dark Mode');
        darkModeToggleBtn.setAttribute('aria-label', 'Dark Mode');
    }

    function setContactForm() {
        let form = document.querySelector('#contact-form');

        let nameGroup = form.querySelector('#form-name-group');
        let emailGroup = form.querySelector('#form-email-group');
        let msgGroup = form.querySelector('#form-msg-group');
        let humanGroup = form.querySelector('#form-human-group');
        
        let nameInput = nameGroup.querySelector('input[type="text"]');
        let emailInput = emailGroup.querySelector('input[type="email"]');
        let msgInput = msgGroup.querySelector('textarea');
        let humanInput = humanGroup.querySelector('input[type="text"]');

        form.addEventListener('beforeunload', (event) => {
            let fields = form.querySelectorAll('input, textarea');
            let groups = form.querySelectorAll('[data-check-validation]');
            let submitBtn = form.querySelector('#form-submit, input[type="submit"]');

            fields.map(function(field){
                field.value = '';
            });

            groups.map(function(group){
                group.removeAttribute('is-valid');
            });

            submitBtn.setAttribute('disabled', '');
        });

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
    }

    function setFormGroupValidation(group, input, validationCheck) {
        let inputValue = input.value;
        let validFeedback = group.querySelector('.valid-feedback');
        let invalidFeedback = group.querySelector('.invalid-feedback');

        if(validationCheck(inputValue)) {
            invalidFeedback.style.display = 'none';
            validFeedback.style.display = 'block';
            input.style.borderColor = '#198754';

            group.setAttribute('is-valid', '');
        } else {
            validFeedback.style.display = 'none';
            invalidFeedback.style.display = 'block';
            input.style.borderColor = '#dc3545;';

            group.removeAttribute('is-valid');
        }
    }

    function checkFormValidation(form) {
        let submitBtn = form.querySelector('#form-submit, input[type="submit"]');

        if(isFormValid(form)) {
            submitBtn.removeAttribute('disabled');
            submitBtn.textContent = 'Send';
        } else {
            submitBtn.setAttribute('disabled', '');
            submitBtn.textContent = 'Write Me';
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
        
        return Boolean(checkCount === gLength);
    }

    function getRandomInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }
}();