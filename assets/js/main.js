/* KB Life & Co — site interactions */
(function () {
  "use strict";

  // Mobile nav toggle
  var nav = document.querySelector(".nav");
  var toggle = document.querySelector(".nav__toggle");
  if (nav && toggle) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", nav.classList.contains("open"));
    });
    // close menu when a link is tapped (mobile)
    nav.querySelectorAll(".nav__links a").forEach(function (a) {
      a.addEventListener("click", function () { nav.classList.remove("open"); });
    });
  }

  // Current year in footer
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Reveal-on-scroll. Content is only ever hidden while JS runs (.js gate in CSS),
  // and a fallback timer guarantees nothing can ever stay hidden.
  var reveals = document.querySelectorAll(".reveal");
  function showAll() { reveals.forEach(function (r) { r.classList.add("in"); }); }
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.01, rootMargin: "0px 0px 0px 0px" });
    reveals.forEach(function (r) { io.observe(r); });
    // Safety net: if anything hasn't revealed shortly after load, reveal it anyway.
    window.addEventListener("load", function () { setTimeout(showAll, 2500); });
  } else {
    showAll();
  }

  // Contact form -> opens email to Kristi with the message prefilled.
  // (Zero-maintenance, works on any host. To send straight to her inbox
  //  instead, swap the form `action` for a Formspree/Web3Forms endpoint.)
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      if (form.dataset.endpoint) return; // a real endpoint is configured; let it POST
      e.preventDefault();
      var name = (form.name && form.name.value || "").trim();
      var email = (form.email && form.email.value || "").trim();
      var phone = (form.phone && form.phone.value || "").trim();
      var message = (form.message && form.message.value || "").trim();
      var subject = encodeURIComponent("Website inquiry from " + (name || "a visitor"));
      var body = encodeURIComponent(
        "Name: " + name + "\n" +
        "Email: " + email + "\n" +
        "Phone: " + phone + "\n\n" +
        message
      );
      window.location.href = "mailto:kristi@kblifeandco.com?subject=" + subject + "&body=" + body;
    });
  }

  // Calendly fallback: if the inline widget hasn't injected an iframe a few
  // seconds after load (blocked by tracking prevention, ad-blocker, etc.),
  // replace the empty container with a direct "Book on Calendly" button so
  // visitors always have a working path to book.
  window.addEventListener("load", function () {
    setTimeout(function () {
      var w = document.querySelector(".calendly-inline-widget");
      if (!w || w.querySelector("iframe")) return;
      var raw = w.getAttribute("data-url") || "https://calendly.com/kblifeagencyandco/lit";
      var href = raw.split("?")[0];
      w.innerHTML =
        '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;padding:2rem;text-align:center;gap:1.2rem">' +
          '<p style="margin:0;max-width:44ch">The booking calendar didn\'t load in your browser. Click below to book your free consultation directly on Calendly &mdash; it opens in a new tab.</p>' +
          '<a class="btn btn--gold btn--lg" href="' + href + '" target="_blank" rel="noopener">Book Your Free Consultation</a>' +
        '</div>';
    }, 3500);
  });
})();
