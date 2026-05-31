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

/* ── Price Constructor ── */
(function () {
  var productEl  = document.getElementById('c-product');
  if (!productEl) return;

  var widthEl    = document.getElementById('c-width');
  var depthEl    = document.getElementById('c-depth');
  var heightEl   = document.getElementById('c-height');
  var widthVal   = document.getElementById('c-width-val');
  var depthVal   = document.getElementById('c-depth-val');
  var heightVal  = document.getElementById('c-height-val');
  var priceEl    = document.getElementById('c-price');
  var sumProduct = document.getElementById('c-sum-product');
  var sumDims    = document.getElementById('c-sum-dims');
  var sumMat     = document.getElementById('c-sum-material');
  var sumExtras  = document.getElementById('c-sum-extras');
  var optionsWrap = document.getElementById('c-options');

  var basePrices = {
    'sink-1':     4500,
    'sink-2':     6800,
    'table-sink': 7200,
    'table-bath': 6500,
    'shelf-wall': 2800,
    'bath-tech':  5500,
    'tank-cone':  12000,
    'tank-ckt':   18000,
    'filter':     3200,
    'oven':       9500,
    'skewer':     350,
    'custom':     8000
  };

  var materialMultipliers = { '304': 1, '316': 1.35, '430': 0.85 };
  var materialNames = { '304': 'AISI 304', '316': 'AISI 316', '430': 'AISI 430' };

  var productNames = {};
  for (var i = 0; i < productEl.options.length; i++) {
    productNames[productEl.options[i].value] = productEl.options[i].text;
  }

  var extraNames = {
    'shelf-bottom': 'Нижня полиця',
    'wall-guard':   'Стіновий борт',
    'legs-adj':     'Регульовані ніжки',
    'wheels':       'Колеса з гальмом',
    'drain':        'Зливний кран',
    'grate':        'Знімна решітка'
  };

  function getCheckedExtras() {
    var boxes = optionsWrap.querySelectorAll('input[type="checkbox"]:checked');
    var items = [];
    for (var j = 0; j < boxes.length; j++) items.push(boxes[j]);
    return items;
  }

  function getMaterial() {
    var radios = document.querySelectorAll('input[name="c-material"]');
    for (var k = 0; k < radios.length; k++) {
      if (radios[k].checked) return radios[k].value;
    }
    return '304';
  }

  function formatPrice(n) {
    return n.toLocaleString('uk-UA') + ' ₴';
  }

  function calculate() {
    var product = productEl.value;
    var w = parseInt(widthEl.value, 10);
    var d = parseInt(depthEl.value, 10);
    var h = parseInt(heightEl.value, 10);
    var mat = getMaterial();

    widthVal.textContent  = w + ' мм';
    depthVal.textContent  = d + ' мм';
    heightVal.textContent = h + ' мм';

    var base = basePrices[product] || 5000;
    // Baseline dimensions (mm): 1000 width, 600 depth, 850 height — coefficient normalizes to these
    var sizeCoeff = (w / 1000) * (d / 600) * (h / 850);
    // Floor at 0.5 so small items don't drop below 50% of base price
    sizeCoeff = Math.max(sizeCoeff, 0.5);

    var price = base * sizeCoeff * materialMultipliers[mat];

    var extras = getCheckedExtras();
    var extraTotal = 0;
    var extraLabels = [];
    for (var e = 0; e < extras.length; e++) {
      var ep = parseInt(extras[e].getAttribute('data-price'), 10) || 0;
      extraTotal += ep;
      extraLabels.push(extraNames[extras[e].value] || extras[e].value);
    }

    price += extraTotal;
    price = Math.round(price / 100) * 100;

    priceEl.textContent = formatPrice(price);
    sumProduct.textContent = productNames[product] || product;
    sumDims.textContent = w + ' × ' + d + ' × ' + h + ' мм';
    sumMat.textContent = materialNames[mat];
    sumExtras.textContent = extraLabels.length ? extraLabels.join(', ') : '—';
  }

  productEl.addEventListener('change', calculate);
  widthEl.addEventListener('input', calculate);
  depthEl.addEventListener('input', calculate);
  heightEl.addEventListener('input', calculate);

  var radios = document.querySelectorAll('input[name="c-material"]');
  for (var r = 0; r < radios.length; r++) {
    radios[r].addEventListener('change', calculate);
  }

  optionsWrap.addEventListener('change', calculate);

  calculate();
})();
