let fourOFour = function() {
    window.addEventListener('DOMContentLoaded', init);

    let blimp = document.querySelector('.blimp');

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
    }

    function blimpHit() {
        blimpHit++;

        if(blimpHit >= blimpHitMax) {
            blimp.remove();
            console.log('blimp destroyed');
        }
    }
}();