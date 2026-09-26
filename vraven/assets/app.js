const pages = [
  ["home", "Overview", "index.html"],
  ["start", "Install and start", "guides/getting-started.html"],
  ["folder", "Use a model folder", "guides/model-folder.html"],
  ["explain", "Explain one decision", "guides/explain.html"],
  ["adversarial", "Test adversarially", "guides/adversarial.html"],
  ["counterfactual", "Find a counterfactual", "guides/counterfactual.html"],
  ["reports", "Choose a report", "guides/reports.html"],
  ["commands", "Choose a command", "guides/commands.html"],
  ["troubleshooting", "Fix an installation", "guides/troubleshooting.html"],
];

const root = document.body.dataset.root || ".";
const current = document.body.dataset.page;
const nav = pages.map(([id, label, path]) =>
  `<a href="${root}/${path}"${id === current ? ' aria-current="page"' : ""}>${label}</a>`
).join("");

document.body.insertAdjacentHTML("afterbegin", `
  <a class="skip-link" href="#content">Skip to content</a>
  <header class="mobile-bar">
    <a href="${root}/index.html">VRAVEN</a>
    <button class="menu-button" type="button" aria-label="Open documentation menu" aria-expanded="false">Menu</button>
  </header>
  <aside class="sidebar" aria-label="Documentation navigation">
    <a class="brand" href="${root}/index.html">
      <img src="${root}/assets/vraven-avatar.png" alt="">
      <span><strong>VRAVEN</strong><span>Documentation</span></span>
    </a>
    <div class="nav-label">Learn</div>
    <nav class="nav">${nav}</nav>
    <div class="sidebar-bottom">
      <a href="https://github.com/vraven-ai/vraven">GitHub</a>
      <a href="https://pypi.org/project/vraven/">PyPI</a>
      <p>Local-first model explanation.<br>Apache-2.0.</p>
    </div>
  </aside>`);

const menu = document.querySelector(".menu-button");
menu?.addEventListener("click", () => {
  const open = document.body.classList.toggle("menu-open");
  menu.setAttribute("aria-expanded", String(open));
  menu.textContent = open ? "Close" : "Menu";
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
