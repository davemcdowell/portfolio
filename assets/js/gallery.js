let gallery = function() {
    window.addEventListener('DOMContentLoaded', init);

    function init() {
        console.log('--      gallery.js initiated');
        setGallerySlider();
        setSuggestionLinks();
    }

    function setGallerySlider() {
        let mainSlide = new Splide('#main-slide', {
            type: 'fade',
            rewind: true,
            pagination: false,
            arrows: false,
            video: {
                loop: true,
                mute: true,
            },
        });

        let thumbnailSlide = new Splide('#thumbnail-slide', {
            fixedWidth: 100,
            fixedHeight: 60,
            gap: 10,
            rewind: true,
            pagination: false,
            arrows: true,
            isNavigation: true,
            breakpoints: {
              600: {
                fixedWidth: 60,
                fixedHeight: 44,
              },
            },
        });

        mainSlide.sync(thumbnailSlide);
        mainSlide.mount(window.splide.Extensions);
        thumbnailSlide.mount();
    }

    function setSuggestionLinks() {
        const template = document.querySelectorAll('#suggest-template');
        const data = JSON.parse(document.querySelector('#suggest-json').textContent);
        const container = document.querySelector('#suggest-list');
        const fragment = new DocumentFragment();

        let suggestions = getRandomFromArray(data, 3);

        console.log(suggestions);

        for(let i = 0; i < data.length; i++) {
            let clone = template.content.firstElementChild.cloneNode(true);
            let cTitle = clone.querySelector('strong');
            let cSub = clone.querySelector('small');
            let cImg = clone.querySelector('img');

            cTitle.textContent = data.title;
            cSub.textContent = data.subject;
            cImg.src = data.image;
            cImg.alt = data.alt;

            fragment.append(clone);
        }
        container.append(fragment);
    }
}();