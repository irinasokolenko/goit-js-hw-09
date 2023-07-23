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
