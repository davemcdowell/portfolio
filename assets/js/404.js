let fourOFour = function() {
    window.addEventListener('DOMContentLoaded', init);

    const blimp = document.querySelector('.blimp');
    let blimpInterval;
    const speed = 1;
    const frameRate = 24;

    let blimpHits = 0;
    const blimpHitMax = 15;

    function init() {
        console.log('--      404.js initiated');
        setBlimp();
    }

    function setBlimp() {
        if(!blimp)
            return;

        blimp.addEventListener('click', hitBlimp);
        animateBlimp();
    }
    
    function animateBlimp() {
        let offset = 0;
        blimpInterval = setInterval(function() {
            offset = (offset > (window.innerWidth + 320) ? 0 : offset + speed);
            blimp.style.marginRight = offset + 'px';
        }, 1000 / frameRate);
    }

    function hitBlimp() {
        blimpHits++;

        if(blimpHits >= blimpHitMax) {
            destroyBlimp();
        }
    }

    function destroyBlimp() {
        clearInterval(blimpInterval);
        blimp.remove();
    }
}();