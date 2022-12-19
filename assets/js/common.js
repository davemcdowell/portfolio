const common = function() {
    window.addEventListener('DOMContentLoaded', init);

    function init() {
      console.log('--      common.js initiated');
      setToolTips();
      setHeroMedia();
      //setToast();
      setCopyButtons();
      setFlipToggles();
    }

    /* hero media */
    function setHeroMedia() {
        let heroImage = document.querySelector('.hero-image');

        if(heroImage && hImages) {
            let rImg = hImages[app.get_random_int(0, hImages.length)];
            console.log(rImg);
            heroImage.style = `background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url('${ rImg }'); background-position: fixed;`;
        }
    }

    /* tooltips */
    function setToolTips() {
        let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function(tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl, {
                trigger : 'hover'
            });
        });
    }

    /* toasts */
    function setToast() {
        let toastElList = [].slice.call(document.querySelectorAll('.toast'));
        toastElList.map(function (toastEl) {
          return new bootstrap.Toast(toastEl);
        });
    }

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
        flipToggleCalls.map(function(flipToggleEl) {
            flipToggleEl = new FlipToggle(flipToggleEl);
            /*
            flipToggleEl.addEventListener('click', debounceLeading(function(event) {
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
            }));
            */
        });  
    }

    class FlipToggle {
        constructor(element) {
            this.element = element;
            this.icon = this.element.querySelector('i');
            this.defaultIcon = this.element.getAttribute('data-default-icon');
            this.altIcon = this.element.getAttribute('data-flip-icon');
            this.defaultLabel = this.element.getAttribute('data-default-label');
            this.altLabel = this.element.getAttribute('data-flip-label');
            this.isFlipped = false;

            console.log(`--Created new FlipToggle: ${this.element} with an icon: ${this.icon}.\nThe default icon is ${this.defaultIcon}`);

            this.element.addEventListener('click', (event) => {
                debounceLeading(this.flipIcon(event), 500);
            });
        }

        flipIcon(event) {
            this.isFlipped = !this.isFlipped;
            if(this.isFlipped && !event.currentTarget.hasAttribute('is-flipped')) {
                this.icon.classList = this.altIcon;
                this.element.setAttribute('is-flipped', '');
                this.element.setAttribute('aria-label', this.altLabel);
                console.log(`flipped to alt`);
            } else {
                this.icon.classList = this.defaultIcon;
                this.element.removeAttribute('is-flipped');
                this.element.setAttribute('aria-label', this.defaultLabel);
                console.log(`flipped to default`);
            }
            console.log(`flipIcon just finished: ${this.isFlipped}`);
        }

        toDefaultIcon() {
            this.icon.classList = this.defaultIcon;
            this.element.removeAttribute('is-flipped');
            this.element.setAttribute('aria-label', this.defaultLabel);
            this.isFlipped = false;
            console.log(`defaulted: ${this.isFlipped}`);
        }

        toAltIcon() {
            this.icon.classList = this.altIcon;
            this.element.setAttribute('is-flipped', '');
            this.element.setAttribute('aria-label', this.altLabel);
            this.isFlipped = true;
            console.log(`alted: ${this.isFlipped}`);
        }
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

    /* return element type */
    function whichTag(el) {
        return el && el.tagName && el.tagName.toLowerCase();
    }

    /* 
        debounce methods 
        - de Ondrej Polesny 
    */
    function debounce(func, timeout = 300) {
        let timer;
        return(...args) => {
          clearTimeout(timer);
          timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
    }

    function debounceLeading(func, timeout = 300) {
        let timer;
        return(...args) => {
            if(!timer) {
                func.apply(this, args);
            }
            clearTimeout(timer);
            timer = setTimeout(() => {
                timer = undefined;
            }, timeout);
        }
    }

    return {
        setFlipToggles,
        whichTag,
        debounce,
        debounceLeading
    };
}();