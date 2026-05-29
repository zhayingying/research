// report.js — equity-full-report · 侧边栏导航 + 阅读进度
(function () {
  'use strict';

  var sidebar    = document.getElementById('sidebar');
  var mainArea   = document.querySelector('.report-main');
  var collapseBtn = document.getElementById('sbCollapseBtn');
  var toggle     = document.getElementById('sbToggle');
  var overlay    = document.getElementById('sbOverlay');

  // ===== 桌面侧边栏整体折叠/展开 =====
  var COLLAPSED_KEY = 'sb_collapsed';

  function applyCollapsed(collapsed) {
    if (!sidebar || !collapseBtn || !mainArea) return;
    if (collapsed) {
      sidebar.classList.add('sb-collapsed');
      mainArea.classList.add('sb-collapsed-main');
      collapseBtn.classList.add('sb-collapsed-state');
      collapseBtn.title = '展开目录';
    } else {
      sidebar.classList.remove('sb-collapsed');
      mainArea.classList.remove('sb-collapsed-main');
      collapseBtn.classList.remove('sb-collapsed-state');
      collapseBtn.title = '收起目录';
    }
  }

  // 恢复上次状态
  try { applyCollapsed(localStorage.getItem(COLLAPSED_KEY) === '1'); } catch(e) {}

  if (collapseBtn) {
    collapseBtn.addEventListener('click', function () {
      var isNowCollapsed = !sidebar.classList.contains('sb-collapsed');
      applyCollapsed(isNowCollapsed);
      try { localStorage.setItem(COLLAPSED_KEY, isNowCollapsed ? '1' : '0'); } catch(e) {}
    });
  }

  // ===== Part 内子节折叠/展开 =====
  document.querySelectorAll('.sb-part-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var part = btn.closest('.sb-part');
      var isOpen = part.classList.contains('expanded');
      // 关闭所有
      document.querySelectorAll('.sb-part').forEach(function (p) {
        p.classList.remove('expanded');
        p.querySelector('.sb-part-btn').classList.remove('open');
      });
      // 如果之前是关闭的，现在打开
      if (!isOpen) {
        part.classList.add('expanded');
        btn.classList.add('open');
      }
    });
  });

  // ===== 移动端侧边栏切换 =====
  if (toggle && sidebar && overlay) {
    toggle.addEventListener('click', function () {
      sidebar.classList.toggle('is-open');
      overlay.classList.toggle('is-visible');
    });
    overlay.addEventListener('click', function () {
      sidebar.classList.remove('is-open');
      overlay.classList.remove('is-visible');
    });
  }

  // ===== 平滑锚点跳转 =====
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // 移动端关闭侧边栏
        if (sidebar) {
          sidebar.classList.remove('is-open');
          overlay && overlay.classList.remove('is-visible');
        }
      }
    });
  });

  // ===== 阅读进度条 =====
  var progressFill = document.getElementById('progressFill');
  var progressPct = document.getElementById('progressPct');

  function updateProgress() {
    var root = document.scrollingElement || document.documentElement;
    var max = Math.max(1, root.scrollHeight - root.clientHeight);
    var pct = Math.round((window.scrollY / max) * 100);
    if (progressFill) progressFill.style.width = pct + '%';
    if (progressPct) progressPct.textContent = pct + '%';
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  // ===== IntersectionObserver: 高亮当前节 + 自动展开对应 Part =====
  var allLinks = document.querySelectorAll('.sb-section-link');
  var partMap = {}; // sectionId -> partId

  // 建立 section → part 的映射
  document.querySelectorAll('.sb-part').forEach(function (part) {
    var partId = part.id.replace('nav-', '');
    part.querySelectorAll('.sb-section-link').forEach(function (link) {
      var href = link.getAttribute('href');
      if (href) partMap[href.replace('#', '')] = part.id;
    });
  });

  var currentActive = null;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.id;
        if (!id) return;

        // 取消之前高亮
        allLinks.forEach(function (l) { l.classList.remove('is-active'); });

        // 高亮当前
        var activeLink = document.querySelector('.sb-section-link[href="#' + id + '"]');
        if (activeLink) {
          activeLink.classList.add('is-active');

          // 展开对应 Part
          var navPartId = partMap[id];
          if (navPartId && navPartId !== currentActive) {
            currentActive = navPartId;
            document.querySelectorAll('.sb-part').forEach(function (p) {
              p.classList.remove('expanded');
              p.querySelector('.sb-part-btn').classList.remove('open');
            });
            var navPart = document.getElementById(navPartId);
            if (navPart) {
              navPart.classList.add('expanded');
              navPart.querySelector('.sb-part-btn').classList.add('open');
            }
          }

          // 确保 sidebar 中的活跃链接可见
          activeLink.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
      }
    });
  }, {
    rootMargin: '-10% 0px -80% 0px',
    threshold: 0
  });

  document.querySelectorAll('section[id]').forEach(function (s) {
    observer.observe(s);
  });

  // ===== 返回顶部按钮 =====
  var backTop = document.getElementById('backTop');
  if (backTop) {
    window.addEventListener('scroll', function () {
      backTop.classList.toggle('is-visible', window.scrollY > 500);
    }, { passive: true });
    backTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== 默认展开 Part 0 =====
  var p0 = document.getElementById('nav-p0');
  if (p0) {
    p0.classList.add('expanded');
    p0.querySelector('.sb-part-btn').classList.add('open');
  }

})();
