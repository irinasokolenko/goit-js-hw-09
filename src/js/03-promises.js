import Notiflix from 'notiflix';

const form = document.querySelector('form.form');
const options = {
  position: 'center-bottom',
  distance: '15px',
  borderRadius: '15px',
  timeout: 10000,
  clickToClose: true,
  cssAnimationStyle: 'from-right',
};
form.addEventListener('click', onPromiseCreate);
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
// function createPromise(position, delay) {
//   return new Promise((resolve, reject) => {
//     const shouldResolve = Math.random() > 0.3;
//     setTimeout(() => {
//       if (shouldResolve) {
//         resolve({ position, delay });
//       } else {
//         reject({ position, delay });
//       }
//     }, delay);
//   });
// }
// function onPromiseCreate(e) {
//   e.preventDefault();
//   const { delay, step, amount } = e.currentTarget.elements;
//   let inputDelay = Number(delay.value);
//   let inputStep = Number(step.value);
//   let inputAmount = Number(amount.value);

//   for (let i = 1; i <= inputAmount; i += 1) {
//     inputDelay += inputStep;

//     createPromise(i, inputDelay)
//       .then(({ position, delay }) => {
//         Notiflix.Notify.success(
//           `✅ Fulfilled promise ${position} in ${delay}ms`,
//           options
//         );
//       })
//       .catch(({ position, delay }) => {
//         Notiflix.Notify.failure(
//           `❌ Rejected promise ${position} in ${delay}ms`,
//           options
//         );
//       });
//     e.currentTarget.reset();
//   }
// }
function onPromiseCreate(e) {
    e.preventDefault();
  
    let valueDelay = Number(refs.delay.value);
    let step = Number(refs.step.value);
    let amount = Number(refs.amount.value);
  
    for (let i = 1; i <= amount; i += 1) {
      let promiseDelay = valueDelay + step * i;
  
      createPromise(i, promiseDelay)
        .then(({ position, delay }) => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }
  }
  
