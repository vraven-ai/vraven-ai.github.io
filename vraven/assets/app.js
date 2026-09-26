const sections = [
  ["Start", [
    ["home", "Overview", "index.html"],
    ["identity", "Identity and origin", "identity.html"],
    ["start", "Install and start", "guides/getting-started.html"],
    ["folder", "Use a model folder", "guides/model-folder.html"],
  ]],
  ["Tutorials", [
    ["explain", "Explain a decision", "guides/explain.html"],
    ["adversarial", "Test adversarially", "guides/adversarial.html"],
    ["counterfactual", "Find a counterfactual", "guides/counterfactual.html"],
    ["walkthrough", "MobileNetV2 case study", "walkthroughs/mobilenet-v2.html"],
  ]],
  ["Outputs", [
    ["outputs", "Output guide", "outputs/index.html"],
    ["capabilities", "Capability map", "capabilities.html"],
    ["visuals", "Visual catalogue", "visuals.html"],
    ["gallery", "Example output", "gallery.html"],
  ]],
  ["Reference", [
    ["api", "Python API", "api/index.html"],
    ["cli", "CLI reference", "cli/index.html"],
    ["reports", "Report formats", "guides/reports.html"],
    ["troubleshooting", "Troubleshooting", "guides/troubleshooting.html"],
  ]],
  ["Science", [
    ["science", "Evidence and claims", "science.html"],
    ["research", "Research foundations", "research.html"],
  ]],
];

const root = document.body.dataset.root || ".";
const current = document.body.dataset.page;
const nav = sections.map(([section, pages]) => `
  <div class="nav-label">${section}</div>
  <nav class="nav">${pages.map(([id, label, path]) =>
    `<a href="${root}/${path}"${id === current ? ' aria-current="page"' : ""}>${label}</a>`
  ).join("")}</nav>`).join("");

document.body.insertAdjacentHTML("afterbegin", `
  <a class="skip-link" href="#content">Skip to content</a>
  <header class="mobile-bar">
    <a class="mobile-wordmark" href="${root}/index.html">VRAVEN</a>
    <button class="menu-button" type="button" aria-label="Open documentation menu" aria-expanded="false">Menu</button>
  </header>
  <aside class="sidebar" aria-label="Documentation navigation">
    <a class="brand" href="${root}/index.html">
      <img src="${root}/assets/vraven-avatar.png" alt="">
      <span><strong class="brand-wordmark">VRAVEN</strong><span>Evidence-aware explainability</span></span>
    </a>
    <div class="nav-scroll">${nav}</div>
    <div class="sidebar-bottom">
      <a href="https://github.com/vraven-ai/vraven">GitHub</a>
      <a href="https://pypi.org/project/vraven/">PyPI</a>
      <p>Visual Reasoning and Activation Visualisation for Explainable Networks.</p>
    </div>
  </aside>`);

const menu = document.querySelector(".menu-button");
menu?.addEventListener("click", () => {
  const open = document.body.classList.toggle("menu-open");
  menu.setAttribute("aria-expanded", String(open));
  menu.textContent = open ? "Close" : "Menu";
});

const closeMenu = () => {
  document.body.classList.remove("menu-open");
  menu?.setAttribute("aria-expanded", "false");
  if (menu) menu.textContent = "Menu";
};

document.querySelectorAll(".sidebar a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

document.querySelector(".page")?.addEventListener("click", () => {
  if (document.body.classList.contains("menu-open") && window.matchMedia("(max-width: 900px)").matches) closeMenu();
});

document.querySelectorAll("pre code").forEach((code) => {
  const button = document.createElement("button");
  button.className = "copy";
  button.type = "button";
  button.textContent = "Copy";
  button.addEventListener("click", async () => {
    await navigator.clipboard.writeText(code.textContent.trim());
    button.textContent = "Copied";
    window.setTimeout(() => { button.textContent = "Copy"; }, 1300);
  });
  code.parentElement.append(button);
});

const referenceFilter = document.querySelector("#reference-filter");
if (referenceFilter) {
  const params = new URLSearchParams(window.location.search);
  referenceFilter.value = params.get("q") || "";
  const applyFilter = () => {
    const query = referenceFilter.value.trim().toLowerCase();
    document.querySelectorAll(".api-row").forEach((row) => {
      row.hidden = Boolean(query) && !row.textContent.toLowerCase().includes(query);
    });
  };
  referenceFilter.addEventListener("input", applyFilter);
  applyFilter();
}

document.addEventListener("keydown", (event) => {
  if (event.metaKey || event.ctrlKey || event.altKey || /INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName || "")) return;
  const destination = event.key.toLowerCase() === "k" ? document.querySelector('a[rel="prev"]')
    : event.key.toLowerCase() === "j" ? document.querySelector('a[rel="next"]') : null;
  if (destination) destination.click();
});

const footer = document.querySelector("footer");
if (footer) {
  footer.innerHTML = `<div class="footer-note">VRAVEN · Visual Reasoning and Activation Visualisation for Explainable Networks · Apache-2.0</div><div class="footer-meta"><span>© 2026 VRAVEN</span><a href="${root}/identity.html">Identity &amp; origin</a><a href="${root}/research.html">Research lineage</a><a href="https://github.com/vraven-ai/vraven">Source</a></div>`;
}

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && "IntersectionObserver" in window) {
  document.body.classList.add("motion-ready");
  const revealTargets = document.querySelectorAll(".section-head, .family, .card, .shot, .hero-card, .pathway, .evidence-figure, .paper, .identity-banner, .origin-section, .translation-grid article, .lineage-statement");
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -7%", threshold: 0.06 });
  revealTargets.forEach((element, index) => {
    element.classList.add("reveal");
    element.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 45}ms`);
    revealObserver.observe(element);
  });
}
