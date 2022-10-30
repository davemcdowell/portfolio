let time = function() {
    window.addEventListener('DOMContentLoaded', init);

    function init() {
      console.log('--      time.js initiated');
      setLastModifiedDates();
    }

    function setLastModifiedDates() {
        let dates = document.querySelectorAll('[get-time-since]');

        for(let i = 0; i < dates.length; i++) {
            let dateString = document.getElementById(dates[i].getAttribute('get-time-since')).value;
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