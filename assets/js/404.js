let fourOFour = function() {
    window.addEventListener('DOMContentLoaded', init);

    let blimp = document.querySelector('.blimp');
    let blimpLoop;

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
    
    function moveBlimp() {

      }

    function blimpHit() {
        blimpHits++;

        blimp.style.backgroundColor = '#fff';
        if(blimpHits >= blimpHitMax) {
            blimp.remove();
        }
    }
}();