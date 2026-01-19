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


// Formspree form
const form = document.getElementById("contact-form");
const statusEl = document.getElementById("form-status");

if (form && statusEl) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    statusEl.textContent = "";
    statusEl.className = "form-status";

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn?.textContent;
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";
    }

    try {
      const formData = new FormData(form);
      const res = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { "Accept": "application/json" },
      });

      if (res.ok) {
        form.reset();
        statusEl.textContent = "✅ Thanks! Message received — we’ll reply within 1 business day.";
        statusEl.classList.add("is-success");
      } else {
        statusEl.textContent = "⚠️ Something went wrong. Please try again or email us directly.";
        statusEl.classList.add("is-error");
      }
    } catch (err) {
      statusEl.textContent = "⚠️ Network error. Please try again in a moment.";
      statusEl.classList.add("is-error");
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText || "Send message";
      }
    }
  });
}

// --- Scroll reveal (manual stagger classes supported) ---
(function () {
  const els = Array.from(document.querySelectorAll(".reveal"));
  if (!els.length) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (prefersReduced.matches) {
    els.forEach(el => el.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
  );

  els.forEach(el => io.observe(el));
})();

// --- Subtle scroll parallax for backgrounds ---
(function () {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (prefersReduced.matches) return;

  const heroes = document.querySelectorAll(".parallax-hero, .parallax-alt");
  if (!heroes.length) return;

  let ticking = false;

  function update() {
    ticking = false;

    const vh = window.innerHeight || 800;

    heroes.forEach((el) => {
      const r = el.getBoundingClientRect();

      // progress: -1..1 roughly around viewport center
      const center = r.top + r.height / 2;
      const progress = (center - vh / 2) / (vh / 2);

      // clamp
      const p = Math.max(-1, Math.min(1, progress));

      // move 0..10px (subtle!)
      //const y1 = p * -26;
      //const y2 = p * -12;

      //const x1 = p * 6;
      //const x2 = p * 3;

      const y1 = p * -240; // DEBUG: nagy mozgás
      const x1 = p * 60;   // DEBUG: nagy mozgás

      const y2 = p * -360; // DEBUG: nagy mozgás
      const x2 = p * 90;   // DEBUG: nagy mozgás

      el.style.setProperty("--parallaxY", `${y1.toFixed(2)}px`);
      el.style.setProperty("--parallaxY2", `${y2.toFixed(2)}px`);
      el.style.setProperty("--parallaxX", `${x1.toFixed(2)}px`);
      el.style.setProperty("--parallaxX2", `${x2.toFixed(2)}px`);


    });
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);

  // initial
  onScroll();
})();















// --- Cal.com embed: lazy-load on first click (GitHub Pages friendly) ---
(function () {
  const CAL_SRC = "https://app.cal.com/embed/embed.js";
  const btn = document.querySelector(".js-book-call");
  if (!btn) return;

  let booted = false;
  let booting = false;

  function bootCalIfNeeded() {
    if (booted) return Promise.resolve();
    if (booting) {
      return new Promise((resolve) => {
        const t = setInterval(() => {
          if (booted) {
            clearInterval(t);
            resolve();
          }
        }, 50);
      });
    }
    booting = true;

    // ✅ Official Cal element-click snippet logic (unchanged)
    (function (C, A, L) {
      let p = function (a, ar) { a.q.push(ar); };
      let d = C.document;
      C.Cal = C.Cal || function () {
        let cal = C.Cal, ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api = function () { p(api, arguments); };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else {
            p(cal, ar);
          }
          return;
        }
        p(cal, ar);
      };
    })(window, CAL_SRC, "init");

    // Init + UI config (this matches your previous inline snippet style)
    window.Cal("init", { origin: "https://cal.com" });

    // Ha ez mégis gondot okozna, kommenteld ki első körben, és teszteld úgy.
    window.Cal("ui", {
      styles: { branding: { brandColor: "#22c55e" } },
    });

    // wait until script is actually loaded
    return new Promise((resolve) => {
      const s = document.querySelector(`script[src="${CAL_SRC}"]`);
      if (!s) {
        booted = true;
        booting = false;
        resolve();
        return;
      }
      s.addEventListener("load", () => {
        booted = true;
        booting = false;
        resolve();
      });
      // fallback: in case load already happened
      setTimeout(() => {
        booted = true;
        booting = false;
        resolve();
      }, 600);
    });
  }

  btn.addEventListener(
    "click",
    async (e) => {
      if (booted) return; // Cal is ready, let it handle the click normally

      e.preventDefault();

      const originalText = btn.textContent;
      btn.disabled = true;
      btn.textContent = "Loading calendar…";

      try {
        await bootCalIfNeeded();
        btn.disabled = false;
        btn.textContent = originalText;

        // Re-trigger click so Cal's element-click handler opens the popup
        setTimeout(() => btn.click(), 0);
      } catch (err) {
        btn.disabled = false;
        btn.textContent = originalText;
        console.error(err);
        alert("Sorry — the calendar failed to load. Please try again.");
      }
    },
    true
  );
})();
