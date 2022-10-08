let blog = function() {
    window.addEventListener('DOMContentLoaded', init);

    function init() {
        setLastModifiedDates();
    }

    function setLastModifiedDates() {
        let dates = document.querySelectorAll('[get-time-since]');
        
        for(let i = 0; i < dates.length; i++) {
            let modDate = dates[i].dataset.getTimeSince;
            console.log(modDate);
        }
    }
}();