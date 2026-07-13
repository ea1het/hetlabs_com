(function () {
  var STORAGE_KEY = 'hetlabs-lang';
  var html = document.documentElement;

  function setLang(lang) {
    html.setAttribute('lang', lang);
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  function initLang() {
    var stored = null;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    if (stored === 'en' || stored === 'es') {
      setLang(stored);
      return;
    }
    var browser = (navigator.language || 'en').toLowerCase();
    setLang(browser.indexOf('es') === 0 ? 'es' : 'en');
  }

  document.addEventListener('DOMContentLoaded', function () {
    initLang();

    document.querySelectorAll('[data-set-lang]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setLang(btn.getAttribute('data-set-lang'));
      });
    });

    var ham = document.getElementById('navHam');
    var links = document.getElementById('navLinks');
    if (ham && links) {
      ham.addEventListener('click', function () {
        var open = links.classList.toggle('mobile-open');
        ham.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      links.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          links.classList.remove('mobile-open');
          ham.setAttribute('aria-expanded', 'false');
        });
      });
    }

    var commitEl = document.getElementById('buildCommit');
    if (commitEl) {
      fetch('https://api.github.com/repos/ea1het/hetlabs_com/commits/gh-pages')
        .then(function (res) { return res.ok ? res.json() : null; })
        .then(function (data) {
          if (!data || !data.sha) return;
          commitEl.textContent = '(' + data.sha.slice(0, 7) + ')';
          commitEl.href = 'https://github.com/ea1het/hetlabs_com/commit/' + data.sha;
        })
        .catch(function () {});
    }
  });
})();
