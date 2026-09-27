const sections = [
  ["Start", [
    ["home", "Overview", "index.html"],
    ["identity", "Identity and origin", "identity.html"],
    ["start", "Install and start", "guides/getting-started.html"],
    ["folder", "Use a model folder", "guides/model-folder.html"],
    ["source", "Develop from source", "guides/source-checkout.html"],
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

const getSavedTheme = () => localStorage.getItem("vraven_theme") || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
const applyTheme = (theme) => {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("vraven_theme", theme);
  const btn = document.querySelector(".theme-toggle span");
  if (btn) btn.textContent = theme === "light" ? "Dark Mode" : "Light Mode";
};
applyTheme(getSavedTheme());

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
      <img src="${root}/assets/vraven-avatar.png" alt="VRAVEN Avatar">
      <span><strong class="brand-wordmark">VRAVEN</strong><span>Evidence-aware explainability</span></span>
    </a>
    <button class="search-trigger" type="button" aria-label="Open global search">
      <span class="search-trigger-left">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <span>Search docs...</span>
      </span>
      <kbd class="search-kbd">⌘K</kbd>
    </button>
    <div class="nav-scroll">${nav}</div>
    <div class="sidebar-bottom">
      <div style="display: flex; gap: 12px; margin-bottom: 8px;">
        <a href="https://github.com/vraven-ai/vraven">GitHub</a>
        <a href="https://pypi.org/project/vraven/">PyPI</a>
      </div>
      <p style="margin: 0 0 8px;">Visual Reasoning &amp; Activation Visualisation for PyTorch.</p>
      <button class="theme-toggle" type="button">
        <svg viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-5.4-5.4c0-1.81.89-3.42 2.26-4.4C12.92 3.04 12.46 3 12 3z"/></svg>
        <span>${getSavedTheme() === "light" ? "Dark Mode" : "Light Mode"}</span>
      </button>
    </div>
  </aside>

  <!-- Global Search Modal -->
  <div class="search-backdrop" id="search-modal" aria-hidden="true">
    <div class="search-modal" role="dialog" aria-modal="true" aria-label="Search documentation">
      <div class="search-input-header">
        <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input class="search-input" id="search-input" type="search" placeholder="Search guides, API, CLI, visual outputs..." autocomplete="off">
        <kbd class="search-kbd">ESC</kbd>
      </div>
      <div class="search-results-list" id="search-results"></div>
      <div class="search-footer">
        <span>Press <kbd class="search-kbd">↑</kbd> <kbd class="search-kbd">↓</kbd> to navigate</span>
        <span><kbd class="search-kbd">↵</kbd> to select</span>
      </div>
    </div>
  </div>

  <!-- Floating Back to Top Button -->
  <button class="back-to-top" id="back-to-top" aria-label="Back to top">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m18 15-6-6-6 6"/></svg>
  </button>
`);

// Attach theme toggle listener
document.querySelector(".theme-toggle")?.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "light" ? "dark" : "light";
  applyTheme(nextTheme);
});

const searchItems = [
  { title: "Documentation Overview", category: "Guide", desc: "Introduction to VRAVEN PyTorch explainability toolkit.", url: "index.html" },
  { title: "Identity and Origin", category: "Guide", desc: "Why the raven watches the model: origin, logo mark, and acronym.", url: "identity.html" },
  { title: "Install and Quickstart", category: "Guide", desc: "Install vraven with pip and explain your first PyTorch model.", url: "guides/getting-started.html" },
  { title: "Use a Model Folder", category: "Guide", desc: "Load and audit PyTorch models from local directory structures.", url: "guides/model-folder.html" },
  { title: "Develop from Source", category: "Guide", desc: "Checkout and build VRAVEN from source repository.", url: "guides/source-checkout.html" },
  { title: "Explain a Model Decision", category: "Tutorial", desc: "Step-by-step tutorial on tracing model predictions to activation pathways.", url: "guides/explain.html" },
  { title: "Adversarial Stress Testing", category: "Tutorial", desc: "Evaluate model robustness under adversarial perturbations and rerouting.", url: "guides/adversarial.html" },
  { title: "Counterfactual Explanations", category: "Tutorial", desc: "Generate minimal perturbation counterfactual proofs for predictions.", url: "guides/counterfactual.html" },
  { title: "MobileNetV2 Case Study", category: "Tutorial", desc: "Complete end-to-end evidence walkthrough on torchvision MobileNetV2.", url: "walkthroughs/mobilenet-v2.html" },
  { title: "Output Catalogue & Guide", category: "Output", desc: "Catalogue of 57 visual outputs, decision proofs, and DarkSide audits.", url: "outputs/index.html" },
  { title: "Capability Map", category: "Output", desc: "Overview of Capture, Proof, Reverse, Atlas, Watch, and DarkSide modules.", url: "capabilities.html" },
  { title: "Visual Catalogue", category: "Output", desc: "Visual index of heatmaps, graphs, trajectories, and decision flows.", url: "visuals.html" },
  { title: "Example Gallery", category: "Output", desc: "Gallery of real visual outputs and model evidence reports.", url: "gallery.html" },
  { title: "Decision Flow Graph", category: "Output", desc: "Supporting and opposing activation signals across captured layers.", url: "outputs/proof/decision-flow.html" },
  { title: "Neuron Impact Map", category: "Output", desc: "Measure individual neuron relevance to target output classes.", url: "outputs/proof/neuron-impact.html" },
  { title: "Causal Pathway Proof", category: "Output", desc: "Controlled layer-output interventions for causal decision verification.", url: "outputs/proof/causal-pathway.html" },
  { title: "Shortcut Reliance Audit", category: "Output", desc: "Detect feature shortcuts and background reliance in predictions.", url: "outputs/darkside/shortcut-reliance.html" },
  { title: "Python API Reference", category: "API", desc: "Complete documentation for 175 PyTorch API symbols and classes.", url: "api/index.html" },
  { title: "CLI Command Reference", category: "CLI", desc: "Command line interface documentation for all 22 vraven CLI routes.", url: "cli/index.html" },
  { title: "Report Formats & Export", category: "Guide", desc: "Export decision proofs into HTML, JSON, and Markdown audit reports.", url: "guides/reports.html" },
  { title: "Troubleshooting Guide", category: "Guide", desc: "Common errors, PyTorch hook issues, and performance optimization.", url: "guides/troubleshooting.html" },
  { title: "Evidence and Claims", category: "Science", desc: "Scientific framework for bounded claims, evidence levels, and audit fidelity.", url: "science.html" },
  { title: "Research Foundations", category: "Science", desc: "Academic research citations, mechanistic interpretability, and XAI literature.", url: "research.html" }
];

const searchModal = document.getElementById("search-modal");
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");
let selectedResultIndex = 0;

const openSearchModal = () => {
  searchModal.classList.add("is-open");
  searchModal.setAttribute("aria-hidden", "false");
  searchInput.value = "";
  renderSearchResults("");
  window.setTimeout(() => searchInput.focus(), 50);
};

const closeSearchModal = () => {
  searchModal.classList.remove("is-open");
  searchModal.setAttribute("aria-hidden", "true");
};

const renderSearchResults = (query) => {
  const cleanQuery = query.trim().toLowerCase();
  const matches = cleanQuery === ""
    ? searchItems.slice(0, 8)
    : searchItems.filter(item =>
        item.title.toLowerCase().includes(cleanQuery) ||
        item.desc.toLowerCase().includes(cleanQuery) ||
        item.category.toLowerCase().includes(cleanQuery)
      );

  selectedResultIndex = 0;

  if (matches.length === 0) {
    searchResults.innerHTML = `<div class="search-empty">No results found matching "<strong>${escapeCode(cleanQuery)}</strong>"</div>`;
    return;
  }

  searchResults.innerHTML = matches.map((item, idx) => `
    <a class="search-result-item${idx === 0 ? ' is-selected' : ''}" href="${root}/${item.url}">
      <div>
        <div class="search-result-title">
          <span>${item.title}</span>
          <span class="search-result-tag tag-${item.category.toLowerCase()}">${item.category}</span>
        </div>
        <div class="search-result-desc">${item.desc}</div>
      </div>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
    </a>
  `).join("");
};

document.querySelector(".search-trigger")?.addEventListener("click", openSearchModal);
searchModal?.addEventListener("click", (e) => {
  if (e.target === searchModal) closeSearchModal();
});

searchInput?.addEventListener("input", (e) => {
  renderSearchResults(e.target.value);
});

searchInput?.addEventListener("keydown", (e) => {
  const items = searchResults.querySelectorAll(".search-result-item");
  if (!items.length) return;

  if (e.key === "ArrowDown") {
    e.preventDefault();
    items[selectedResultIndex]?.classList.remove("is-selected");
    selectedResultIndex = (selectedResultIndex + 1) % items.length;
    items[selectedResultIndex]?.classList.add("is-selected");
    items[selectedResultIndex]?.scrollIntoView({ block: "nearest" });
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    items[selectedResultIndex]?.classList.remove("is-selected");
    selectedResultIndex = (selectedResultIndex - 1 + items.length) % items.length;
    items[selectedResultIndex]?.classList.add("is-selected");
    items[selectedResultIndex]?.scrollIntoView({ block: "nearest" });
  } else if (e.key === "Enter") {
    e.preventDefault();
    items[selectedResultIndex]?.click();
  }
});

// Keyboard shortcut listener for Cmd+K, Ctrl+K, and /
document.addEventListener("keydown", (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    if (searchModal.classList.contains("is-open")) {
      closeSearchModal();
    } else {
      openSearchModal();
    }
  } else if (e.key === "Escape" && searchModal.classList.contains("is-open")) {
    closeSearchModal();
  }
});

const mainContent = document.querySelector(".content");
if (mainContent && current && current !== "home") {
  const currentSection = sections.find(([_, pages]) => pages.some(([id]) => id === current));
  if (currentSection) {
    const pageObj = currentSection[1].find(([id]) => id === current);
    const breadcrumbsHTML = `
      <nav class="breadcrumbs" aria-label="Breadcrumb navigation">
        <a href="${root}/index.html">Home</a>
        <span>/</span>
        <span>${currentSection[0]}</span>
        <span>/</span>
        <strong style="color: var(--text);">${pageObj ? pageObj[1] : ''}</strong>
      </nav>
    `;
    mainContent.insertAdjacentHTML("afterbegin", breadcrumbsHTML);
  }
}

// Add Colab badge to key guides
if (current && ["start", "explain", "adversarial", "counterfactual", "walkthrough"].includes(current)) {
  const h1 = mainContent?.querySelector("h1");
  if (h1) {
    const colabHTML = `
      <a class="colab-badge" href="https://colab.research.google.com/" target="_blank" rel="noopener noreferrer">
        <svg viewBox="0 0 24 24"><path d="M16.9 15.4c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5zm-9.8 0c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5z"/></svg>
        <span>Open in Google Colab</span>
      </a>
    `;
    h1.insertAdjacentHTML("afterend", colabHTML);
  }
}

const backToTopBtn = document.getElementById("back-to-top");
window.addEventListener("scroll", () => {
  if (window.scrollY > 320) {
    backToTopBtn?.classList.add("is-visible");
  } else {
    backToTopBtn?.classList.remove("is-visible");
  }
});
backToTopBtn?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

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

const escapeCode = (value) => value
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;");

const detectCodeLanguage = (source, code) => {
  const declared = [...code.classList].find((name) => name.startsWith("language-"));
  if (declared) return declared.slice("language-".length).toLowerCase();
  const trimmed = source.trim();
  if (/^(?:\$\s*)?(?:python\d*|pip\d*|vraven|source|git|curl|mkdir|cd|export|echo)\b/m.test(trimmed)) return "shell";
  if (/^(?:\{|\[)/.test(trimmed)) {
    try { JSON.parse(trimmed); return "json"; } catch { /* continue detecting */ }
  }
  if (/(?:^|\n)\s*(?:from\s+\S+\s+import|import\s+\S+|def\s+|class\s+|@\w+|#)|\b[A-Za-z_]\w*(?:\.[A-Za-z_]\w*)*\s*\([^\n)]*\)/.test(source)) return "python";
  if (/<\/?[A-Za-z][^>]*>/.test(source)) return "html";
  return "text";
};

const paintCode = (source, pattern, classify) => {
  let output = "";
  let cursor = 0;
  let match;
  pattern.lastIndex = 0;
  while ((match = pattern.exec(source)) !== null) {
    output += escapeCode(source.slice(cursor, match.index));
    output += `<span class="tok-${classify(match[0])}">${escapeCode(match[0])}</span>`;
    cursor = match.index + match[0].length;
  }
  return output + escapeCode(source.slice(cursor));
};

const pythonKeywords = new Set(["False", "None", "True", "and", "as", "assert", "async", "await", "break", "case", "class", "continue", "def", "del", "elif", "else", "except", "finally", "for", "from", "global", "if", "import", "in", "is", "lambda", "match", "nonlocal", "not", "or", "pass", "raise", "return", "try", "while", "with", "yield"]);
const pythonConstants = new Set(["False", "None", "True", "NotImplemented", "Ellipsis"]);
const pythonBuiltins = new Set(["abs", "all", "any", "bool", "bytes", "callable", "dict", "enumerate", "filter", "float", "frozenset", "getattr", "hasattr", "hash", "help", "hex", "id", "input", "int", "isinstance", "issubclass", "iter", "len", "list", "map", "max", "min", "next", "object", "open", "ord", "pow", "print", "property", "range", "repr", "reversed", "round", "set", "slice", "sorted", "str", "sum", "super", "tuple", "type", "vars", "zip"]);
const shellCommands = new Set(["cd", "curl", "echo", "export", "git", "mkdir", "pip", "pip3", "python", "python3", "source", "vraven"]);

const highlightPython = (source) => {
  const tokenPattern = /(?:[rubfRUBF]{0,2})(?:"""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|#[^\n]*|\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b|\b[A-Za-z_]\w*\b|==|!=|<=|>=|:=|->|\*\*|\/\/|<<|>>|\.\.\.|[()\[\]{},.:;=+\-*\/%@<>!&|^~]|\s+|./gi;
  const tokens = source.match(tokenPattern) || [];
  const isSpace = (token) => /^\s+$/.test(token);
  const previousToken = (index) => {
    for (let cursor = index - 1; cursor >= 0; cursor -= 1) if (!isSpace(tokens[cursor])) return tokens[cursor];
    return "";
  };
  const nextToken = (index) => {
    for (let cursor = index + 1; cursor < tokens.length; cursor += 1) if (!isSpace(tokens[cursor])) return tokens[cursor];
    return "";
  };
  let expressionDepth = 0;
  return tokens.map((token, index) => {
    if (isSpace(token)) return token;
    let kind = "plain";
    if (token.startsWith("#")) kind = "comment";
    else if (/^(?:[rubf]{0,2})["']/i.test(token)) kind = "string";
    else if (/^\d/.test(token)) kind = "number";
    else if (/^[A-Za-z_]\w*$/.test(token)) {
      const previous = previousToken(index);
      const next = nextToken(index);
      if (pythonConstants.has(token)) kind = "constant";
      else if (pythonKeywords.has(token)) kind = "keyword";
      else if (token === "vraven") kind = "namespace";
      else if (pythonBuiltins.has(token)) kind = "builtin";
      else if (previous === "def") kind = "function";
      else if (previous === "class" || /^[A-Z]/.test(token)) kind = "class";
      else if (next === "=" && expressionDepth > 0 && !["=", "!", "<", ">"].includes(previous)) kind = "parameter";
      else if (previous === ".") kind = next === "(" ? "method" : "attribute";
      else if (next === "(") kind = "function";
      else kind = "variable";
    } else if (/^[()\[\]]$/.test(token)) kind = "punctuation";
    else if (/^[{}]$/.test(token)) kind = "brace";
    else if (/^[,.:;]$/.test(token)) kind = "delimiter";
    else kind = "operator";
    if (/^[([{]$/.test(token)) expressionDepth += 1;
    if (/^[)\]}]$/.test(token)) expressionDepth = Math.max(0, expressionDepth - 1);
    return kind === "plain" ? escapeCode(token) : `<span class="tok-${kind}">${escapeCode(token)}</span>`;
  }).join("");
};

const highlightCode = (source, language) => {
  if (language === "python") {
    return highlightPython(source);
  }
  if (language === "shell") {
    const pattern = /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|#[^\n]*|\$\{?[A-Za-z_][A-Za-z0-9_]*\}?|--?[A-Za-z][\w-]*|(?:\.{0,2}\/)?(?:[\w.-]+\/)+[\w.-]+|\b\d+(?:\.\d+)?\b|\b(?:cd|curl|echo|export|git|mkdir|pip3?|python3?|source|vraven)\b|&&|\|\||[|>;])/g;
    return paintCode(source, pattern, (token) => {
      if (token.startsWith("#")) return "comment";
      if (/^["']/.test(token)) return "string";
      if (token.startsWith("$")) return "variable";
      if (token.startsWith("-")) return "option";
      if (/^\d/.test(token)) return "number";
      if (token.includes("/")) return "path";
      if (shellCommands.has(token)) return "function";
      return "operator";
    });
  }
  if (language === "json") {
    const pattern = /("(?:\\.|[^"\\])*"\s*:|"(?:\\.|[^"\\])*"|\b(?:true|false|null)\b|-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b|[{}\[\],:])/gi;
    return paintCode(source, pattern, (token) => {
      if (/^"/.test(token)) return /:\s*$/.test(token) ? "property" : "string";
      if (/^(?:true|false|null)$/i.test(token)) return "keyword";
      if (/^-?\d/.test(token)) return "number";
      return "operator";
    });
  }
  if (language === "html") {
    const pattern = /(&lt;!--[\s\S]*?--&gt;|<!--[\s\S]*?-->|<\/?[A-Za-z][^>]*>|"(?:\\.|[^"\\])*")/g;
    return paintCode(source, pattern, (token) => token.startsWith("<!--") ? "comment" : token.startsWith('"') ? "string" : "keyword");
  }
  return escapeCode(source);
};

const languageLabels = { python: "VRAVEN · Python", shell: "VRAVEN · Terminal", json: "VRAVEN · JSON", html: "VRAVEN · HTML", text: "VRAVEN · Code" };

document.querySelectorAll("pre code").forEach((code) => {
  const source = code.textContent;
  const language = detectCodeLanguage(source, code);
  code.innerHTML = highlightCode(source, language);
  code.classList.add(`language-${language}`);
  code.parentElement.classList.add("has-syntax");
  code.parentElement.dataset.language = languageLabels[language] || language.toUpperCase();
  const button = document.createElement("button");
  button.className = "copy";
  button.type = "button";
  button.textContent = "Copy";
  button.addEventListener("click", async () => {
    await navigator.clipboard.writeText(source.trim());
    button.textContent = "Copied";
    window.setTimeout(() => { button.textContent = "Copy"; }, 1300);
  });
  code.parentElement.append(button);
});

const visualRoutes = {
  "Activation Energy": "outputs/proof/activation-energy.html",
  "Decision Flow": "outputs/proof/decision-flow.html",
  "Decision Sankey": "outputs/proof/decision-sankey.html",
  "Spectral Trace": "outputs/proof/spectral-trace.html",
  "Neuron Impact": "outputs/proof/neuron-impact.html",
  "Neuron Importance": "outputs/proof/neuron-importance.html",
  "Attention Structure": "outputs/proof/attention-structure.html",
  "Latent Flight": "api/index.html?q=latent_flight",
  "Reasoning DNA": "outputs/proof/reasoning-dna.html",
  "Conflict Field": "outputs/proof/conflict-field.html",
  "Evidence Trajectory": "outputs/proof/evidence-trajectory.html",
  "Causal Pathway": "outputs/proof/causal-pathway.html",
  "Mechanism Concordance": "outputs/proof/mechanism-concordance.html",
  "Input Attribution": "outputs/proof/input-attribution.html",
  "Feature Sequence Heatmap": "outputs/proof/feature-sequence-heatmap.html",
  "Reasoning Graph": "outputs/proof/reasoning-graph.html",
  "Community Graph": "outputs/atlas/activation-community-graph.html",
  "Relevance Flow": "outputs/proof/relevance-flow.html",
  "Perturbation Stability": "outputs/proof/perturbation-stability.html",
  "Counterfactual Delta": "outputs/proof/counterfactual-delta.html",
  "Raven Eye · Model X-ray": "outputs/reverse/raven-eye-model-x-ray.html",
  "Raven Flight · Concept Genome": "outputs/reverse/raven-flight-concept-genome.html",
  "Raven Brain · Causal Proof": "outputs/reverse/raven-brain-causal-proof.html",
  "Raven Code · Programme Proof": "outputs/reverse/raven-code-programme-proof.html",
  "Raven Contrast": "outputs/reverse/raven-contrast.html",
  "Raven Shadow": "outputs/reverse/raven-shadow-counterfactual.html",
  "Raven Dark Matter": "outputs/reverse/raven-dark-matter.html",
  "Activation Community Graph": "outputs/atlas/activation-community-graph.html",
  "Reasoning Landscape": "outputs/atlas/reasoning-landscape.html",
  "Representation Outliers": "outputs/atlas/reasoning-outliers.html",
  "Sample Similarity": "outputs/atlas/reasoning-similarity.html",
  "Model Evolution": "outputs/watch/model-evolution.html",
  "Model Comparison": "outputs/compare/model-comparison.html",
  "Decision Circuitry": "outputs/darkside/decision-circuitry.html",
  "Shortcut Detection": "outputs/darkside/shortcut-reliance.html",
  "Prediction Depth": "outputs/darkside/prediction-depth.html",
  "Class-conditional Internals": "outputs/darkside/class-conditional-internals.html",
  "Representation Drift": "outputs/darkside/representation-drift.html",
  "Failure Anatomy": "api/index.html?q=failure_anatomy",
  "Stability Geometry": "outputs/darkside/stability-geometry.html",
  "Method Disagreement": "api/index.html?q=method_disagreement",
  "Unused Capacity": "outputs/darkside/unused-capacity.html",
  "Adversarial Rerouting": "outputs/darkside/adversarial-rerouting.html",
  "Cost–evidence Trade-off": "outputs/darkside/cost-evidence-trade-off.html",
  "Circuit Multiplicity": "outputs/darkside/circuit-multiplicity.html",
  "Causal Synergy": "outputs/darkside/causal-synergy.html",
  "Activation Mediation": "outputs/darkside/activation-mediation.html",
  "Topological Shift": "outputs/darkside/topological-shift.html",
  "Explanation Uncertainty": "outputs/darkside/explanation-uncertainty.html",
  "Mechanism Transfer": "outputs/darkside/mechanism-transfer.html",
  "High-confidence OOD": "outputs/darkside/high-confidence-ood.html",
};

if (current === "visuals") {
  document.querySelectorAll(".catalogue-item").forEach((item) => {
    const title = item.querySelector("strong")?.textContent.trim();
    const route = visualRoutes[title];
    if (!route) return;
    const link = document.createElement("a");
    link.className = item.className;
    link.href = `${root}/${route}`;
    link.setAttribute("aria-label", `${title}: open usage and example`);
    link.innerHTML = `${item.innerHTML}<span class="catalogue-open">Open guide →</span>`;
    item.replaceWith(link);
  });
}

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

let footer = document.querySelector("footer");
if (!footer) {
  footer = document.createElement("footer");
  document.querySelector("main")?.append(footer);
}
footer.innerHTML = `<div class="footer-note">VRAVEN · Visual Reasoning and Activation Visualisation for Explainable Networks · Apache-2.0</div><div class="footer-meta"><span>© 2026 VRAVEN</span><a href="${root}/identity.html">Identity &amp; origin</a><a href="${root}/research.html">Research lineage</a><a href="https://github.com/vraven-ai/vraven">Source</a></div>`;

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
