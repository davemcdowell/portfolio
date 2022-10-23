let gallery = function() {
    window.addEventListener('DOMContentLoaded', init);

    function init() {
        setGallerySlider();
    }

    function setGallerySlider() {
        let mainSlide = new Splide( '#main-slide', {
            type: 'fade',
            rewind: true,
            pagination: false,
            arrows: false,
        }); 

        let thumbnailSlide = new Splide("#thumbnail-slide", {
            fixedWidth: 100,
            fixedHeight: 60,
            gap: 10,
            rewind: true,
            pagination: false,
            isNavigation: true,
            breakpoints: {
              600: {
                fixedWidth: 60,
                fixedHeight: 44,
              },
            },
        });

        mainSlide.sync(thumbnailSlide);
        mainSlide.mount();
        thumbnailSlide.mount();
    }
}();