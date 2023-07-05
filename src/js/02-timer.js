import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
require("flatpickr/dist/themes/dark.css");

const btnEl = document.querySelector('[data-start]')

const timer = {
  intervalId: null, 
  rootSelector: document.querySelector('.timer'),

  start(selectedDate) {
    this.intervalId = setInterval(() => {
      const currentDate = new Date();
      const difference = selectedDate.getTime() - currentDate.getTime();
      if (difference <= 0) {
        this.stop();
        return;
      }
      this.updateTimer(difference);
    }, 1000);
  },

  stop() {
    clearInterval(this.intervalId);
  },

  updateTimer(difference) {
    const { days, hours, minutes, seconds } = this.convertMs(difference);
    this.rootSelector.querySelector('[data-days]').textContent =
      this.addLeadingZero(days);
    this.rootSelector.querySelector('[data-hours]').textContent =
      this.addLeadingZero(hours);
    this.rootSelector.querySelector('[data-minutes]').textContent =
      this.addLeadingZero(minutes);
    this.rootSelector.querySelector('[data-seconds]').textContent =
      this.addLeadingZero(seconds);
  },


  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  },

  initTimer() {
    const options = {
      enableTime: true,
      time_24hr: true,
      defaultDate: new Date(),
      minuteIncrement: 1,
      onChange(selectedDate) {
        const currentDate = new Date();
        if (currentDate > selectedDate[0]) {
            window.alert("Please choose a date in the future");
            btnEl.disabled = true;
            return;
        } else if (btnEl.disabled === true) {
            btnEl.disabled = false;
        }
      }
    };

    flatpickr("input#datetime-picker", options);
    const datePicker = flatpickr("input#datetime-picker", options);

    btnEl.addEventListener('click', () => {
      const selectedDates = datePicker.selectedDates;
      if (selectedDates.length > 0) {
        btnEl.disabled = true;
        const selectedDate = selectedDates[0];
        this.start(selectedDate);
      }
    });

  },
  addLeadingZero(value) {
    return String(value).padStart(2, 0);
  },
};

timer.initTimer();