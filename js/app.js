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
        let humanGroup = form.querySelector('#form-human-group');
        let fGroups = [nameGroup, emailGroup, humanGroup];

        let nameInput = nameGroup.querySelector('input[type="text"]');
        let emailInput = emailGroup.querySelector('input[type="email"]');
        let humanInput = humanGroup.querySelector('input[type="text"]');

        let submitBtn = form.querySelector('#form-submit');
        let responseDiv = form.querySelector('#form-response');

        nameInput.addEventListener('change', () => {
            let name = nameInput.value;
            let validFeedback = nameGroup.querySelector('.valid-feedback');
            let invalidFeedback = nameGroup.querySelector('.invalid-feedback');

            if(isNameValid(name)) {
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

            if(isFormValid(fGroups)) {
                console.log('Form is valid');
                submitBtn.removeAttribute('disabled');
            } else {
                console.log('Form is invalid');
                submitBtn.setAttribute('disabled', '');               
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
                console.log('Form is valid');
                submitBtn.removeAttribute('disabled');
            } else {
                console.log('Form is invalid');
                submitBtn.setAttribute('disabled', '');                   
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
                console.log('Form is valid');
                submitBtn.removeAttribute('disabled');
            } else {
                console.log('Form is invalid');
                submitBtn.setAttribute('disabled', '');   
            }
        });
    }

    function isEmailValid(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function isNameValid(name) {
        return (name !== "") ? true : false;
    }

    function isHumanValid(human) {
        return (parseInt(human) === 7) ? true : false;
    }

    function isFormValid(groupArray) {
        console.log("isFormValid?");
        let checkCount = 0;
        let gLength = parseInt(groupArray.length - 1);

        for(let i = 0; i < groupArray.length; i++) {
            if(groupArray[i].hasAttribute('is-valid')) {
                checkCount++;
                console.log(`${i}: ${groupArray[i]} is valid: checkCount: ${checkCount}`);
            } 
        }
        console.log(checkCount);
        console.log(Boolean(checkCount === gLength));
        return Boolean(checkCount === gLength);
    }

    function getRandomInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }
}();