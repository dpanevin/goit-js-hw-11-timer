const refs = {
    days: document.querySelector('.js-days'),
    hours: document.querySelector('.js-hours'),
    mins: document.querySelector('.js-mins'),
    secs: document.querySelector('.js-secs'),
}

class CountdownTimer {
    constructor({ selector, targetDate, updateMarkup }) {
        this.selector = selector;
        this.targetDate = targetDate;
        this.updateMarkup = updateMarkup;
        this._isActive = false;
        this._intervalId = null;
    }

    start() {
        if (this._isActive) {
            return;
        }

        this._isActive = true;
        this._intervalId = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = this.targetDate - currentTime;
            const time = this.getTimeComponents(deltaTime);
            this.updateMarkup(time);
        },1000)
    }

    stop() {
        if (!this._isActive) {
            return;
        }

        this._isActive = false;
        clearInterval(this._intervalId)
    }

    getTimeComponents(time) {
        const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

        return { days, hours, mins, secs };
    }
}


const timer1 = new CountdownTimer({
    selector: '#timer-1',
    targetDate: new Date('Sep 25, 2021'),
    updateMarkup: writeTime
});

timer1.start()

function writeTime({ days, hours, mins, secs }) {
    refs.days.innerHTML = days;
    refs.hours.innerHTML = hours;
    refs.mins.innerHTML = mins;
    refs.secs.innerHTML = secs;
}

function pad(value) {
    if (length.value > 2) {
        return value;
    }
    return String(value).padStart(2, '0');
}