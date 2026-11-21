(function () {
  "use strict";

  var data = window.PORTFOLIO || {};
  var ICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/";

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text) node.textContent = text;
    return node;
  }

  // Gambar dengan placeholder otomatis jika file belum ada
  function picture(src, alt, cls) {
    var wrap = el("div", cls);
    var img = new Image();
    img.alt = alt;
    img.loading = "lazy";
    img.addEventListener("error", function () {
      wrap.classList.add("is-empty");
      wrap.textContent = "Taruh gambar di " + src;
      img.remove();
    });
    img.src = src;
    wrap.appendChild(img);
    return wrap;
  }

  function link(href, label) {
    var a = el("a", "work-link", label);
    a.href = href;
    a.target = "_blank";
    a.rel = "noopener";
    return a;
  }

  function empty(box, text) {
    box.appendChild(el("p", "empty", text));
  }

  /* ---------- Projects ---------- */
  var projectsBox = document.querySelector('[data-render="projects"]');
  if (projectsBox) {
    if (!(data.projects || []).length) empty(projectsBox, "Belum ada proyek. Tambahkan di js/data.js.");
    (data.projects || []).forEach(function (p) {
      var card = el("article", "card project");
      card.appendChild(picture(p.image, "Tampilan proyek " + p.title, "card-media"));
      var body = el("div", "card-body");
      body.appendChild(el("h3", null, p.title));
      body.appendChild(el("p", "card-desc", p.desc));
      if (p.tags && p.tags.length) {
        var tags = el("ul", "chips");
        p.tags.forEach(function (t) { tags.appendChild(el("li", null, t)); });
        body.appendChild(tags);
      }
      if (p.demo || p.code) {
        var links = el("div", "card-links");
        if (p.demo) links.appendChild(link(p.demo, "Lihat demo"));
        if (p.code) links.appendChild(link(p.code, "Lihat kode"));
        body.appendChild(links);
      }
      card.appendChild(body);
      projectsBox.appendChild(card);
    });
  }

  /* ---------- Certificates ---------- */
  var certBox = document.querySelector('[data-render="certificates"]');
  var lightbox = document.getElementById("lightbox");
  var lightImg = lightbox && lightbox.querySelector("img");
  var lightCap = lightbox && lightbox.querySelector("figcaption");

  if (certBox) {
    if (!(data.certificates || []).length) empty(certBox, "Belum ada sertifikat. Tambahkan di js/data.js.");
    (data.certificates || []).forEach(function (c) {
      var btn = el("button", "cert");
      btn.type = "button";
      btn.setAttribute("aria-label", "Perbesar sertifikat " + c.title);
      btn.appendChild(picture(c.image, "Sertifikat " + c.title, "cert-media"));
      var cap = el("span", "cert-cap");
      cap.appendChild(el("strong", null, c.title));
      cap.appendChild(el("span", null, [c.issuer, c.date].filter(Boolean).join(", ")));
      btn.appendChild(cap);
      btn.addEventListener("click", function () {
        if (!lightbox || !lightbox.showModal) return;
        lightImg.src = c.image;
        lightImg.alt = "Sertifikat " + c.title;
        lightCap.textContent = c.title;
        lightbox.showModal();
      });
      certBox.appendChild(btn);
    });
  }
  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox || e.target.hasAttribute("data-close")) lightbox.close();
    });
  }

  /* ---------- Achievements ---------- */
  var achBox = document.querySelector('[data-render="achievements"]');
  if (achBox) {
    if (!(data.achievements || []).length) empty(achBox, "Belum ada prestasi. Tambahkan di js/data.js.");
    (data.achievements || []).forEach(function (a) {
      var card = el("article", "card achievement");
      card.appendChild(el("p", "ach-year", a.year));
      var body = el("div");
      body.appendChild(el("h3", null, a.title));
      body.appendChild(el("p", "card-desc", a.detail));
      card.appendChild(body);
      achBox.appendChild(card);
    });
  }

  /* ---------- Tech stack ---------- */
    var stackBox = document.querySelector('[data-render="stack"]');
  if (stackBox) {
    if (!(data.stack || []).length) empty(stackBox, "Belum ada teknologi. Tambahkan di js/data.js.");
    (data.stack || []).forEach(function (t) {
      var tile = el("div", "tile");
      var holder = el("div", "tile-icon");
      if (t.icon || t.image) {                                   // DIUBAH
        var img = new Image();
        img.alt = "";
        img.src = t.image                                        // DIUBAH
          ? t.image
          : ICON_BASE + t.icon + "/" + t.icon + "-original.svg";
        if (t.invert) img.className = "invert";
        img.addEventListener("error", function () {
          img.remove();
          holder.textContent = t.name.charAt(0);
        });
        holder.appendChild(img);
      } else {
        holder.textContent = t.name.charAt(0);
      }
      tile.appendChild(holder);
      tile.appendChild(el("span", null, t.name));
      stackBox.appendChild(tile);
    });
  }

  /* ---------- Tab ---------- */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tabs [role="tab"]'));

  function select(tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
    });
    if (focus) tab.focus();
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener("click", function () { select(tab, false); });
    tab.addEventListener("keydown", function (e) {
      var next = null;
      if (e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
      if (e.key === "ArrowLeft") next = tabs[(i - 1 + tabs.length) % tabs.length];
      if (next) { e.preventDefault(); select(next, true); }
    });
  });
})();
