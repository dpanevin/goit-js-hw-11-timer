class CountdownTimer {
    constructor({ selector, targetDate }) {
        this.selector = selector;
        this.targetDate = targetDate;
        this._isActive = false;
        this._intervalId = null;
        this._timerEl = document.querySelector(this.selector);
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

    pad(value) {
    if (length.value > 2) {
        return value;
    }
    return String(value).padStart(2, '0');
}

    getTimeComponents(time) {
        const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

        return { days, hours, mins, secs };
    }

    updateMarkup({ days, hours, mins, secs }) {
    this._timerEl.querySelector('.js-days').innerHTML = days;
    this._timerEl.querySelector('.js-hours').innerHTML = hours;
    this._timerEl.querySelector('.js-mins').innerHTML = mins;
    this._timerEl.querySelector('.js-secs').innerHTML = secs;
}
}


const timer1 = new CountdownTimer({
    selector: '#timer-1',
    targetDate: new Date('Sep 17, 2021')
});

timer1.start()