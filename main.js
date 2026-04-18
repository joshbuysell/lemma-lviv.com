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
