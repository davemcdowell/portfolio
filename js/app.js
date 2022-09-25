let moxxi = function() {
    let isDarkMode = true;

    let darkModeToggleBtn = document.querySelector('#toggle-darkmode');

    window.addEventListener('DOMContentLoaded', init);

    function init() {
        console.log('Moxxi here!');
        bindDarkModeToggle();
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
        document.querySelector('html').classList.remove('light-theme');
        document.querySelector('html').classList.add('dark-theme');

        darkModeToggleBtn.querySelector('i').classList.remove('bi-sun');
        darkModeToggleBtn.querySelector('i').classList.add('bi-moon');

        darkModeToggleBtn.setAttribute('title', 'Light Mode');
        darkModeToggleBtn.setAttribute('aria-label', 'Light Mode');
    }

    function setLightMode() {
        document.querySelector('html').classList.add('light-theme'); 

        darkModeToggleBtn.querySelector('i').classList.remove('bi-moon');
        darkModeToggleBtn.querySelector('i').classList.add('bi-sun');

        darkModeToggleBtn.setAttribute('title', 'Dark Mode');
        darkModeToggleBtn.setAttribute('aria-label', 'Dark Mode');
    }
}();