document.getElementById('year').textContent = new Date().getFullYear();

const burger    = document.getElementById('burger');
const mobileNav = document.getElementById('mobileNav');

burger.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('is-open');
  burger.classList.toggle('is-open', isOpen);
  burger.setAttribute('aria-expanded', isOpen);
  mobileNav.setAttribute('aria-hidden', !isOpen);
});

mobileNav.querySelectorAll('.mobile-nav__link').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('is-open');
    burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
  });
});

const form = document.getElementById('contactForm');

form.addEventListener('submit', e => {
  e.preventDefault();

  const name  = form.querySelector('#cf-name');
  const phone = form.querySelector('#cf-phone');
  let valid = true;

  clearError('err-name');
  clearError('err-phone');
  name.classList.remove('form-input--error');
  phone.classList.remove('form-input--error');

  if (name.value.trim().length < 2) {
    showError('err-name', "Введіть ваше ім'я (мінімум 2 символи)");
    name.classList.add('form-input--error');
    valid = false;
  }

  const phoneClean = phone.value.replace(/\D/g, '');
  if (phoneClean.length < 10) {
    showError('err-phone', 'Введіть коректний номер телефону');
    phone.classList.add('form-input--error');
    valid = false;
  }

  if (!valid) return;

  form.reset();
  showToast();
});

function showError(id, msg) {
  document.getElementById(id).textContent = msg;
}

function clearError(id) {
  document.getElementById(id).textContent = '';
}

function showToast() {
  const toast = document.getElementById('toast');
  toast.classList.add('is-visible');
  setTimeout(() => toast.classList.remove('is-visible'), 4000);
}
