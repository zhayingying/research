(function () {
  const repoSearch = document.querySelector("#repoSearch");
  const layerFilter = document.querySelector("#layerFilter");
  const repoCount = document.querySelector("#repoCount");
  const rows = Array.from(document.querySelectorAll("#repoTable tbody tr"));
  const navLinks = Array.from(document.querySelectorAll(".sticky-nav a[href^='#']"));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  function normalize(value) {
    return String(value || "").trim().toLowerCase();
  }

  function parseStarValue(value) {
    const text = normalize(value);
    if (!text || text.includes("n/a")) {
      return null;
    }

    const match = text.match(/([\d.]+)\s*k?/);
    if (!match) {
      return null;
    }

    const number = Number(match[1]);
    return text.includes("k") ? number * 1000 : number;
  }

  function decorateStarCells() {
    const values = rows.map((row) => parseStarValue(row.children[2] && row.children[2].innerText));
    const max = Math.max(...values.filter((value) => typeof value === "number"));

    rows.forEach((row, index) => {
      const cell = row.children[2];
      const value = values[index];
      if (!cell || value === null || cell.querySelector(".star-meter")) {
        return;
      }

      cell.classList.add("star-cell");
      const label = cell.innerText.trim();
      const width = Math.max(6, Math.round((value / max) * 100));
      cell.innerHTML = `<span>${label}</span><div class="star-meter" aria-hidden="true"><div class="star-meter-fill" style="--star-width: ${width}%"></div></div>`;
    });
  }

  function decorateConclusionCells() {
    const classByLayer = {
      protocol: "conclusion-protocol",
      sdk: "conclusion-sdk",
      framework: "conclusion-framework",
      app: "conclusion-product"
    };

    rows.forEach((row) => {
      const cell = row.children[6];
      if (!cell || cell.querySelector(".conclusion-chip")) {
        return;
      }

      const text = cell.innerHTML.trim();
      const layerClass = classByLayer[row.dataset.layer] || "conclusion-framework";
      const isRisk = /还没有形成|不是开源|不计入|早期|要补/.test(cell.innerText);
      const chipClass = isRisk ? "conclusion-risk" : layerClass;
      cell.classList.add("conclusion-cell");
      cell.innerHTML = `<span class="conclusion-chip ${chipClass}">${text}</span>`;
    });
  }

  function applyRepoFilters() {
    const term = normalize(repoSearch && repoSearch.value);
    const layer = layerFilter ? layerFilter.value : "all";
    let visibleCount = 0;

    rows.forEach((row) => {
      const rowLayer = row.dataset.layer || "";
      const haystack = normalize(`${row.innerText} ${row.dataset.sdk || ""}`);
      const matchesLayer = layer === "all" || rowLayer === layer;
      const matchesSearch = !term || haystack.includes(term);
      const visible = matchesLayer && matchesSearch;
      row.classList.toggle("is-hidden", !visible);
      if (visible) {
        visibleCount += 1;
      }
    });

    if (repoCount) {
      repoCount.textContent = `显示 ${visibleCount} / ${rows.length} 条`;
    }
  }

  function markActiveNav(sectionId) {
    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${sectionId}`);
    });
  }

  function initNavObserver() {
    if (!("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible && visible.target.id) {
          markActiveNav(visible.target.id);
        }
      },
      {
        rootMargin: "-18% 0px -70% 0px",
        threshold: [0.01, 0.2, 0.5]
      }
    );

    sections.forEach((section) => observer.observe(section));
  }

  if (repoSearch) {
    repoSearch.addEventListener("input", applyRepoFilters);
  }

  if (layerFilter) {
    layerFilter.addEventListener("change", applyRepoFilters);
  }

  document.querySelectorAll("a[href^='#']").forEach((anchor) => {
    anchor.addEventListener("click", () => {
      const href = anchor.getAttribute("href");
      if (href && href.length > 1) {
        history.replaceState(null, "", href);
      }
    });
  });

  decorateStarCells();
  decorateConclusionCells();
  applyRepoFilters();
  initNavObserver();
})();
