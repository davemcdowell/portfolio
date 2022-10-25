let fourOFour = function() {
    window.addEventListener('DOMContentLoaded', init);

    const blimp = document.querySelector('.blimp');
    let int;
    const speed = 1;
    const frameRate = 24;

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
        animate();
    }
    
    function animate() {
        let margin = 0;
        int = setInterval(function() {
            margin = (margin > (window.innerWidth - 230) ? 0 : margin + speed);
            blimp.style.marginRight = margin + "px";
          },
          1000 / frameRate)
      }

    function blimpHit() {
        blimpHits++;

        if(blimpHits >= blimpHitMax) {
            blimp.remove();
        }
    }
}();