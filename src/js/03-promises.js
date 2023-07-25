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
  function onPromiseCreate(e) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const firstDelay = Number(formData.get('delay'));
    const step = Number(formData.get('step'));
    const amount = Number(formData.get('amount'));
    let accumulatedDelay = 0;
    for (let i = 1; i <= amount; i+=) {
      createPromise(i, firstDelay + accumulatedDelay)
        .then(({ position, delay }) => {
          notiflix.Notify.success(`:white_tick: Проміс ${position} виконано за ${delay}мс`);
        })
        .catch(({ position, delay }) => {
          notiflix.Notify.failure(
            `:x: Проміс ${position} відхилено за ${delay}мс`
          );
        });
      accumulatedDelay += step;
    }
  }