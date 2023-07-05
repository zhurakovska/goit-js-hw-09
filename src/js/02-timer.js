import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
require("flatpickr/dist/themes/dark.css");

const timer = {
  intervalId: null, // переменная для идентификатора интервала
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
      this.pad(days);
    this.rootSelector.querySelector('[data-hours]').textContent =
      this.pad(hours);
    this.rootSelector.querySelector('[data-minutes]').textContent =
      this.pad(minutes);
    this.rootSelector.querySelector('[data-seconds]').textContent =
      this.pad(seconds);
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

  init() {
    const options = {
      enableTime: true,
      time_24hr: true,
      defaultDate: new Date(),
      minuteIncrement: 1,
      onClose(selectedDates) {
        const selectedDate = selectedDates[0]; // Получаем выбранную дату из параметра selectedDates
        timer.start(selectedDate);
      },
    };

    flatpickr("input#datetime-picker", options);
  },



  pad(value) {
    return String(value).padStart(2, 0);
  },
};

timer.init();
