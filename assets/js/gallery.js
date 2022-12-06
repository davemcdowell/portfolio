const gallery = function() {
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
            dragMinThreshold: {
                mouse: 0,
                touch: 10,
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
            dragMinThreshold: {
                mouse: 5,
                touch: 10,
            },
            breakpoints: {
              600: {
                fixedWidth: 60,
                fixedHeight: 44,
              },
            },
        });

        mainSlide.sync(thumbnailSlide);
        mainSlide.mount({ ...window.splide.Extensions, Cubemap });
        thumbnailSlide.mount();
    }

    function setSuggestionLinks() {
        const template = document.querySelector('#suggest-template');
        const data = JSON.parse(document.querySelector('#suggest-json').textContent);
        const container = document.querySelector('#suggest-list');
        const fragment = new DocumentFragment();

        let suggestions = app.get_random_from_array(data, 3);

        for(let i = 0; i < suggestions.length; i++) {
            let clone = template.content.firstElementChild.cloneNode(true);
            let cTitle = clone.querySelector('strong');
            let cSub = clone.querySelector('small');
            let cImg = clone.querySelector('img');
            let cLink = clone.querySelector('a');

            cLink.href = suggestions[i].url;
            cTitle.textContent = suggestions[i].title;
            cSub.textContent = " | " + suggestions[i].subject;
            cImg.src = suggestions[i].image;
            cImg.alt = suggestions[i].alt;

            fragment.append(clone);
        }
        container.append(fragment);
    }
}();