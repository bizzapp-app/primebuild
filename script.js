const CONFIG = {
  // Official contact details from Primebuild materials
  phone: "+254791653161",
  whatsapp: "+254791653161",
  email: "Primebuild45@gmail.com"
};

document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".menu-btn");
  const nav = document.querySelector(".nav-links");
  if(menuBtn && nav){
    menuBtn.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      nav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    }));
  }

  document.querySelectorAll("[data-phone]").forEach(el => {
    el.href = `tel:${CONFIG.phone}`;
    if(el.dataset.phoneText !== "false") el.textContent = CONFIG.phone;
  });

  document.querySelectorAll("[data-email]").forEach(el => {
    el.href = `mailto:${CONFIG.email}`;
    if(el.dataset.emailText !== "false") el.textContent = CONFIG.email;
  });

  document.querySelectorAll("[data-whatsapp]").forEach(el => {
    const message = el.dataset.message || "Hello Primebuild Engineering Solutions, I would like to discuss a building project in Kenya.";
    el.href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
    el.target = "_blank";
    el.rel = "noopener";
  });

  const form = document.querySelector("#enquiryForm");
  if(form){
    form.addEventListener("submit", e => {
      e.preventDefault();
      const data = new FormData(form);
      const msg = [
        "New website enquiry - Primebuild Engineering Solutions",
        `Name: ${data.get("name") || ""}`,
        `Phone / WhatsApp: ${data.get("phone") || ""}`,
        `Email: ${data.get("email") || ""}`,
        `Currently based: ${data.get("country") || ""}`,
        `Project type: ${data.get("project") || ""}`,
        `Project stage: ${data.get("stage") || ""}`,
        `Project location: ${data.get("location") || ""}`,
        `Budget: ${data.get("budget") || ""}`,
        `Preferred updates: ${data.get("updates") || ""}`,
        `Message: ${data.get("message") || ""}`
      ].join("\n");
      window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
      form.reset();
    });
  }

  const year = document.querySelector("#year");
  if(year) year.textContent = new Date().getFullYear();

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, {threshold:.08});
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
});
