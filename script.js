(() => {
  document.documentElement.classList.add("js");

  const header = document.querySelector("#site-header");
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#main-nav");

  const updateHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 28);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const open = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!open));
      navigation.classList.toggle("is-open", !open);
    });
    navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      navigation.classList.remove("is-open");
    }));
  }

  const revealItems = [...document.querySelectorAll(".reveal")];
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }
  // Enable reveal hiding only after this script has initialized.
  // If JS fails to load, the page remains visible rather than blank.
  document.documentElement.classList.add("reveal-ready");

  const lightbox = document.querySelector("#lightbox");
  const lightboxImage = lightbox?.querySelector("img");
  const lightboxCaption = lightbox?.querySelector("p");
  const closeLightbox = () => lightbox?.open && lightbox.close();
  document.querySelectorAll("[data-lightbox]").forEach((trigger) => trigger.addEventListener("click", () => {
    if (!lightbox || !lightboxImage || !lightboxCaption) return;
    lightboxImage.src = trigger.dataset.lightbox;
    lightboxImage.alt = trigger.dataset.caption || "Mega Safe media";
    lightboxCaption.textContent = trigger.dataset.caption || "";
    lightbox.showModal();
  }));
  lightbox?.querySelector(".lightbox-close")?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", (event) => { if (event.target === lightbox) closeLightbox(); });

  const quotationForm = document.querySelector("#quotation-form");
  const formMessage = quotationForm?.querySelector(".form-message");

  const collectFields = () => {
    const data = new FormData(quotationForm);
    return [
      ["Name", data.get("name")],
      ["Company / Organisation", data.get("company")],
      ["Phone", data.get("phone")],
      ["Email", data.get("email")],
      ["Premises Location", data.get("location")],
      ["Premises Type", data.get("premises")],
      ["Guards Required", data.get("guards")],
      ["Service Start Date", data.get("date")],
      ["Security Requirements", data.get("requirements")]
    ];
  };

  quotationForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!quotationForm.reportValidity()) return;

    const fields = collectFields().filter(([, value]) => value);
    const message = ["Quotation Request — Mega Safe Security Services Sdn Bhd", "", ...fields.map(([label, value]) => `${label}: ${value}`)].join("\n");
    const whatsappUrl = `https://wa.me/60109142789?text=${encodeURIComponent(message)}`;
    if (formMessage) formMessage.textContent = "Opening WhatsApp with your quotation details…";
    window.open(whatsappUrl, "_blank", "noopener");
  });

  // Email: opens the customer's email app with a standard Request Quotation format
  // addressed to Mega Safe (blank fields are marked "-").
  document.querySelector("#send-email")?.addEventListener("click", () => {
    if (!quotationForm.reportValidity()) return;

    const fields = collectFields();
    const value = (v) => (v && String(v).trim()) || "-";
    const company = value(fields[1][1]);
    const subject = `Request for Quotation - ${company} - Mega Safe Security Services Sdn Bhd`;
    const body = [
      "REQUEST FOR QUOTATION",
      "Mega Safe Security Services Sdn Bhd",
      "======================================",
      "",
      "CUSTOMER DETAILS",
      `Name / Contact Person : ${value(fields[0][1])}`,
      `Company / Organisation : ${company}`,
      `Phone Number : ${value(fields[2][1])}`,
      `Email : ${value(fields[3][1])}`,
      "",
      "SECURITY REQUIREMENT",
      `Premises Location : ${value(fields[4][1])}`,
      `Premises Type : ${value(fields[5][1])}`,
      `Estimated Number of Guards Required : ${value(fields[6][1])}`,
      `Service Start Date : ${value(fields[7][1])}`,
      "",
      "SCOPE OF WORK / SECURITY REQUIREMENTS",
      value(fields[8][1]),
      "",
      "--------------------------------------",
      "Sent from the Mega Safe website quotation form."
    ].join("\r\n");

    const mailtoUrl = `mailto:mymegasafe.security@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    if (formMessage) formMessage.textContent = "Opening your email app with the quotation request…";
    window.location.href = mailtoUrl;
  });
})();
// Compact corporate navigation: detailed pages stay out of the homepage layout.
(() => {
  const toggle = document.querySelector('.explore-toggle');
  const panel = document.querySelector('#explore-panel');
  if (!toggle || !panel) return;
  const close = () => {
    toggle.setAttribute('aria-expanded', 'false');
    panel.hidden = true;
  };
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    panel.hidden = open;
  });
  panel.querySelectorAll('a').forEach(link => link.addEventListener('click', close));
  document.addEventListener('click', event => {
    if (!panel.hidden && !panel.contains(event.target) && !toggle.contains(event.target)) close();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') close();
  });
})();

// Interactive 3D Mega Safe emblem: rotates only while the visitor drags it.
(() => {
  const emblem = document.querySelector('.hero-emblem');
  const logo = emblem?.querySelector('img');
  if (!emblem || !logo) return;
  let activePointer = null;
  let lastX = 0;
  let lastY = 0;
  let rotateY = 0;
  let rotateX = 0;
  const render = () => {
    logo.style.transform = `translateZ(24px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };
  emblem.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    activePointer = event.pointerId;
    lastX = event.clientX;
    lastY = event.clientY;
    emblem.classList.add('is-dragging');
    emblem.setPointerCapture(event.pointerId);
  });
  emblem.addEventListener('pointermove', (event) => {
    if (activePointer !== event.pointerId) return;
    rotateY += (event.clientX - lastX) * 0.72;
    rotateX -= (event.clientY - lastY) * 0.48;
    rotateX = Math.max(-24, Math.min(24, rotateX));
    lastX = event.clientX;
    lastY = event.clientY;
    render();
  });
  const stop = (event) => {
    if (activePointer !== event.pointerId) return;
    activePointer = null;
    emblem.classList.remove('is-dragging');
  };
  emblem.addEventListener('pointerup', stop);
  emblem.addEventListener('pointercancel', stop);
  emblem.addEventListener('lostpointercapture', () => {
    activePointer = null;
    emblem.classList.remove('is-dragging');
  });
})();
