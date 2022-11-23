const app = function() {
    let isDarkMode = true;

    window.addEventListener('DOMContentLoaded', init);

    function init() {
        console.log('--      app.js initiated');
        bindDarkModeToggle();
        setContactForm();
        setToolTips();
        setCopyButtons();
    }

    function setToast() {
        let toastElList = [].slice.call(document.querySelectorAll('.toast'));
        toastElList.map(function (toastEl) {
          return new bootstrap.Toast(toastEl);
        });
    }

    function setToolTips() {
        let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function(tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl, {
                trigger : 'hover'
            });
        });
    }

    function bindDarkModeToggle() {
        let darkModeToggleBtn = document.querySelector('#toggle-darkmode');
        darkModeToggleBtn.addEventListener('click', toggleDarkMode, true);
    }
    
    function toggleDarkMode() {
        isDarkMode = !isDarkMode;
        (isDarkMode) ? setDarkMode() : setLightMode();
    }

    function setDarkMode() {
        let darkModeToggleBtn = document.querySelector('#toggle-darkmode');

        document.documentElement.classList.remove('light-theme');
        document.documentElement.classList.add('dark-theme');

        darkModeToggleBtn.classList.remove('r180');

        darkModeToggleBtn.dataset.bsOriginalTitle = 'Light Mode';
        darkModeToggleBtn.setAttribute('title', 'Light Mode');
        darkModeToggleBtn.setAttribute('aria-label', 'Light Mode');
    }

    function setLightMode() {
        let darkModeToggleBtn = document.querySelector('#toggle-darkmode');

        document.documentElement.classList.add('light-theme');

        darkModeToggleBtn.classList.add('r180');

        darkModeToggleBtn.dataset.bsOriginalTitle = 'Dark Mode';
        darkModeToggleBtn.setAttribute('title', 'Dark Mode');
        darkModeToggleBtn.setAttribute('aria-label', 'Dark Mode');
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
    
    /* toasts */
    function showToast(title, message, imgSrc) {
        let toastTemp = document.querySelector('#toast-temp');
        let tClone = toastTemp.content.cloneNode(true);

        let cImg = tClone.querySelector('img');
        let cTitle = tClone.querySelector('.toast-title');
        let cContent = tClone.querySelector('.toast-body');
        
        cImg.src = imgSrc;
        cTitle.innerText = title;
        cContent.innerText = message;

        tClone.show();
    }

    /* copy/paste */
    function setCopyButtons() {
        let copyPasteCalls = [].slice.call(document.querySelectorAll('[data-copy-paste]'));
        copyPasteCalls.map(function(copyPasteCall) {
            let tempInput = document.createElement('input');
            tempInput.type = 'hidden';
            tempInput.value = copyPasteCall.innerText;
            createCopyButton(tempInput);
        });      
    }

    function createCopyButton(targetElement) {
        let button = document.createElement('button');
        let nbSpace = document.createTextNode(' ');
        let span = document.createElement('span');
        let i = document.createElement('i');
        console.log(targetElement);
        button.classList.add('btn', 'btn-icon', 'fs-sm');
        button.setAttribute('data-flip-icon', 'bi bi-clipboard-check');
        button.setAttribute('aria-label', 'Copy');

        span.classList.add('d-flex', 'justify-content-center', 'align-items-center', 'icon-bg-xs', 'rounded-circle');
        i.classList.add('bi', 'bi-clipboard', 'icon-xs');

        span.appendChild(i);
        button.appendChild(span);

        targetElement.appendChild(nbSpace);
        targetElement.appendChild(button);

        button.addEventListener('click', function(event) {
            let copyElement = event.currentTarget.parentNode;
            console.log(copyElement);
            copyElement.setSelectionRange(0, 99999);
            navigator.clipboard.writeText(copyElement.value);
        });
    }

    /* utils */
    function getRandomInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }

    function getRandomFromArray(arr, n) {
        let result = new Array(n),
            len = arr.length,
            taken = new Array(len);
        if (n > len)
            throw new RangeError("getRandom: more elements taken than available");
        while (n--) {
            var x = Math.floor(Math.random() * len);
            result[n] = arr[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
        }
        return result;
    }

    return {
        show_toast : showToast,
        get_random_int : getRandomInteger,
        get_random_from_array : getRandomFromArray
    };
}();