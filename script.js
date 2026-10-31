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

  const teamCards = [...document.querySelectorAll(".team-card")];
  const teamStatus = document.querySelector(".team-status");
  teamCards.forEach((card) => card.addEventListener("click", () => {
    teamCards.forEach((item) => item.classList.toggle("is-active", item === card));
    if (teamStatus) teamStatus.textContent = `${card.dataset.role} selected`;
  }));

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
  quotationForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!quotationForm.reportValidity()) return;

    const data = new FormData(quotationForm);
    const fields = [
      ["Name", data.get("name")],
      ["Company / Organisation", data.get("company")],
      ["Phone", data.get("phone")],
      ["Email", data.get("email")],
      ["Premises Location", data.get("location")],
      ["Premises Type", data.get("premises")],
      ["Guards Required", data.get("guards")],
      ["Service Start Date", data.get("date")],
      ["Security Requirements", data.get("requirements")]
    ].filter(([, value]) => value);

    const message = ["Quotation Request — Mega Safe Security Services", "", ...fields.map(([label, value]) => `${label}: ${value}`)].join("\n");
    const whatsappUrl = `https://wa.me/60109142789?text=${encodeURIComponent(message)}`;
    if (formMessage) formMessage.textContent = "Opening WhatsApp with your quotation details…";
    window.open(whatsappUrl, "_blank", "noopener");
  });
})();
