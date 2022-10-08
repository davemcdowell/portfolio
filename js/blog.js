let blog = function() {
    window.addEventListener('DOMContentLoaded', init);

    function init() {
        setLastModifiedDates();
    }

    function setLastModifiedDates() {
        let dates = document.querySelectorAll('[get-time-since]');
        let timeSince = 0;

        for(let i = 0; i < dates.length; i++) {
            let dateString = document.getElementById(dates[i].getAttribute('get-time-since')).value;
            let dateFromString = new Date(dateString);

            if(dateFromString > Date.now()) {
                if(dates[i].getAttribute('get-time-since-fallback')) {
                    console.log(dates[i].getAttribute('get-time-since') + ' : given date is greater than current date, using fallback');
                    timeSince = dates[i].getAttribute('get-time-since-feedback');
                } else {
                    console.log(dates[i].getAttribute('get-time-since') + ' : given date is greater than current date, no fallback provided');
                    return;
                }
            } else {
                timeSince = new Date(Date.now() - dateFromString);
            }
                
            console.log(timeSince.getHours() + ' hours ago');
            dates[i].innerText = timeSince.getHours() + ' hours ago';
        }
    }
}();