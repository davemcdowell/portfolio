let gallery = function() {
    window.addEventListener('DOMContentLoaded', init);

    function init() {
        console.log('--      gallery.js initiated');
        setGallerySlider();
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
            fixedWidth: 128,
            fixedHeight: 64,
            gap: 10,
            rewind: true,
            pagination: false,
            arrows: true,
            isNavigation: true,
            breakpoints: {
              600: {
                fixedWidth: 64,
                fixedHeight: 48,
              },
            },
        });

        mainSlide.sync(thumbnailSlide);
        mainSlide.mount(window.splide.Extensions);
        thumbnailSlide.mount();
    }
}();