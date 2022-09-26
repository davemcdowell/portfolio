let moxxi = function() {
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
        let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
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

        let nameInput = nameGroup.querySelector('input[type="text"]');
        let emailInput = emailGroup.querySelector('input[type="email"]');
        let humanInput = humanGroup.querySelector('input[type="text"]');

        let submitBtn = form.querySelector('#form-submit');
        let responseDiv = form.querySelector('#form-response');

        nameInput.addEventListener('change', () => {
            let name = nameInput.value;
            let validFeedback = humanInput.querySelector('.valid-feedback');
            let invalidFeedback = humanInput.querySelector('.invalid-feedback');

            if(validateName(name)) {
                invalidFeedback.style.display = "none";
                validFeedback.style.display = "block";
            } else {
                validFeedback.style.display = "none";
                invalidFeedback.style.display = "block";
            }
        });

        emailInput.addEventListener('change', () => {
            let email = emailInput.value;
            let validFeedback = emailGroup.querySelector('.valid-feedback');
            let invalidFeedback = emailGroup.querySelector('.invalid-feedback');

            if(validateEmail(email)) {
                invalidFeedback.style.display = "none";
                validFeedback.style.display = "block";
            } else {
                validFeedback.style.display = "none";
                invalidFeedback.style.display = "block";
            }            
        });

        humanInput.addEventListener('change', () => {
            let human = humanInput.value;
            let validFeedback = humanInput.querySelector('.valid-feedback');
            let invalidFeedback = humanInput.querySelector('.invalid-feedback');

            if(validateHuman(human)) {
                invalidFeedback.style.display = "none";
                validFeedback.style.display = "block";
            } else {
                validFeedback.style.display = "none";
                invalidFeedback.style.display = "block";
            }            
        });

        submitBtn.addEventListener('click', () => {

        });
    }

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function validateName(name) {
        return (name !== "") ? true : false;
    }

    function validateHuman(human) {
        let parsedInt = parseInt(human, 2);
        return (parsedInt === 7) ? true : false;
    }

    function getRandomInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }
}();