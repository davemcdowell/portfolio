let fourOFour = function() {
    window.addEventListener('DOMContentLoaded', init);

    let blimp = document.querySelector('.blimp');
    let blimpInterval;
    let speed = 5;
    let frameRate = 24;

    let blimpHits = 0;
    const blimpHitMax = 4;

    function init() {
        console.log('--      404.js initiated');
        setBlimp();
    }

    function setBlimp() {
        if(!blimp)
            return;

        blimp.addEventListener('click', blimpHit);
        blimpInterval = setInterval(moveBlimp, 1000 / frameRate);
    }
    
    function moveBlimp() {
        let margin = 0;
        margin = (margin > window.innerWidth ? 0 : margin + speed);
        box.style.marginLeft = margin + "px";       
    }

    function blimpHit() {
        blimpHits++;

        if(blimpHits >= blimpHitMax) {
            blimp.remove();
        }
    }
}();