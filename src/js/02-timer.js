import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
require("flatpickr/dist/themes/dark.css");

const timer = {
  intervalId: null, 
  rootSelector: document.querySelector('.timer'),
  btnEl: document.querySelector('[data-start]'),
  alertShown: false,

  start(selectedDate) {
    this.intervalId = setInterval(() => {
      const currentDate = new Date();
      this.btnEl.classList.add('disabled');
      if (currentDate > selectedDate) {
        if (!this.alertShown) {        //если вывод не показан, то покажи его   
          window.alert("Please choose a date in the future");
          this.alertShown = true; //предотвращает повторное показание alert
        }
        this.btnEl.disabled = false; 
      } else {
        const difference = selectedDate.getTime() - currentDate.getTime();
        if (difference <= 0) {
          this.stop();
          return;
        }
        this.btnEl.disabled = true;  //остановка кнопки пока выбранная дата не наступит
        this.updateTimer(difference);
      }
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
      onClose(selectedDates) {
        const selectedDate = selectedDates[0]; // Получаем выбранную дату из параметра selectedDates
        timer.start(selectedDate);
      },
    };

    flatpickr("input#datetime-picker", options);
  },



  addLeadingZero(value) {
    return String(value).padStart(2, 0);
  },
};

timer.initTimer();
