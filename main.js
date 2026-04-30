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

document.addEventListener('click', function (e) {
  var link = e.target.closest('a[href^="tel:"], a[href^="mailto:"]');
  if (link) {
    e.preventDefault();
    gtagSendEvent(link.href);
    gtagSendEvent_3(link.href);
  }
});

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const nameEl  = document.getElementById('form-name');
    const phoneEl = document.getElementById('form-phone');
    let valid = true;

    [nameEl, phoneEl].forEach(el => {
      if (!el.value.trim()) {
        el.classList.add('is-invalid');
        valid = false;
      } else {
        el.classList.remove('is-invalid');
      }
    });

    if (!valid) return;

    const btn = contactForm.querySelector('.form-submit');
    btn.disabled = true;
    btn.textContent = 'Надсилається...';

    setTimeout(() => {
      contactForm.innerHTML = '<div style="text-align:center;padding:2rem 0"><svg style="width:3rem;height:3rem;color:#2563eb;margin:0 auto 1rem;display:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg><h4 style="font-size:1.25rem;font-weight:700;color:#1e293b;margin-bottom:0.5rem">Дякуємо!</h4><p style="color:#475569">Ваша заявка отримана. Ми зателефонуємо вам найближчим часом.</p></div>';
    }, 800);
  });

  contactForm.querySelectorAll('.form-input').forEach(el => {
    el.addEventListener('input', () => el.classList.remove('is-invalid'));
  });
}
