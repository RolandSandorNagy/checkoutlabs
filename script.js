// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const mobileNav = document.querySelector('.mobile-nav');

if (toggle && mobileNav) {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    mobileNav.hidden = expanded;
  });

  // Close mobile nav when clicking a link
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      mobileNav.hidden = true;
    });
  });
}

// FAQ accordion
document.querySelectorAll('.faq-item').forEach((item) => {
  const btn = item.querySelector('.faq-q');
  const ans = item.querySelector('.faq-a');
  if (!btn || !ans) return;

  btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    // close others for cleaner UX
    document.querySelectorAll('.faq-item.open').forEach((other) => {
      if (other !== item) {
        other.classList.remove('open');
        const b = other.querySelector('.faq-q');
        const a = other.querySelector('.faq-a');
        if (b) b.setAttribute('aria-expanded', 'false');
        if (a) a.hidden = true;
      }
    });

    item.classList.toggle('open', !isOpen);
    btn.setAttribute('aria-expanded', String(!isOpen));
    ans.hidden = isOpen;
  });
});

// Footer year
const y = document.getElementById('year');
if (y) y.textContent = String(new Date().getFullYear());


// cal.com
/*
document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("cal:ready", () => {
    document.querySelectorAll(".js-book-call").forEach(btn => {
      btn.addEventListener("click", () => {
        window.Cal.openModal({
          calLink: "roland-nagy-jzu4ii/intro-call",
          config: {
            layout: "month_view"
          }
        });
      });
    });
  });
});
*/