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
        let fGroups = [nameGroup, emailGroup, humanGroup];

        let nameInput = nameGroup.querySelector('input[type="text"]');
        let emailInput = emailGroup.querySelector('input[type="email"]');
        let msgInput = msgGroup.querySelector('textarea');
        let humanInput = humanGroup.querySelector('input[type="text"]');

        let submitBtn = form.querySelector('#form-submit');
        let responseDiv = form.querySelector('#form-response');

        nameInput.addEventListener('change', () => {
            /*
            let name = nameInput.value;
            let validFeedback = nameGroup.querySelector('.valid-feedback');
            let invalidFeedback = nameGroup.querySelector('.invalid-feedback');

            if(isStringValid(name)) {
                invalidFeedback.style.display = "none";
                validFeedback.style.display = "block";
                nameInput.style.borderColor = "#198754";
                
                nameGroup.setAttribute('is-valid', "");
            } else {
                validFeedback.style.display = "none";
                invalidFeedback.style.display = "block";
                nameInput.style.borderColor = "#dc3545;";

                nameGroup.removeAttribute('is-valid', "");
            }
            */
            setFormGroupValidation(nameGroup, nameInput, isStringValid2);

            if(isFormValid(fGroups)) {
                submitBtn.removeAttribute('disabled');
                submitBtn.textContent = 'Send';
            } else {
                submitBtn.setAttribute('disabled', '');
                submitBtn.textContent = 'Write Me';
            }
        });

        msgInput.addEventListener('change', () => {
            let msg = msgInput.value;
            let validFeedback = msgGroup.querySelector('.valid-feedback');
            let invalidFeedback = msgGroup.querySelector('.invalid-feedback');

            if(isStringValid(msg)) {
                invalidFeedback.style.display = "none";
                validFeedback.style.display = "block";
                msgInput.style.borderColor = "#198754";
                
                msgGroup.setAttribute('is-valid', "");
            } else {
                validFeedback.style.display = "none";
                invalidFeedback.style.display = "block";
                msgInput.style.borderColor = "#dc3545;";

                msgGroup.removeAttribute('is-valid', "");
            }

            if(isFormValid(fGroups)) {
                submitBtn.removeAttribute('disabled');
                submitBtn.textContent = 'Send';
            } else {
                submitBtn.setAttribute('disabled', '');
                submitBtn.textContent = 'Write Me';
            }
        });

        emailInput.addEventListener('change', () => {
            let email = emailInput.value;
            let validFeedback = emailGroup.querySelector('.valid-feedback');
            let invalidFeedback = emailGroup.querySelector('.invalid-feedback');

            if(isEmailValid(email)) {
                invalidFeedback.style.display = "none";
                validFeedback.style.display = "block";
                emailInput.style.borderColor = "#198754";

                emailGroup.setAttribute('is-valid', "");
            } else {
                validFeedback.style.display = "none";
                invalidFeedback.style.display = "block";
                emailInput.style.borderColor = "#dc3545;";

                emailGroup.removeAttribute('is-valid');
            }      
            
            if(isFormValid(fGroups)) {
                submitBtn.removeAttribute('disabled');
                submitBtn.textContent = 'Send';
            } else {
                submitBtn.setAttribute('disabled', '');
                submitBtn.textContent = 'Write Me';
            }
        });

        humanInput.addEventListener('change', () => {
            let human = humanInput.value;
            let validFeedback = humanGroup.querySelector('.valid-feedback');
            let invalidFeedback = humanGroup.querySelector('.invalid-feedback');

            if(isHumanValid(human)) {
                invalidFeedback.style.display = "none";
                validFeedback.style.display = "block";
                humanInput.style.borderColor = "#198754";

                humanGroup.setAttribute('is-valid', "");
            } else {
                validFeedback.style.display = "none";
                invalidFeedback.style.display = "block";
                humanInput.style.borderColor = "#dc3545;";

                humanGroup.removeAttribute('is-valid');
            }      

            if(isFormValid(fGroups)) {
                submitBtn.removeAttribute('disabled');
                submitBtn.textContent = 'Send';
            } else {
                submitBtn.setAttribute('disabled', '');
                submitBtn.textContent = 'Write Me';
            }
        });
    }

    function setFormGroupValidation(group, input, validationCheck) {
        let inputValue = input.value;
        let validFeedback = group.querySelector('.valid-feedback');
        let invalidFeedback = group.querySelector('.invalid-feedback');

        if(validationCheck(inputValue)) {
            invalidFeedback.style.display = "none";
            validFeedback.style.display = "block";
            input.style.borderColor = "#198754";

            group.setAttribute('is-valid', "");
        } else {
            validFeedback.style.display = "none";
            invalidFeedback.style.display = "block";
            input.style.borderColor = "#dc3545;";

            group.removeAttribute('is-valid');
        }         
    }

    function isEmailValid(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function isStringValid(name) {
        return (name !== "") ? true : false;
    }

    const isStringValid2 = (string) => { return Boolean(string !== ""); }

    function isHumanValid(human) {
        return (parseInt(human) === 7) ? true : false;
    }

    function isFormValid(groupArray) {
        let checkCount = 0;
        let gLength = groupArray.length;

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