const gallery = function() {
    window.addEventListener('DOMContentLoaded', init);

    function init() {
        console.log('--      home.js initiated');
        setHeroImage();
        setPortfolioSliders();
    }

    function setPortfolioSliders() {
        let slides = document.querySelectorAll('.portfolio-slider');
        let options = {
            type        : 'loop',
            perPage     : 2,
            perMove     : 1,
            gap         : '2.1825rem',
            width       : '950px',
            pagination  : false,
            lazyLoad    : 'nearby',
            preloadPages: 1,
            breakpoints : {
                768: { perPage: 1, },
            }
        };

        for(let i = 0; i < slides.length; i++) {
            let newSplide = new Splide(slides[i], options);
            let sliderBar = newSplide.root.querySelector('.slider-progress');

            newSplide.on('mounted move', function () {
                let end  = newSplide.Components.Controller.getEnd() + 1;
                let rate = Math.min(( newSplide.index + 1 ) / end, 1);
                sliderBar.style.width = String(100 * rate) + '%';
            });

            newSplide.mount();
        }
    }

    function setHeroImage() {
        app.get_random_int(hImages);
    }
}();