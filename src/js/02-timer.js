import flatpickr from "flatpickr";
import convertMs from './dateConvert';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import "flatpickr/dist/flatpickr.min.css";

let getRef = selector => document.querySelector(selector);
const imputDatePickerRef = getRef('#datetime-picker');
const btnStartRef = getRef('[data-start]');
const daysRef = getRef('[data-days]');
const hoursRef = getRef('[data-hours]');
const minutesRef = getRef('[data-minutes]');
const secondsRef = getRef('[data-seconds]');

let timeDifference = 0;
let timerId = null;
let formatDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    currentDifferenceDate(selectedDates[0]);
  },
};

btnStartRef.setAttribute('disabled', true);

flatpickr(imputDatePickerRef, options);

btnStartRef.addEventListener('click', onBtnStart);

window.addEventListener('keydown', e => {
    if (e.code === 'Escape' && timerId) {
      clearInterval(timerId);

      imputDatePickerRef.removeAttribute('disabled');
    btnStartRef.setAttribute('disabled', true);

    secondsRef.textContent = '00';
    minutesRef.textContent = '00';
    hoursRef.textContent = '00';
    daysRef.textContent = '00';
  }
});
function onBtnStart() {
    timerId = setInterval(startTimer, 1000);
  }

  function currentDifferenceDate(selectedDates) {
    const currentDate = Date.now();

    if (selectedDates < currentDate) {
        btnStartRef.setAttribute('disabled', true);
        return Notify.failure('Please choose a date in the future');
      }
    
      timeDifference = selectedDates.getTime() - currentDate;
      formatDate = convertMs(timeDifference);
    
      renderDate(formatDate);
      btnStartRef.removeAttribute('disabled');
    }
  //timer
  function startTimer() {
    btnStartRef.setAttribute('disabled', true);
    imputDatePickerRef.setAttribute('disabled', true);
  
    timeDifference -= 1000;
  
    if (secondsRef.textContent <= 0 && minutesRef.textContent <= 0) {
      Notify.success('Time end');
      clearInterval(timerId);
    } else {
      formatDate = convertMs(timeDifference);
      renderDate(formatDate);
    }
  }  
  //data
  function renderDate(formatDate) {
    secondsRef.textContent = formatDate.seconds;
    minutesRef.textContent = formatDate.minutes;
    hoursRef.textContent = formatDate.hours;
    daysRef.textContent = formatDate.days;
  }
  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  
  console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
  console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}