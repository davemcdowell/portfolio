let blog = function() {
    window.addEventListener('DOMContentLoaded', init);

    function init() {
        setLastModifiedDates();
    }

    function setLastModifiedDates() {
        let dates = document.querySelectorAll('[get-time-since]');
        
        for(let i = 0; i < dates.length; i++) {
            let dateString = document.getElementById(dates[i].getAttribute('get-time-since')).value;
            let dateFromString = new Date(dateString);
            let timeSince = new Date(Date.now() - dateFromString);
            console.log(timeSince.getHours());
        }
    }
}();