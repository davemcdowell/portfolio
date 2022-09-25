let moxxi = function() {
    let isDarkMode = true;

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
        let darkModeToggleBtn = document.querySelector('#toggle-darkmode');
        darkModeToggleBtn.addEventListener('click', toggleDarkMode, true);
    }
    
    function toggleDarkMode() {
        isDarkMode = !isDarkMode;

        if(isDarkMode) {
            document.querySelector('html').classList.remove('light-theme');
            document.querySelector('html').classList.add('dark-theme');
        } else {
            document.querySelector('html').classList.add('light-theme');
        }
    }
}();