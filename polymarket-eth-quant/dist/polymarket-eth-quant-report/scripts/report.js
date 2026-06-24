(function () {
  const backTop = document.getElementById("backTop");
  const navLinks = Array.from(document.querySelectorAll(".jump"));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  function syncBackTop() {
    if (!backTop) return;
    backTop.classList.toggle("is-visible", window.scrollY > 520);
  }

  function syncActiveSection() {
    let activeId = "";
    for (const section of sections) {
      const box = section.getBoundingClientRect();
      if (box.top <= 160 && box.bottom >= 160) {
        activeId = section.id;
        break;
      }
    }
    navLinks.forEach((link) => {
      link.toggleAttribute("aria-current", link.getAttribute("href") === `#${activeId}`);
    });
  }

  if (backTop) {
    backTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    });
  }

  let ticking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        syncBackTop();
        syncActiveSection();
        ticking = false;
      });
    },
    { passive: true }
  );

  syncBackTop();
  syncActiveSection();
})();
