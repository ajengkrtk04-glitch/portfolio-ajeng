(function () {
  "use strict";

  // Tahun otomatis di footer
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Menu di layar kecil
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    menu.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Tandai menu sesuai bagian yang sedang dilihat
  var links = Array.prototype.slice.call(document.querySelectorAll(".nav a"));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          a.removeAttribute("aria-current");
          if (a.getAttribute("href") === "#" + entry.target.id) {
            a.setAttribute("aria-current", "true");
          }
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { observer.observe(s); });
  }

    // EDIT 1: tempel alamat Formspree kamu supaya pesan langsung masuk ke emailmu
  // EDIT 2: ganti TO_EMAIL dengan emailmu (cadangan jika Formspree kosong)
  var FORM_ENDPOINT = "";
  var TO_EMAIL = "ajengkrtk04@gmail.com";

  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");

  function setStatus(text, type) {
    status.textContent = text;
    status.className = "form-status" + (type ? " " + type : "");
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.elements.name.value.trim();
      var email = form.elements.email.value.trim();
      var message = form.elements.message.value.trim();
      var trap = form.elements._gotcha.value;

      if (trap) return; // bot terdeteksi

      if (!name || !email || !message) {
        setStatus("Lengkapi nama, email, dan pesan sebelum mengirim.", "err");
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setStatus("Format email belum benar. Contoh: nama@gmail.com", "err");
        return;
      }

      // Cadangan: buka aplikasi email jika Formspree belum diisi
      if (!FORM_ENDPOINT) {
        var subject = "Pesan dari website portofolio: " + name;
        var body = message + "\n\nDari: " + name + " (" + email + ")";
        window.location.href =
          "mailto:" + TO_EMAIL +
          "?subject=" + encodeURIComponent(subject) +
          "&body=" + encodeURIComponent(body);
        return;
      }

      var btn = form.querySelector("button[type=submit]");
      var label = btn.querySelector("span");
      btn.disabled = true;
      label.textContent = "Mengirim...";
      setStatus("", "");

      fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ name: name, email: email, message: message })
      })
        .then(function (res) {
          if (!res.ok) throw new Error("gagal");
          form.reset();
          setStatus("Terima kasih! Pesanmu sudah terkirim.", "ok");
        })
        .catch(function () {
          setStatus("Pesan belum terkirim. Coba lagi, atau hubungi lewat email di samping.", "err");
        })
        .then(function () {
          btn.disabled = false;
          label.textContent = "Kirim Pesan";
        });
    });
  }
})();
