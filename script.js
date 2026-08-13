// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const mobileNav = document.querySelector('.mobile-nav');

if (toggle && mobileNav) {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    mobileNav.hidden = expanded;
    document.querySelector(".site-header")?.classList.remove("is-hidden");
  });

  // Close mobile nav when clicking a link
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      mobileNav.hidden = true;
    });
  });
}

// Header depth after scroll
(function () {
  const header = document.querySelector(".site-header");
  if (!header) return;
  const progressBar = document.querySelector(".site-scroll-progress");

  let lastScrollY = window.scrollY;
  let ticking = false;

  function updateHeaderState() {
    ticking = false;

    const currentScrollY = Math.max(0, window.scrollY);
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? Math.min(1, Math.max(0, currentScrollY / scrollable)) : 0;
    const delta = currentScrollY - lastScrollY;
    const mobileMenuOpen = mobileNav && !mobileNav.hidden;

    header.classList.toggle("is-scrolled", currentScrollY > 0);
    header.style.setProperty("--scrollProgress", progress.toFixed(4));
    if (progressBar) progressBar.style.setProperty("--scrollProgress", progress.toFixed(4));

    if (currentScrollY <= 24 || mobileMenuOpen) {
      header.classList.remove("is-hidden");
    } else if (Math.abs(delta) > 6) {
      header.classList.toggle("is-hidden", delta > 0 && currentScrollY > 140);
    }

    lastScrollY = currentScrollY;
  }

  function requestHeaderUpdate() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateHeaderState);
  }

  header.addEventListener("focusin", () => {
    header.classList.remove("is-hidden");
  });

  updateHeaderState();
  window.addEventListener("scroll", requestHeaderUpdate, { passive: true });
  window.addEventListener("resize", requestHeaderUpdate);
})();

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

// Start logo marquees only after the logo images are ready enough to render.
(function () {
  const marquees = document.querySelectorAll(".logo-marquee");
  if (!marquees.length) return;

  marquees.forEach((marquee) => {
    const images = Array.from(marquee.querySelectorAll("img"));
    if (!images.length) {
      marquee.classList.add("is-ready");
      return;
    }

    const ready = images.map((img) => {
      img.loading = "eager";
      img.decoding = "async";

      if (img.complete && img.naturalWidth > 0) {
        return typeof img.decode === "function" ? img.decode().catch(() => {}) : Promise.resolve();
      }

      return new Promise((resolve) => {
        img.addEventListener("load", resolve, { once: true });
        img.addEventListener("error", resolve, { once: true });
      }).then(() => (typeof img.decode === "function" ? img.decode().catch(() => {}) : undefined));
    });

    Promise.race([
      Promise.allSettled(ready),
      new Promise((resolve) => window.setTimeout(resolve, 2500)),
    ]).then(() => {
      marquee.classList.add("is-ready");
    });
  });
})();

// Additional store work progressive reveal
(function () {
  document.querySelectorAll("[data-load-more-list]").forEach((list) => {
    const cards = Array.from(list.querySelectorAll(".additional-store-card"));
    if (!cards.length) return;

    const initialVisible = Number(list.dataset.initialVisible) || 6;
    const visibleStep = Number(list.dataset.visibleStep) || 3;
    const trigger = list.parentElement?.querySelector("[data-load-more-trigger]");
    const actions = trigger?.closest(".additional-store-actions");

    let visibleCount = Math.min(initialVisible, cards.length);

    function render() {
      cards.forEach((card, index) => {
        card.hidden = index >= visibleCount;
      });

      const hasMore = visibleCount < cards.length;
      if (actions) actions.hidden = !hasMore;
      if (trigger) trigger.setAttribute("aria-expanded", String(!hasMore));
    }

    render();

    if (!trigger) return;

    trigger.addEventListener("click", () => {
      visibleCount = Math.min(visibleCount + visibleStep, cards.length);
      render();
    });
  });
})();

// Evidence screenshot sliders
(function () {
  const strips = Array.from(document.querySelectorAll(".evidence-strip"));
  if (!strips.length) return;

  strips.forEach((strip) => {
    if (strip.closest(".evidence-slider")) return;

    const slider = document.createElement("div");
    slider.className = "evidence-slider";
    strip.parentNode.insertBefore(slider, strip);
    slider.appendChild(strip);

    const controls = document.createElement("div");
    controls.className = "evidence-slider-controls";

    const prev = document.createElement("button");
    prev.className = "evidence-slider-button";
    prev.type = "button";
    prev.setAttribute("aria-label", "Previous screenshot");
    prev.innerHTML = "&#8249;";

    const track = document.createElement("div");
    track.className = "evidence-slider-track";
    track.setAttribute("aria-hidden", "true");

    const thumb = document.createElement("span");
    thumb.className = "evidence-slider-thumb";
    track.appendChild(thumb);

    const next = document.createElement("button");
    next.className = "evidence-slider-button";
    next.type = "button";
    next.setAttribute("aria-label", "Next screenshot");
    next.innerHTML = "&#8250;";

    controls.append(prev, track, next);
    slider.appendChild(controls);

    function getMaxScroll() {
      return Math.max(0, strip.scrollWidth - strip.clientWidth);
    }

    function update() {
      const maxScroll = getMaxScroll();
      const isScrollable = maxScroll > 2;
      const progress = isScrollable ? Math.min(1, Math.max(0, strip.scrollLeft / maxScroll)) : 0;

      slider.classList.toggle("is-scrollable", isScrollable);
      slider.classList.toggle("is-at-start", !isScrollable || strip.scrollLeft <= 2);
      slider.classList.toggle("is-at-end", !isScrollable || strip.scrollLeft >= maxScroll - 2);
      slider.style.setProperty("--evidenceProgress", isScrollable ? Math.max(.08, progress).toFixed(4) : "0");

      prev.disabled = !isScrollable || strip.scrollLeft <= 2;
      next.disabled = !isScrollable || strip.scrollLeft >= maxScroll - 2;
    }

    function move(direction) {
      const distance = Math.max(180, Math.floor(strip.clientWidth * .72));
      strip.scrollBy({ left: direction * distance, behavior: "smooth" });
    }

    let isDragging = false;
    let dragStartX = 0;
    let dragStartScroll = 0;

    strip.addEventListener("pointerdown", (event) => {
      if (event.pointerType !== "mouse") return;
      if (getMaxScroll() <= 2) return;

      isDragging = true;
      dragStartX = event.clientX;
      dragStartScroll = strip.scrollLeft;
      strip.classList.add("is-dragging");
      strip.setPointerCapture?.(event.pointerId);
    });

    strip.addEventListener("pointermove", (event) => {
      if (!isDragging) return;
      event.preventDefault();
      strip.scrollLeft = dragStartScroll - (event.clientX - dragStartX);
    });

    function stopDragging(event) {
      if (!isDragging) return;
      isDragging = false;
      strip.classList.remove("is-dragging");
      if (event?.pointerId !== undefined) strip.releasePointerCapture?.(event.pointerId);
    }

    strip.addEventListener("pointerup", stopDragging);
    strip.addEventListener("pointercancel", stopDragging);
    strip.addEventListener("pointerleave", stopDragging);

    prev.addEventListener("click", () => move(-1));
    next.addEventListener("click", () => move(1));
    strip.addEventListener("scroll", () => window.requestAnimationFrame(update), { passive: true });

    if (typeof ResizeObserver === "function") {
      const observer = new ResizeObserver(update);
      observer.observe(strip);
    } else {
      window.addEventListener("resize", update);
    }

    strip.querySelectorAll("img").forEach((img) => {
      if (!img.complete) img.addEventListener("load", update, { once: true });
    });

    update();
  });
})();


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
  const autoRevealTargets = document.querySelectorAll(
    ".logo-section-head, .logo-grid:not(.logo-grid-home) .logo-item, .logo-grid > img, .work-logo-block, .logo-category-grid, .education-panel"
  );

  autoRevealTargets.forEach((el, index) => {
    el.classList.add("reveal");
    if (!el.classList.contains("reveal-1") && !el.classList.contains("reveal-2") && !el.classList.contains("reveal-3") && !el.classList.contains("reveal-4")) {
      el.classList.add(`reveal-${(index % 4) + 1}`);
    }
  });

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

      const y1 = p * -26;
      const x1 = p * 8;

      const y2 = p * -14;
      const x2 = p * 4;

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

// --- Pointer depth for prominent cards ---
(function () {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (prefersReduced.matches) return;
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  const cards = document.querySelectorAll(".project-card-featured, .profile-panel");
  if (!cards.length) return;

  cards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

      card.style.setProperty("--tiltX", `${(-y * 1.2).toFixed(2)}deg`);
      card.style.setProperty("--tiltY", `${(x * 1.2).toFixed(2)}deg`);
      card.style.setProperty("--glintX", `${((x + 1) * 50).toFixed(1)}%`);
      card.style.setProperty("--glintY", `${((y + 1) * 50).toFixed(1)}%`);
    });

    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--tiltX", "0deg");
      card.style.setProperty("--tiltY", "0deg");
      card.style.setProperty("--glintX", "50%");
      card.style.setProperty("--glintY", "50%");
    });
  });
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

// --- Modal logic (native <dialog>) ---
(function () {
  const openButtons = document.querySelectorAll("[data-modal-open]");
  const closeButtons = document.querySelectorAll("[data-modal-close]");

  function openModal(which) {
    const dlg = document.getElementById(`modal-${which}`);
    if (!dlg) return;

    // Native dialog support
    if (typeof dlg.showModal === "function") {
      dlg.showModal();
    } else {
      // Fallback: just unhide + simple overlay behavior
      dlg.setAttribute("open", "");
    }
  }

  function closeModal(dlg) {
    if (!dlg) return;
    if (typeof dlg.close === "function") dlg.close();
    else dlg.removeAttribute("open");
  }

  openButtons.forEach((btn) => {
    btn.addEventListener("click", () => openModal(btn.dataset.modalOpen));
  });

  closeButtons.forEach((btn) => {
    btn.addEventListener("click", () => closeModal(btn.closest("dialog")));
  });

  // Close on backdrop click
  document.querySelectorAll("dialog.modal").forEach((dlg) => {
    dlg.addEventListener("click", (e) => {
      const rect = dlg.getBoundingClientRect();
      const inDialog =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      // If click is outside the dialog card, close
      if (!inDialog) closeModal(dlg);
    });

    // ESC closes automatically in native dialogs; for fallback, we handle keydown
    dlg.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal(dlg);
    });
  });
})();
