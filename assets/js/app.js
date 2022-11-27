const app = function() {
    let isDarkMode = true;

    window.addEventListener('DOMContentLoaded', init);

    function init() {
        console.log('--      app.js initiated');
        bindDarkModeToggle();
        setToolTips();
        setCopyButtons();
        setFlipToggles();
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

    /* flip toggle */
    function setFlipToggles() {
        let flipToggleCalls = [].slice.call(document.querySelectorAll('[data-flip-toggle]'));
        flipToggleCalls.map(function(flipToggleCall) {
            flipToggleCall.addEventListener('click', function(event) {
                let icon = event.currentTarget.querySelector('i');
                if(event.currentTarget.getAttribute('is-flipped') == '') {
                    event.currentTarget.removeAttribute('is-flipped');
                    event.currentTarget.setAttribute('aria-label', event.currentTarget.dataset.defaultLabel);
                    icon.classList = event.currentTarget.dataset.defaultIcon;
                } else {
                    event.currentTarget.setAttribute('is-flipped', '');
                    event.currentTarget.setAttribute('aria-label', event.currentTarget.dataset.flipLabel);
                    icon.classList = event.currentTarget.dataset.flipIcon;
                }
            });
        });  
    }

    /* copy/paste */
    function setCopyButtons() {
        let copyPasteCalls = [].slice.call(document.querySelectorAll('[data-copy-paste]'));
        copyPasteCalls.map(function(copyPasteCall) {
            createCopyButton(copyPasteCall);
        });      
    }

    function createCopyButton(targetElement) {
        let button = document.createElement('button');
        let nbSpace = document.createTextNode(' ');
        let span = document.createElement('span');
        let feedback = document.createElement('span');
        let i = document.createElement('i');

        let copyString = targetElement.innerText;

        button.classList.add('btn', 'btn-icon', 'fs-sm');
        button.setAttribute('data-flip-icon', 'bi bi-clipboard-check');
        button.setAttribute('aria-label', 'Copy');

        span.classList.add('d-flex', 'justify-content-center', 'align-items-center', 'icon-bg-xs', 'rounded-circle', 'position-relative');
        feedback.classList.add('feedback-text');
        feedback.innerText = 'Copied!';
        feedback.ariaLabel = 'Copied!';
        i.classList.add('bi', 'bi-clipboard', 'icon-xs');

        span.appendChild(feedback);
        span.appendChild(i);
        button.appendChild(span);

        targetElement.appendChild(nbSpace);
        targetElement.appendChild(button);

        button.addEventListener('click', () => {
            navigator.clipboard.writeText(copyString);
            feedback.style = "display: block;"
            setTimeout(function() {
                feedback.style = "display: none;"
            }, 4000);
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