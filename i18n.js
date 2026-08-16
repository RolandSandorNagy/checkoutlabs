// Language switcher routing only. Page content is pre-translated server-side
// (see scripts/build-locales.js) — this just maps the current path to its
// /hu/ or /de/ equivalent when a language button is clicked.
(function () {
  function stripLanguagePrefix(pathname) {
    const normalizedPath = pathname || "/";
    const match = normalizedPath.match(/^\/(hu|de)(\/.*)?$/);
    if (!match) return normalizedPath;
    return match[2] || "/";
  }

  function buildLocalizedPath(language, pathname) {
    const basePath = stripLanguagePrefix(pathname);
    if (language === "en") return basePath;
    return `/${language}${basePath === "/" ? "/" : basePath}`;
  }

  function buildLocalizedUrl(language) {
    return `${buildLocalizedPath(language, window.location.pathname)}${window.location.search}${window.location.hash}`;
  }

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-language]");
    if (!button) return;
    window.location.href = buildLocalizedUrl(button.dataset.language);
  });
})();
