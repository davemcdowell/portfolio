// Flesch Reading Ease Score = 206.835 − 1.015 × ( Total Words / Total Sentences ) − 84.6 × ( Total Syllables / Total Words )

let fkExamine = function() {
    window.addEventListener('DOMContentLoaded', init);

    const fkConstA = 206.835;
    const fkConstB = 1.015;
    const fkConstC = 84.6;

    let gArray = new Array();

    function init() {
      console.log('--      fkExamine.js initiated');

      let tElms = document.querySelectorAll('p, [data-read-level]');
    }

    function applyFKAlgorithm(inputString) {

    }
}();