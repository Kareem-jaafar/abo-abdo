(function () {
  "use strict";
  var w = window, d = document;
  w.dataLayer = w.dataLayer || [];

  // Mobile navigation
  var toggle = d.querySelector(".nav-toggle");
  var nav = d.getElementById("main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Conversion tracking: phone & WhatsApp clicks -> dataLayer (GTM) / gtag (GA4)
  d.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[href]");
    if (!a) return;
    var href = a.getAttribute("href") || "";
    var type = href.indexOf("tel:") === 0 ? "phone_click" : href.indexOf("wa.me/") > -1 ? "whatsapp_click" : null;
    if (!type) return;
    var payload = {
      event: type,
      click_location: a.getAttribute("data-loc") || "unknown",
      link_url: href,
      page_path: location.pathname
    };
    w.dataLayer.push(payload);
    if (typeof w.gtag === "function") {
      w.gtag("event", type, { click_location: payload.click_location, link_url: href });
    }
  });

  // Gallery lightbox
  var box = d.querySelector(".lightbox");
  if (box) {
    var img = box.querySelector("img");
    var closeBtn = box.querySelector(".lightbox-close");
    var last = null;
    var close = function () { box.classList.remove("open"); img.removeAttribute("src"); if (last) last.focus(); };
    d.querySelectorAll("[data-full]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        last = btn;
        img.src = btn.getAttribute("data-full");
        img.alt = btn.querySelector("img").alt;
        box.classList.add("open");
        closeBtn.focus();
      });
    });
    closeBtn.addEventListener("click", close);
    box.addEventListener("click", function (e) { if (e.target === box) close(); });
    d.addEventListener("keydown", function (e) { if (e.key === "Escape" && box.classList.contains("open")) close(); });
  }

  var y = d.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
