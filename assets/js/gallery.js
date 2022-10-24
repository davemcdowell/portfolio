let gallery = function() {
    window.addEventListener('DOMContentLoaded', init);

    function init() {
        console.log('--      gallery.js initiated');
        setGallerySlider();
    }

    function setGallerySlider() {
        let mainSlide = new Splide('#main-slide', {
            type: 'fade',
            width: 633,
            height: 365,
            rewind: true,
            pagination: false,
            arrows: false,
            focus: 'left',
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
}();