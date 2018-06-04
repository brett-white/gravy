// /* global console:true */

(function() {
    // ---------- GLOBAL VARIABLES -------------------- //
    var logo = document.getElementById('logo');
    var settings = document.getElementById('settings');
    var settingsIcon = document.getElementById('settingsIcon');
    var save = document.getElementById('save');
    var overlay = document.getElementById('overlay');
    var welcome = document.getElementById('welcome');
    var go = document.getElementById('go');
    var setRate = document.getElementById('setRate');
    var hourlyRate = document.getElementById('hourlyRate');
    var help = document.getElementById('helpPanel');
    var gotIt = document.getElementById('gotIt');
    var workDay = document.getElementById('workDay');
    var workWeek = document.getElementById('workWeek');
    var cost = document.getElementById('cost');
    var time = document.getElementById('time');
    var timeType = document.getElementById('timeType');
    var times = document.querySelector('.times');
    var ratio1 = document.getElementById('ratio1');
    var ratio2 = document.getElementById('ratio2');
    var ratio3 = document.getElementById('ratio3');
    var ratio4 = document.getElementById('ratio4');
    var ratio5 = document.getElementById('ratio5');
    var stars = document.getElementById('stars');
    var star1 = document.getElementById('star1');
    var star2 = document.getElementById('star2');
    var star3 = document.getElementById('star3');
    var star4 = document.getElementById('star4');
    var star5 = document.getElementById('star5');
    var clearBtn = document.getElementById('clearBtn');
    var calcBtn = document.getElementById('calcBtn');

    var quality;
    var rate1;
    var rate2;
    var rate3;
    var rate4;
    var rate5;
    var totalCost;
    var timeMultiply;
    var totalHours;
    var totalDays;
    var totalWeeks;
    var numDays;
    var numHours;
    var oldTime;
    var oldType;
    var newTime;
    var maxCost;

    cost.value = 0;
    time.value = 0;
    quality = 0;

    oldTime = time.value;

    // ---------- FULLSCREEN -------------------- //
    window.addEventListener('load', function() {
        // console.log('WINDOW LOAD EVENT');
        window.scrollTo(0, 0);
        document.body.classList.remove('loading');
    });

    // ---------- SET RATES -------------------- //
    (function() {
        if (localStorage.storedRate) {
            // console.log('HAS LOCAL STORAGE');
            setRate.value = localStorage.storedRate;
            hourlyRate.value = setRate.value;
            welcome.className = '';
            settings.className = '';
            overlay.className = '';
            ratio1.value = localStorage.storedRatio1;
            ratio2.value = localStorage.storedRatio2;
            ratio3.value = localStorage.storedRatio3;
            ratio4.value = localStorage.storedRatio4;
            ratio5.value = localStorage.storedRatio5;
            timeType.selectedIndex = localStorage.storedTimeType;
            timeType.value = timeType[timeType.selectedIndex].value;
            oldType = timeType.value;
            workDay.selectedIndex = localStorage.storedWorkDay;
            workWeek.selectedIndex = localStorage.storedWorkWeek;

            if (localStorage.helpClosed) {
                // console.log('HELP CLOSED');
                help.classList.add('is-closed');
            } else {
                help.classList.remove('is-closed');
            }

            calcRates();
        } else {
            welcome.className = 'first-time';
            settings.className = 'is-open';
            overlay.className = 'is-visible';
            setRate.value = 0;
            timeType.selectedIndex = 0;
            timeType.value = 'hours';
            oldType = timeType.value;
            workDay.selectedIndex = 7;
            workWeek.selectedIndex = 4;
        }
    })();

    function initRate() {
        if (setRate.value > 0) {
            setRate.className = 'valid';
            welcome.className = 'is-closed';
            calcRates();
        } else {
            setRate.className = 'invalid';
            setRate.value = 0;
        }
    }

    function calcRates() {
        localStorage.clear();
        localStorage.storedRate = hourlyRate.value;
        localStorage.storedRatio1 = ratio1.value;
        localStorage.storedRatio2 = ratio2.value;
        localStorage.storedRatio3 = ratio3.value;
        localStorage.storedRatio4 = ratio4.value;
        localStorage.storedRatio5 = ratio5.value;
        localStorage.storedTimeType = timeType.selectedIndex;
        localStorage.storedWorkDay = workDay.selectedIndex;
        localStorage.storedWorkWeek = workWeek.selectedIndex;

        if (help.classList.contains('is-closed')) {
            localStorage.helpClosed = true;
        }

        rate1 = Math.ceil((hourlyRate.value / 100) * ratio1.value);
        rate2 = Math.ceil((hourlyRate.value / 100) * ratio2.value);
        rate3 = Math.ceil((hourlyRate.value / 100) * ratio3.value);
        rate4 = Math.ceil((hourlyRate.value / 100) * ratio4.value);
        rate5 = Math.ceil((hourlyRate.value / 100) * ratio5.value);

        star1.value = rate1;
        star2.value = rate2;
        star3.value = rate3;
        star4.value = rate4;
        star5.value = rate5;

        document.getElementById('star5Val').innerHTML = rate5;
        document.getElementById('star4Val').innerHTML = rate4;
        document.getElementById('star3Val').innerHTML = rate3;
        document.getElementById('star2Val').innerHTML = rate2;
        document.getElementById('star1Val').innerHTML = rate1;

        // console.log('Rate 1', rate1);
        // console.log('Rate 2', rate2);
        // console.log('Rate 3', rate3);
        // console.log('Rate 4', rate4);
        // console.log('Rate 5', rate5);
    }

    function setTimeType() {
        if (timeType.value === 'weeks') {
            timeMultiply = (workWeek.value * workDay.value);
        }
        else if (timeType.value === 'days') {
            timeMultiply = workDay.value;
        }
        else if (timeType.value === 'hours') {
            timeMultiply = '1';
        }
        localStorage.storedTimeType = timeType.selectedIndex;
    }

    function calcCost() {
        setTimeType();

        // console.log('Time Multiply:', timeMultiply);
        // console.log('Time Type:', timeType.value);

        cost.value = Math.ceil((time.value * timeMultiply) * quality);
        // console.log('Cost:', cost.value);

        if (cost.value === '') {
            cost.value = 0;
        }
    }

    function clearCost() {
        cost.value = 0;
        totalCost = 0;
        cost.classList.remove('invalid');
    }

    function setTimes() {
        setTimeType();

        var wks;
        var dys;
        var hrs;

        totalHours = Math.floor(time.value * timeMultiply);
        totalDays = Math.floor(totalHours / workDay.value);
        totalWeeks = Math.floor(totalDays / workWeek.value);

        numDays = Math.floor(totalDays - (totalWeeks * workWeek.value));
        numHours = Math.floor(totalHours - (totalDays * workDay.value));

        if (totalWeeks === 0 || totalWeeks > 1) {
            wks = ' weeks';
        } else {
            wks = ' week';
        }
        if (numDays === 0 || numDays > 1) {
            dys = ' days';
        } else {
            dys = ' day';
        }
        if (numHours === 0 || numHours > 1) {
            hrs = ' hours';
        } else {
            hrs = ' hour';
        }

        if (totalHours >= 1) {
            times.innerHTML = totalWeeks + ' ' + wks + ' : ' + numDays + ' ' + dys + ' : ' + numHours + ' ' + hrs;
        } else {
            times.innerHTML = '';
        }

        // console.log('Time:', time.value, timeType.value);
        // console.log('Total Hours:', totalHours);
    }

    function convertTimes() {
        // console.log('Old Time', oldTime);
        // console.log('Old Type', oldType);

        if (time.value > 0) {
            if (oldType === 'hours' && timeType.value === 'days') {
                newTime = oldTime / workDay.value;
                time.value = newTime.toFixed(2);
            }
            else if (oldType === 'hours' && timeType.value === 'weeks') {
                newTime = (oldTime / workDay.value) / workWeek.value;
                time.value = newTime.toFixed(2);
            }
            else if (oldType === 'days' && timeType.value === 'hours') {
                newTime = oldTime * workDay.value;
                time.value = Math.floor(newTime);
            }
            else if (oldType === 'days' && timeType.value === 'weeks') {
                newTime = oldTime / workWeek.value;
                time.value = newTime.toFixed(2);
            }
            else if (oldType === 'weeks' && timeType.value === 'days') {
                newTime = oldTime * workWeek.value;
                time.value = newTime.toFixed(2);
            }
            else if (oldType === 'weeks' && timeType.value === 'hours') {
                newTime = (oldTime * workDay.value) * workWeek.value;
                time.value = Math.floor(newTime);
            }
        }

        oldTime = time.value;
        oldType = timeType.value;

        setTimeType();
    }

    function calcTime() {
        setTimeType();

        time.value = Math.round((cost.value / quality) * timeMultiply);

        setTimes();

        if (time.value === '') {
            time.value = 0;
        }
    }

    function clearTimes() {
        time.value = 0;
        totalHours = 0;
        timeMultiply = 1;
        times.innerHTML = '';
        time.classList.remove('invalid');
    }

    function setStars() {
        if (star1.checked) {
            // console.log('1 Star');
            quality = rate1;
            stars.className = 'isRated';
            star1.className = 'valid';
            star2.className = '';
            star3.className = '';
            star4.className = '';
            star5.className = '';
        }
        if (star2.checked) {
            // console.log('2 Stars');
            quality = rate2;
            stars.className = 'isRated';
            star1.className = 'valid';
            star2.className = 'valid';
            star3.className = '';
            star4.className = '';
            star5.className = '';
        }
        if (star3.checked) {
            // console.log('3 Stars');
            quality = rate3;
            stars.className = 'isRated';
            star1.className = 'valid';
            star2.className = 'valid';
            star3.className = 'valid';
            star4.className = '';
            star5.className = '';
        }
        if (star4.checked) {
            // console.log('4 Stars');
            quality = rate4;
            stars.className = 'isRated';
            star1.className = 'valid';
            star2.className = 'valid';
            star3.className = 'valid';
            star4.className = 'valid';
            star5.className = '';
        }
        if (star5.checked) {
            // console.log('5 Stars');
            quality = rate5;
            stars.className = 'isRated';
            star1.className = 'valid';
            star2.className = 'valid';
            star3.className = 'valid';
            star4.className = 'valid';
            star5.className = 'valid';
        }
    }

    function clearStars() {
        stars.className = '';

        star1.className = '';
        star2.className = '';
        star3.className = '';
        star4.className = '';
        star5.className = '';

        star1.checked = false;
        star2.checked = false;
        star3.checked = false;
        star4.checked = false;
        star5.checked = false;
    }

    function calcQuality() {
        setTimes();

        quality = Math.round(cost.value / totalHours);
        // console.log('Quality:', quality);

        clearStars();

        if (quality >= rate1 && quality < rate2) {
            star1.checked = true;
        }
        else if (quality >= rate2 && quality < rate3) {
            star2.checked = true;
        }
        else if (quality >= rate3 && quality < rate4) {
            star3.checked = true;
        }
        else if (quality >= rate4 && quality < rate5) {
            star4.checked = true;
        }
        else if (quality >= rate5) {
            star5.checked = true;
        }

        setStars();
    }

    function clearQuality() {
        quality = 0;
        clearStars();
    }

    function clearAll() {
        clearCost();
        clearTimes();
        clearQuality();
    }

    function resetRates() {
        initRate();
        setStars();
        calcCost();
    }

    // ---------- CHANGE EVENTS -------------------- //
    document.querySelector('#costLabel').addEventListener('click', function() {
        cost.select();
    });
    document.querySelector('#costIcon').addEventListener('click', function() {
        cost.select();
    });
    cost.addEventListener('focus', function() {
        cost.select();
    });
    cost.addEventListener('blur', function() {
        if (cost.value === '') {
            cost.value = 0;
        }
    });
    cost.addEventListener('change', function() {
        // console.log('Cost Change');

        if (cost.value >= rate1 && time.value >= 1 && quality < rate1) {
            // console.log('Calc Quality');
            calcQuality();
        }
        else if (cost.value >= rate1 && quality >= rate1) {
            // console.log('Calc Time');
            setTimeType();
            time.value = Math.ceil((cost.value / quality) / timeMultiply);
        }
        else if (cost.value >= rate1 && time.value < 1 && quality < rate1) {
            // console.log('Calc Time and Quality');
            setTimeType();
            star3.checked = true;
            setStars();
            time.value = Math.ceil((cost.value / quality) / timeMultiply);
            calcCost();
        }
        else if (cost.value <= rate1) {
            // console.log('Set Min Cost');
            cost.value = rate1;
            time.value = 1;
            star1.checked = true;
            quality = rate1;
            setStars();
        }
    });

    document.querySelector('#timeIcon').addEventListener('click', function() {
        time.select();
    });
    time.addEventListener('focus', function() {
        time.select();
    });
    time.addEventListener('blur', function() {
        if (time.value === '') {
            time.value = 0;
        }
    });
    time.addEventListener('change', function() {
        // console.log('Time Change');

        maxCost = Number(totalHours * rate5);

        if (time.value >= 1 && quality >= rate1 && quality <= rate5) {
            // console.log('Calc Cost');
            calcCost();
        }
        else if (cost.value >= rate1 && time.value > 1 && quality < rate1) {
            // console.log('Calc Quality');
            calcQuality();
        }
        else if (time.value > 0 && cost.value < rate1 && quality < rate1) {
            // console.log('Calc Base Cost');
            var newTime = Math.ceil(time.value);
            time.value = newTime;
            // console.log('NEW TIME', newTime);
            setTimes();
            cost.value = rate3 * totalHours;
            star3.checked = true;
            quality = rate3;
            setStars();
        }

        setTimes();
        // console.log('Total Hours:', totalHours);
    });

    timeType.addEventListener('change', function() {
        // console.log('Time Type Change');
        oldTime = time.value;
        convertTimes();
    });

    stars.addEventListener('change', function() {
        // console.log('Quality Change');
        setStars();

        maxCost = Number(totalHours * rate5);
        // console.log('Quality Cost', maxCost);

        if (time.value >= 1 && quality >= rate1 && quality <= rate5) {
            // console.log('Calc Cost');
            calcCost();
        }
        else if (cost.value >= rate1 && cost.value >= maxCost && quality >= rate1) {
            // console.log('Calc Time');
            calcTime();
        }
        else if (cost.value < rate1 && time.value < 1) {
            // console.log('Calc Cost');
            time.value = 1;
            setTimes();
            cost.value = quality * (time.value * timeMultiply);
        }
    });

    document.querySelector('#welcomeRate').addEventListener('click', function() {
        setRate.select();
    });
    setRate.addEventListener('focus', function() {
        setRate.select();
    });
    setRate.addEventListener('blur', function() {
        if (setRate.value === '') {
            setRate.value = 0;
        }
    });
    setRate.addEventListener('change', function() {
        // console.log('RATE SET');
        hourlyRate.value = setRate.value;
        initRate();
        setStars();
        calcCost();
    });

    go.addEventListener('click', function() {
        initRate();
    });

    gotIt.addEventListener('click', function() {
        // console.log('GOT IT');
        localStorage.helpClosed = true;
        help.classList.add('is-closed');
    });
    document.querySelector('#helpIcon').addEventListener('click', function() {
        console.log('HELP CLICKED');
        if (help.classList.contains('is-closed')) {
            help.classList.remove('is-closed');
        } else {
            help.classList.add('is-closed');
        }
    });

    logo.addEventListener('click', function() {
        welcome.className = 'is-open';
    });

    document.querySelector('#settingsRate').addEventListener('click', function() {
        hourlyRate.select();
    });
    hourlyRate.addEventListener('focus', function() {
        hourlyRate.select();
    });
    hourlyRate.addEventListener('blur', function() {
        if (hourlyRate.value === '' || hourlyRate.value <= 0) {
            hourlyRate.value = localStorage.storedRate;
        }
    });
    hourlyRate.addEventListener('change', function() {
        // console.log('RATE CHANGE');
        setRate.value = hourlyRate.value;
        localStorage.storedRate = hourlyRate.value;
        calcRates();
        setStars();
        calcCost();
    });

    calcBtn.addEventListener('click', function(e) {
        e.preventDefault();
    });

    clearBtn.addEventListener('click', function(e) {
        e.preventDefault();
        clearAll();
    });

    setRate.addEventListener('change', calcRates);

    document.querySelector('#row1').addEventListener('click', function() {
        ratio1.select();
    });
    ratio1.addEventListener('change', function() {
        resetRates();
    });
    document.querySelector('#row2').addEventListener('click', function() {
        ratio2.select();
    });
    ratio2.addEventListener('change', function() {
        resetRates();
    });
    document.querySelector('#row3').addEventListener('click', function() {
        ratio3.select();
    });
    ratio3.addEventListener('change', function() {
        resetRates();
    });
    document.querySelector('#row4').addEventListener('click', function() {
        ratio4.select();
    });
    ratio4.addEventListener('change', function() {
        resetRates();
    });
    document.querySelector('#row5').addEventListener('click', function() {
        ratio5.select();
    });
    ratio5.addEventListener('change', function() {
        resetRates();
    });

    workDay.addEventListener('change', function() {
        setTimes();
        localStorage.storedWorkDay = workDay.selectedIndex;
    });
    workWeek.addEventListener('change', function() {
        setTimes();
        localStorage.storedWorkWeek = workWeek.selectedIndex;
    });

    // ---------- RATES TOGGLE -------------------- //
    settingsIcon.addEventListener('click', function(e) {
        e.preventDefault();
        if (settings.classList.contains('is-open')) {
            settings.className = 'is-closed';
            overlay.className = 'is-hidden';
        } else {
            settings.className = 'is-open';
            overlay.className = 'is-visible';
        }
    });
    save.addEventListener('click', function(e) {
        e.preventDefault();
        settings.className = 'is-closed';
        overlay.className = 'is-hidden';
    });
    overlay.addEventListener('click', function(e) {
        e.preventDefault();
        settings.className = 'is-closed';
        overlay.className = 'is-hidden';
    });
}());
