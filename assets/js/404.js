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
        blimpLoop = setInterval(moveBlimp, 90);
    }
    
    function moveBlimp() {
        let margin = 0;
    
        let l = window.screen.width;
        let w = 1300;

        console.log(w);
        if (margin == w) {
          margin = 0 + "px";
        } else {
          blimp.style.marginLeft = margin + "px";
        }
        margin += 10;
      }

    function blimpHit() {
        blimpHits++;

        if(blimpHits >= blimpHitMax) {
            blimp.remove();
        }
    }
}();