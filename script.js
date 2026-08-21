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
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");

  let lastScrollY = window.scrollY;
  let ticking = false;

  function markHeaderLoaded() {
    header.classList.add("is-loaded");
  }

  if (prefersReduced.matches) {
    markHeaderLoaded();
  } else {
    header.classList.add("header-animate");
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(markHeaderLoaded);
    });
  }

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

    if (!isOpen) {
      trackEvent("faq_open", {
        question: getAnalyticsText(btn),
        section: getAnalyticsSection(item),
      });
    }
  });
});

// Footer year
const y = document.getElementById('year');
if (y) y.textContent = String(new Date().getFullYear());

function trackEvent(name, params = {}) {
  if (typeof window.gtag !== "function") return;

  window.gtag("event", name, {
    page_location: window.location.href,
    page_path: window.location.pathname,
    ...params,
  });
}

function getAnalyticsText(element) {
  return (element.getAttribute("aria-label") || element.textContent || "")
    .trim()
    .replace(/\s+/g, " ");
}

function getAnalyticsSection(element) {
  const section = element.closest("section");
  if (!section) return "";
  return section.id || section.className || "";
}

// Lightweight GA4 event tracking
(function () {
  document.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;

    const languageButton = target.closest(".language-option");
    if (languageButton instanceof HTMLElement) {
      trackEvent("language_change", {
        language: languageButton.dataset.language || getAnalyticsText(languageButton).toLowerCase(),
      });
      return;
    }

    if (target.closest(".js-book-call")) return;

    const link = target.closest("a");
    if (!(link instanceof HTMLAnchorElement)) return;

    const href = link.getAttribute("href") || "";
    if (!href.includes("#book")) return;

    const text = getAnalyticsText(link);
    const isPackageCta =
      Boolean(link.closest("#packages, .packages-section, .pricing-section")) ||
      /10 Hours|20 Hours|Emergency|package|csomag|óra|Stunden|Notfall/i.test(text);

    trackEvent(isPackageCta ? "package_cta_click" : "get_started_click", {
      link_text: text,
      link_url: link.href,
      section: getAnalyticsSection(link),
    });
  });
})();

// Scroll depth tracking, sent once per page view for each threshold.
(function () {
  const thresholds = [25, 50, 75, 90];
  const sent = new Set();
  let ticking = false;

  function getScrollPercent() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollable <= 0) return 100;
    return Math.min(100, Math.max(0, (window.scrollY / scrollable) * 100));
  }

  function updateScrollDepth() {
    ticking = false;
    const percent = getScrollPercent();

    thresholds.forEach((threshold) => {
      if (sent.has(threshold) || percent < threshold) return;
      sent.add(threshold);
      trackEvent("scroll_depth", {
        percent_scrolled: threshold,
      });
    });
  }

  function requestScrollDepthUpdate() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateScrollDepth);
  }

  updateScrollDepth();
  window.addEventListener("scroll", requestScrollDepthUpdate, { passive: true });
  window.addEventListener("resize", requestScrollDepthUpdate);
})();

// Homepage hero entrance and scroll response
(function () {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");

  function markLoaded() {
    hero.classList.add("is-loaded");
  }

  if (prefersReduced.matches) {
    markLoaded();
    return;
  }

  hero.classList.add("hero-animate");

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(markLoaded);
  });

  let ticking = false;

  function updateHeroMotion() {
    ticking = false;

    const rect = hero.getBoundingClientRect();
    const distance = Math.max(1, rect.height * 0.72);
    const progress = Math.min(1, Math.max(0, -rect.top / distance));

    const copyY = progress * -34;
    const mediaY = progress * 28;
    const mediaScale = 1 - progress * 0.035;
    const opacity = 1 - progress * 0.36;

    hero.style.setProperty("--heroCopyY", `${copyY.toFixed(2)}px`);
    hero.style.setProperty("--heroMediaY", `${mediaY.toFixed(2)}px`);
    hero.style.setProperty("--heroMediaScale", mediaScale.toFixed(4));
    hero.style.setProperty("--heroOpacity", opacity.toFixed(4));
  }

  function requestHeroMotionUpdate() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateHeroMotion);
  }

  requestHeroMotionUpdate();
  window.addEventListener("scroll", requestHeroMotionUpdate, { passive: true });
  window.addEventListener("resize", requestHeroMotionUpdate);
})();

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
      const previousVisibleCount = visibleCount;
      visibleCount = Math.min(visibleCount + visibleStep, cards.length);
      render();
      trackEvent("additional_work_load_more", {
        shown_before: previousVisibleCount,
        shown_after: visibleCount,
        total_items: cards.length,
      });
    });
  });
})();

// Desktop case-study masonry without changing the mobile reading order.
(function () {
  const desktopQuery = window.matchMedia("(min-width: 981px)");
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");

  document.querySelectorAll(".project-grid").forEach((grid) => {
    const cards = Array.from(grid.children).filter((child) => child.matches?.(".project-card:not(.project-card-featured)"));
    if (cards.length < 3) return;

    let masonry = null;
    let columns = [];
    let shorterColumn = null;
    let balanceDistance = 0;
    let ticking = false;

    function enableMasonry() {
      if (masonry) return;

      masonry = document.createElement("div");
      masonry.className = "project-masonry";

      const leftColumn = document.createElement("div");
      leftColumn.className = "project-column";

      const rightColumn = document.createElement("div");
      rightColumn.className = "project-column";

      masonry.append(leftColumn, rightColumn);
      grid.insertBefore(masonry, cards[0]);
      columns = [leftColumn, rightColumn];

      let autoIndex = 0;
      cards.forEach((card) => {
        const forced = card.dataset.forceColumn;
        if (forced === "left") { leftColumn.appendChild(card); return; }
        if (forced === "right") { rightColumn.appendChild(card); return; }
        (autoIndex % 2 === 0 ? leftColumn : rightColumn).appendChild(card);
        autoIndex += 1;
      });

      updateBalanceMetrics();
      requestBalanceUpdate();
    }

    function disableMasonry() {
      if (!masonry) return;

      columns.forEach((column) => {
        column.classList.remove("is-scroll-balanced");
        column.style.removeProperty("--projectColumnOffset");
      });
      cards.forEach((card) => grid.appendChild(card));
      masonry.remove();
      masonry = null;
      columns = [];
      shorterColumn = null;
      balanceDistance = 0;
    }

    function render() {
      if (desktopQuery.matches) {
        enableMasonry();
      } else {
        disableMasonry();
      }
    }

    function updateBalanceMetrics() {
      if (!masonry || columns.length !== 2 || prefersReduced.matches) {
        columns.forEach((column) => {
          column.classList.remove("is-scroll-balanced");
          column.style.removeProperty("--projectColumnOffset");
        });
        shorterColumn = null;
        balanceDistance = 0;
        return;
      }

      const heights = columns.map((column) => column.scrollHeight);
      const difference = Math.abs(heights[0] - heights[1]);

      columns.forEach((column) => {
        column.classList.remove("is-scroll-balanced");
        column.style.removeProperty("--projectColumnOffset");
      });

      if (difference < 18) {
        shorterColumn = null;
        balanceDistance = 0;
        return;
      }

      shorterColumn = heights[0] < heights[1] ? columns[0] : columns[1];
      balanceDistance = difference;
      shorterColumn.classList.add("is-scroll-balanced");
    }

    function updateBalanceOffset() {
      ticking = false;
      if (!masonry || !shorterColumn || balanceDistance <= 0) return;

      const rect = masonry.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const scrollRange = Math.max(1, rect.height - viewportHeight * .62);
      const progress = Math.min(1, Math.max(0, (viewportHeight * .16 - rect.top) / scrollRange));
      const offset = balanceDistance * progress;

      shorterColumn.style.setProperty("--projectColumnOffset", `${offset.toFixed(2)}px`);
    }

    function requestBalanceUpdate() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateBalanceOffset);
    }

    function recalculateBalance() {
      window.requestAnimationFrame(() => {
        updateBalanceMetrics();
        requestBalanceUpdate();
      });
    }

    render();
    window.setTimeout(recalculateBalance, 0);
    window.setTimeout(recalculateBalance, 500);

    if (typeof desktopQuery.addEventListener === "function") {
      desktopQuery.addEventListener("change", render);
      prefersReduced.addEventListener("change", recalculateBalance);
    } else {
      desktopQuery.addListener(render);
      prefersReduced.addListener(recalculateBalance);
    }

    window.addEventListener("scroll", requestBalanceUpdate, { passive: true });
    window.addEventListener("resize", recalculateBalance);
    cards.forEach((card) => {
      card.querySelectorAll("img").forEach((img) => {
        if (!img.complete) img.addEventListener("load", recalculateBalance, { once: true });
      });
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

    controls.append(prev, next);
    slider.appendChild(controls);
    slider.appendChild(track);

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
    let didDrag = false;
    let pendingLightboxImage = null;

    function getPointerImage(event) {
      const target = event.target;
      if (!(target instanceof Element)) return null;
      const img = target.closest(".evidence-strip img");
      return img instanceof HTMLImageElement ? img : null;
    }

    strip.addEventListener("pointerdown", (event) => {
      if (event.pointerType !== "mouse") return;
      if (getMaxScroll() <= 2) return;

      isDragging = true;
      didDrag = false;
      pendingLightboxImage = getPointerImage(event);
      dragStartX = event.clientX;
      dragStartScroll = strip.scrollLeft;
      strip.classList.add("is-dragging");
      strip.setPointerCapture?.(event.pointerId);
    });

    strip.addEventListener("pointermove", (event) => {
      if (!isDragging) return;
      event.preventDefault();
      if (Math.abs(event.clientX - dragStartX) > 6) didDrag = true;
      strip.scrollLeft = dragStartScroll - (event.clientX - dragStartX);
    });

    function stopDragging(event, allowOpen = false) {
      if (!isDragging) return;
      const shouldOpenLightbox = allowOpen && !didDrag && pendingLightboxImage;
      isDragging = false;
      strip.classList.remove("is-dragging");
      if (didDrag || shouldOpenLightbox) {
        strip.dataset.dragJustEnded = "true";
        window.setTimeout(() => {
          delete strip.dataset.dragJustEnded;
        }, 120);
      }
      if (event?.pointerId !== undefined) strip.releasePointerCapture?.(event.pointerId);
      if (shouldOpenLightbox) {
        pendingLightboxImage.dispatchEvent(new CustomEvent("evidenceLightboxOpen", {
          bubbles: true,
          detail: { image: pendingLightboxImage },
        }));
      }
      pendingLightboxImage = null;
    }

    strip.addEventListener("pointerup", (event) => stopDragging(event, true));
    strip.addEventListener("pointercancel", (event) => stopDragging(event));
    strip.addEventListener("pointerleave", (event) => stopDragging(event));

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
      img.tabIndex = 0;
      img.setAttribute("role", "button");
      img.setAttribute("aria-label", `${img.alt || "Project screenshot"} - open larger preview`);
    });

    update();
  });
})();

// Evidence screenshot lightbox (also powers the blog's clickable post images via .post-gallery)
(function () {
  const lightboxSelector = ".evidence-strip img, .post-gallery img";
  const evidenceImages = Array.from(document.querySelectorAll(lightboxSelector));
  if (!evidenceImages.length) return;

  const lightbox = document.createElement("div");
  lightbox.className = "evidence-lightbox";
  lightbox.hidden = true;
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.setAttribute("aria-label", "Project screenshot preview");

  const closeButton = document.createElement("button");
  closeButton.className = "evidence-lightbox-close";
  closeButton.type = "button";
  closeButton.setAttribute("aria-label", "Close screenshot preview");
  closeButton.innerHTML = '<svg viewBox="0 0 20 20" width="18" height="18" fill="none" aria-hidden="true"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';

  const previousButton = document.createElement("button");
  previousButton.className = "evidence-lightbox-nav evidence-lightbox-prev";
  previousButton.type = "button";
  previousButton.setAttribute("aria-label", "Previous screenshot");
  previousButton.innerHTML = '<svg viewBox="0 0 20 20" width="20" height="20" fill="none" aria-hidden="true"><path d="M12 4l-6 6 6 6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  const nextButton = document.createElement("button");
  nextButton.className = "evidence-lightbox-nav evidence-lightbox-next";
  nextButton.type = "button";
  nextButton.setAttribute("aria-label", "Next screenshot");
  nextButton.innerHTML = '<svg viewBox="0 0 20 20" width="20" height="20" fill="none" aria-hidden="true"><path d="M8 4l6 6-6 6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  const figure = document.createElement("figure");
  figure.className = "evidence-lightbox-figure";

  const imageWrap = document.createElement("div");
  imageWrap.className = "evidence-lightbox-image-wrap";

  const image = document.createElement("img");
  image.className = "evidence-lightbox-image";
  image.alt = "";

  const lens = document.createElement("div");
  lens.className = "evidence-lightbox-lens";
  lens.setAttribute("aria-hidden", "true");

  imageWrap.append(image, lens);

  const caption = document.createElement("figcaption");
  caption.className = "evidence-lightbox-caption";

  figure.append(imageWrap, caption);
  lightbox.append(closeButton, previousButton, figure, nextButton);
  document.body.appendChild(lightbox);

  let activeImages = [];
  let activeIndex = 0;
  let lastFocus = null;

  const supportsHoverZoom = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const ZOOM = 2.4;

  function hideLens() {
    lens.classList.remove("is-active");
    image.classList.remove("is-zoom-active");
  }

  function updateLens(event) {
    const rect = image.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
      hideLens();
      return;
    }

    const lensSize = lens.offsetWidth || 220;
    lens.style.left = `${x - lensSize / 2}px`;
    lens.style.top = `${y - lensSize / 2}px`;
    lens.style.backgroundImage = `url("${image.currentSrc || image.src}")`;
    lens.style.backgroundSize = `${rect.width * ZOOM}px ${rect.height * ZOOM}px`;
    lens.style.backgroundPosition = `${-(x * ZOOM - lensSize / 2)}px ${-(y * ZOOM - lensSize / 2)}px`;
    lens.classList.add("is-active");
    image.classList.add("is-zoom-active");
  }

  if (supportsHoverZoom) {
    image.addEventListener("mouseenter", updateLens);
    image.addEventListener("mousemove", updateLens);
    image.addEventListener("mouseleave", hideLens);
  }

  function render() {
    const activeImage = activeImages[activeIndex];
    if (!activeImage) return;

    hideLens();
    image.src = activeImage.currentSrc || activeImage.src;
    image.alt = activeImage.alt || "Project screenshot";
    caption.textContent = activeImage.alt || "";

    const hasMultiple = activeImages.length > 1;
    previousButton.hidden = !hasMultiple;
    nextButton.hidden = !hasMultiple;
  }

  function openLightbox(targetImage) {
    const strip = targetImage.closest(".evidence-strip, .post-gallery");
    activeImages = Array.from(strip?.querySelectorAll("img") || [targetImage]);
    activeIndex = Math.max(0, activeImages.indexOf(targetImage));
    lastFocus = document.activeElement;

    const postArticle = targetImage.closest(".blog-article");

    if (postArticle) {
      const postTitle = postArticle.querySelector(".blog-article-header h1");
      trackEvent("blog_image_open", {
        image_alt: targetImage.alt || "",
        image_index: activeIndex + 1,
        image_count: activeImages.length,
        post_title: postTitle ? getAnalyticsText(postTitle) : "",
      });
    } else {
      const projectCard = targetImage.closest(".project-card");
      const projectTitle = projectCard?.querySelector("h3");
      const projectBrand = projectCard?.querySelector(".project-kicker");

      trackEvent("case_study_image_open", {
        image_alt: targetImage.alt || "",
        image_index: activeIndex + 1,
        image_count: activeImages.length,
        project_title: projectTitle ? getAnalyticsText(projectTitle) : "",
        project_brand: projectBrand ? getAnalyticsText(projectBrand) : "",
      });
    }

    render();
    lightbox.hidden = false;
    document.body.classList.add("evidence-lightbox-open");
    window.requestAnimationFrame(() => lightbox.classList.add("is-open"));
    closeButton.focus({ preventScroll: true });
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    document.body.classList.remove("evidence-lightbox-open");
    hideLens();
    window.setTimeout(() => {
      lightbox.hidden = true;
      image.removeAttribute("src");
    }, 160);
    if (lastFocus && typeof lastFocus.focus === "function") {
      lastFocus.focus({ preventScroll: true });
    }
  }

  function move(direction) {
    if (activeImages.length <= 1) return;
    activeIndex = (activeIndex + direction + activeImages.length) % activeImages.length;
    render();
  }

  function getEvidenceImageFromEvent(event) {
    const target = event.target;
    if (!(target instanceof Element)) return null;
    const img = target.closest(lightboxSelector);
    return img instanceof HTMLImageElement ? img : null;
  }

  function canOpenFromImage(img) {
    const strip = img.closest(".evidence-strip, .post-gallery");
    return !strip?.classList.contains("is-dragging") && strip?.dataset.dragJustEnded !== "true";
  }

  evidenceImages.forEach((img) => {
    img.classList.add("is-lightbox-trigger");
    if (!img.hasAttribute("tabindex")) img.tabIndex = 0;
    if (!img.hasAttribute("role")) img.setAttribute("role", "button");
    if (!img.hasAttribute("aria-label")) {
      img.setAttribute("aria-label", `${img.alt || "Image"} - open larger preview`);
    }
  });

  document.addEventListener("click", (event) => {
    const img = getEvidenceImageFromEvent(event);
    if (!img || !canOpenFromImage(img)) return;
    event.preventDefault();
    openLightbox(img);
  });

  document.addEventListener("evidenceLightboxOpen", (event) => {
    const img = event.detail?.image;
    if (!(img instanceof HTMLImageElement)) return;
    openLightbox(img);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const img = getEvidenceImageFromEvent(event);
    if (!img || !canOpenFromImage(img)) return;
    event.preventDefault();
    openLightbox(img);
  });

  closeButton.addEventListener("click", closeLightbox);
  previousButton.addEventListener("click", () => move(-1));
  nextButton.addEventListener("click", () => move(1));

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (lightbox.hidden) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") move(-1);
    if (event.key === "ArrowRight") move(1);
  });
})();

// Blog prev/next article nav. Reads the /blog/ listing at runtime (the same
// markup that renders the blog index) so it stays a single source of truth -
// new posts just need to be added to that listing to participate here too.
(function () {
  const nav = document.querySelector(".blog-post-nav");
  if (!nav) return;

  function buildNavLink(direction, post) {
    const link = document.createElement("a");
    link.className = `blog-post-nav-link blog-post-nav-${direction}`;
    link.href = post.href;

    const label = document.createElement("span");
    label.className = "blog-post-nav-label";
    label.textContent = direction === "prev" ? "Previous article" : "Next article";

    const title = document.createElement("span");
    title.className = "blog-post-nav-title";
    title.textContent = post.title;

    link.append(label, title);
    return link;
  }

  fetch("/blog/")
    .then((res) => (res.ok ? res.text() : null))
    .then((html) => {
      if (!html) return;

      const doc = new DOMParser().parseFromString(html, "text/html");
      const posts = Array.from(doc.querySelectorAll(".blog-post-card"))
        .map((card) => ({
          href: card.getAttribute("href"),
          title: card.querySelector("h2")?.textContent.trim() || "",
        }))
        .filter((post) => post.href && post.title);

      if (posts.length < 2) return;

      const currentPath = window.location.pathname.replace(/\/?$/, "/");
      const currentIndex = posts.findIndex((post) => post.href === currentPath);
      if (currentIndex === -1) return;

      // The listing is newest-first, so a lower index means a more recent post.
      const newer = posts[currentIndex - 1];
      const older = posts[currentIndex + 1];

      if (older) nav.appendChild(buildNavLink("prev", older));
      if (newer) nav.appendChild(buildNavLink("next", newer));

      if (nav.childElementCount) nav.hidden = false;
    })
    .catch(() => {});
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
        statusEl.textContent = "✅ Thanks! Message received - I’ll reply within 1 business day.";
        statusEl.classList.add("is-success");
        trackEvent("contact_form_submit", {
          form_id: form.id || "contact-form",
        });
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
    { threshold: 0.08, rootMargin: "0px 0px 4% 0px" }
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
      if (btn.dataset.analyticsReplay === "1") {
        delete btn.dataset.analyticsReplay;
      } else {
        trackEvent("book_call_click", {
          link_text: getAnalyticsText(btn),
          section: getAnalyticsSection(btn),
        });
      }

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
        btn.dataset.analyticsReplay = "1";
        setTimeout(() => btn.click(), 0);
      } catch (err) {
        btn.disabled = false;
        btn.textContent = originalText;
        console.error(err);
        alert("Sorry - the calendar failed to load. Please try again.");
      }
    },
    true
  );
})();

// --- Analytics consent (cookie banner gates Google Analytics 4) ---
(function () {
  const GA_ID = "G-3CL61G458C";
  const CONSENT_KEY = "cl_analytics_consent";

  function loadGA() {
    if (window.__gaLoaded) return;
    window.__gaLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", GA_ID);
    const gaScript = document.createElement("script");
    gaScript.async = true;
    gaScript.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(gaScript);
  }

  function getConsent() {
    try { return window.localStorage.getItem(CONSENT_KEY); } catch (e) { return null; }
  }
  function setConsent(value) {
    try { window.localStorage.setItem(CONSENT_KEY, value); } catch (e) { /* storage unavailable */ }
  }

  const consent = getConsent();
  if (consent === "granted") { loadGA(); return; }
  if (consent === "denied") return;

  const COPY = {
    en: {
      text: "This site uses Google Analytics to understand traffic. No data is used for advertising. See the ",
      link: "Privacy Policy",
      accept: "Accept",
      decline: "Decline",
    },
    hu: {
      text: "Ez az oldal Google Analytics-et használ a forgalom megértéséhez. Az adatok nem kerülnek felhasználásra hirdetési célra. Részletek: ",
      link: "Adatvédelmi tájékoztató",
      accept: "Elfogadom",
      decline: "Elutasítom",
    },
    de: {
      text: "Diese Website verwendet Google Analytics, um den Traffic zu verstehen. Die Daten werden nicht für Werbezwecke verwendet. Details: ",
      link: "Datenschutzerklärung",
      accept: "Akzeptieren",
      decline: "Ablehnen",
    },
  };

  const htmlLang = document.documentElement.lang;
  const copy = COPY[htmlLang] || COPY.en;

  const banner = document.createElement("div");
  banner.className = "cookie-banner";
  banner.setAttribute("role", "dialog");
  banner.setAttribute("aria-label", copy.link);

  const text = document.createElement("p");
  text.textContent = copy.text;
  const link = document.createElement("button");
  link.type = "button";
  link.className = "linklike cookie-banner-link";
  link.setAttribute("data-modal-open", "privacy");
  link.textContent = copy.link;
  text.appendChild(link);

  const actions = document.createElement("div");
  actions.className = "cookie-banner-actions";

  const declineBtn = document.createElement("button");
  declineBtn.type = "button";
  declineBtn.className = "btn btn-outline";
  declineBtn.textContent = copy.decline;

  const acceptBtn = document.createElement("button");
  acceptBtn.type = "button";
  acceptBtn.className = "btn btn-primary";
  acceptBtn.textContent = copy.accept;

  actions.appendChild(declineBtn);
  actions.appendChild(acceptBtn);
  banner.appendChild(text);
  banner.appendChild(actions);
  document.body.appendChild(banner);

  requestAnimationFrame(() => banner.classList.add("is-visible"));

  function dismiss() {
    banner.classList.remove("is-visible");
    setTimeout(() => banner.remove(), 300);
  }

  acceptBtn.addEventListener("click", () => {
    setConsent("granted");
    loadGA();
    dismiss();
  });

  declineBtn.addEventListener("click", () => {
    setConsent("denied");
    dismiss();
  });
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
