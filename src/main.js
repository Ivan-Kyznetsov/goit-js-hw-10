import { PREP_TIME } from './js/menu.js';

const form = document.querySelector('.form');
const orderLog = document.querySelector('.order-log');

// Функція, що повертає проміс
function makeOrder(delay, shouldResolve) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve === true) {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}
// END

// Функція, що дадає рядок до журналу
function addOrderRow(drink) {
  const item = document.createElement('li');
  item.classList.add('row-pending');
  item.textContent = `⏳ ${drink} · у роботі...`;
  orderLog.append(item);
  return item;
}
// END

// Обробник SUBMIT
form.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(form);
  const drink = formData.get('drink');
  const state = formData.get('state');
  const delay = PREP_TIME[drink];
  const shouldResolve = state === 'fulfilled';
  const row = addOrderRow(drink);
  makeOrder(delay, shouldResolve)
    .then(delay => {
      row.classList.remove('row-pending');
      row.classList.add('row-ok');
      row.textContent = `✅ ${drink} · готове · ${delay} ms`;
    })
    .catch(delay => {
      row.classList.remove('row-pending');
      row.classList.add('row-err');
      row.textContent = `❌ ${drink} · скасовано · ${delay} ms`;
    })
    .finally(() => {
      row.textContent += ` · ${new Date().toLocaleTimeString('uk-UA')}`;
    });
});
// END
