// import flatpickr from "flatpickr";
// import convertMs from './convertMs';
// import  Notifyx  from 'notiflix';

// import "flatpickr/dist/flatpickr.min.css";

// let getRef = selector => document.querySelector(selector);
// const imputDatePickerRef = getRef('#datetime-picker');
// const btnStartRef = getRef('[data-start]');
// const daysRef = getRef('[data-days]');
// const hoursRef = getRef('[data-hours]');
// const minutesRef = getRef('[data-minutes]');
// const secondsRef = getRef('[data-seconds]');

// let timeDifference = 0;
// let timerId = null;
// let formatDate = null;

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     console.log(selectedDates[0]);
//     currentDifferenceDate(selectedDates[0]);
//   },
// };

// btnStartRef.setAttribute('disabled', true);

// flatpickr(imputDatePickerRef, options);

// btnStartRef.addEventListener('click', onBtnStart);

// window.addEventListener('keydown', e => {
//     if (e.code === 'Escape' && timerId) {
//       clearInterval(timerId);

//       imputDatePickerRef.removeAttribute('disabled');
//     btnStartRef.setAttribute('disabled', true);

//     secondsRef.textContent = '00';
//     minutesRef.textContent = '00';
//     hoursRef.textContent = '00';
//     daysRef.textContent = '00';
//   }
// });
// function onBtnStart() {
//     timerId = setInterval(startTimer, 1000);
//   }

//   function currentDifferenceDate(selectedDates) {
//     const currentDate = Date.now();

//     if (selectedDates < currentDate) {
//         btnStartRef.setAttribute('disabled', true);
//         return Notify.failure('Please choose a date in the future');
//       }
    
//       timeDifference = selectedDates.getTime() - currentDate;
//       formatDate = convertMs(timeDifference);
    
//       renderDate(formatDate);
//       btnStartRef.removeAttribute('disabled');
//     }
//   //timer
//   function startTimer() {
//     btnStartRef.setAttribute('disabled', true);
//     imputDatePickerRef.setAttribute('disabled', true);
  
//     timeDifference -= 1000;
  
//     if (secondsRef.textContent <= 0 && minutesRef.textContent <= 0) {
//       Notify.success('Time end');
//       clearInterval(timerId);
//     } else {
//       formatDate = convertMs(timeDifference);
//       renderDate(formatDate);
//     }
//   }  
//   //data
//   function renderDate(formatDate) {
//     secondsRef.textContent = formatDate.seconds;
//     minutesRef.textContent = formatDate.minutes;
//     hoursRef.textContent = formatDate.hours;
//     daysRef.textContent = formatDate.days;
//   }
  
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';

document.body.style.backgroundColor = '#ece5da';
const TIMER_DELAY = 1000;
let intervalId = null;
let selectedDate = null;
let currentDate = null;

const calendar = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start-timer]');
startBtn.disabled = true;

Report.info(
  '👋 Greeting, my Friend!',
  'Please, choose a date and click on start',
  'Okay'
);

flatpickr(calendar, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      Report.failure(
        '🥺 Ooops...',
        'Please, choose a date in the future and remember: "Knowledge rests not upon truth alone, but upon error also." - Carl Gustav Jung',
        'Okay'
      );
    } else {
      Report.success(
        '🥰 Congratulation! Click on start!',
        '"Do not try to become a person of success but try to become a person of value." <br/><br/>- Albert Einstein',
        'Okay'
      );
      startBtn.disabled = false;
      const setTimer = () => {
        selectedDate = selectedDates[0].getTime();
        timer.start();
      };

      startBtn.addEventListener('click', setTimer);
    }
  },
});

const timer = {
  rootSelector: document.querySelector('.timer'),
  start() {
    intervalId = setInterval(() => {
      startBtn.disabled = true;
      calendar.disabled = true;
      currentDate = Date.now();
      const delta = selectedDate - currentDate;

      if (delta <= 0) {
        this.stop();
        Report.info(
          '👏 Congratulation! Timer stopped!',
          'Please, if you want to start timer, choose a date and click on start or reload this page',
          'Okay'
        );
        return;
      }
      const { days, hours, minutes, seconds } = this.convertMs(delta);
      this.rootSelector.querySelector('[data-days]').textContent =
        this.addLeadingZero(days);
      this.rootSelector.querySelector('[data-hours]').textContent =
        this.addLeadingZero(hours);
      this.rootSelector.querySelector('[data-minutes]').textContent =
        this.addLeadingZero(minutes);
      this.rootSelector.querySelector('[data-seconds]').textContent =
        this.addLeadingZero(seconds);
    }, TIMER_DELAY);
  },

  stop() {
    clearInterval(intervalId);
    this.intervalId = null;
    startBtn.disabled = true;
    calendar.disabled = false;
  },

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = this.addLeadingZero(Math.floor(ms / day));
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = this.addLeadingZero(
      Math.floor(((ms % day) % hour) / minute)
    );
    const seconds = this.addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
  },

  addLeadingZero(value) {
    return String(value).padStart(2, 0);
  },
};