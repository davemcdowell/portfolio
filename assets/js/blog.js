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
            /*
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
            */
            dates[i].innerText = 'Last modified: ' + timeAgo(dateString);
        }
    }

    function timeAgo(input) {
        const date = (input instanceof Date) ? input : new Date(input);
        const formatter = new Intl.RelativeTimeFormat('en');

        const ranges = {
          years: 3600 * 24 * 365,
          months: 3600 * 24 * 30,
          weeks: 3600 * 24 * 7,
          days: 3600 * 24,
          hours: 3600,
          minutes: 60,
          seconds: 1
        };

        const secondsElapsed = (date.getTime() - Date.now()) / 1000;

        for(let key in ranges) {
          if(ranges[key] < Math.abs(secondsElapsed)) {
            const delta = secondsElapsed / ranges[key];
            return formatter.format(Math.round(delta), key);
          }
        }
      }
}();