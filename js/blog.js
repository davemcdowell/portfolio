let blog = function() {
    window.addEventListener('DOMContentLoaded', init);

    function init() {
        setLastModifiedDates();
    }

    function setLastModifiedDates() {
        let dates = document.querySelectorAll('[get-time-since]');
        console.log(dates.length);
    }
}();