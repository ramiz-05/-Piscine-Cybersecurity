"use strict";

// Shared *presentation* behavior for all three labs. Security simulations
// remain inside lab-1.js / lab-2.js / lab-3.js.
(function (global) {
  const get = id => document.getElementById(id);

  function setText(values) {
    for (const [id, value] of Object.entries(values)) get(id).textContent = String(value);
  }

  function renderCode(container, lines, dangerLines = [], safeLines = []) {
    container.replaceChildren();
    lines.forEach((line, index) => {
      const span = document.createElement("span");
      span.className = "pp-line";
      if (dangerLines.includes(index)) span.classList.add("pp-danger");
      if (safeLines.includes(index)) span.classList.add("pp-safe");
      span.textContent = `${String(index + 1).padStart(2, "0")}  ${line}`;
      container.append(span);
    });
  }

  const findLine = (lines, marker) => lines.findIndex(line => line.includes(marker));

  function updateChoices(buttons, attribute, value) {
    for (const button of buttons) {
      const selected = button.dataset[attribute] === value;
      button.classList.toggle("selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    }
  }

  function renderMode(mode, previews, explanations, highlights = {}) {
    const fixed = mode === "fixed";
    const lines = previews[mode];
    const keyLine = findLine(lines, fixed ? "// FIX" : "// BUG");
    setText({ codeTitle: fixed ? "Fixed code" : "Vulnerable code",
      codeModeBadge: fixed ? "Fixed" : "Vulnerable" });
    get("codeModeBadge").className = `code-status ${fixed ? "fixed-status" : "vulnerable-status"}`;
    renderCode(get("codeSample"), lines,
      fixed ? [] : (highlights.vulnerable ?? [keyLine]),
      fixed ? (highlights.fixed ?? [keyLine]) : []);
    const dot = document.createElement("span");
    dot.className = fixed ? "pp-dot safe" : "pp-dot";
    const explanation = document.createElement("span");
    explanation.textContent = explanations[mode];
    get("codeExplanation").replaceChildren(dot, explanation);
    for (const button of [get("vulnerableMode"), get("fixedMode")]) {
      const selected = button.id === (fixed ? "fixedMode" : "vulnerableMode");
      button.classList.toggle("active", selected);
      button.setAttribute("aria-pressed", String(selected));
    }
  }

  function renderFixedCode(lines, safeLines = null) {
    renderCode(get("fixCode"), lines, [], safeLines ?? [findLine(lines, "// FIX")]);
  }

  function showResult({ title, status, message, tone = "neutral" }) {
    setText({ resultTitle: title, resultStatus: status, resultMessage: message });
    get("resultStatus").className = `pp-status ${tone}`;
  }

  function resetResult({ title, message, fields = {}, tiles = [] }) {
    showResult({ title, status: "NOT RUN", message });
    setText(fields);
    for (const id of tiles) get(id).className = "pp-result";
  }

  function bindModes(handler) {
    for (const mode of ["vulnerable", "fixed"]) {
      get(mode === "fixed" ? "fixedMode" : "vulnerableMode")
        .addEventListener("click", () => handler(mode));
    }
  }

  function bindChoices(attribute, handler, root = document) {
    root.querySelectorAll(`[data-${attribute}]`).forEach(button => {
      button.addEventListener("click", () => handler(button.dataset[attribute]));
    });
  }

  // Adapt an unchanged teammate implementation that expects older DOM IDs.
  function ensureHiddenControls(root, definitions) {
    const legacy = document.createElement("div");
    legacy.hidden = true;
    legacy.setAttribute("aria-hidden", "true");
    legacy.id = "race-original-controls";
    for (const [id, tag, label] of definitions) {
      if (get(id)) continue;
      const element = document.createElement(tag);
      element.id = id;
      element.textContent = label;
      if (tag === "button") element.type = "button";
      legacy.append(element);
    }
    if (legacy.children.length) root.append(legacy);
  }

  function requireIds(ids, label) {
    const missing = ids.filter(id => !get(id));
    if (!missing.length) return true;
    console.error(`${label}: missing HTML elements: ${missing.join(", ")}`);
    return false;
  }

  global.BreakPointLabUI = Object.freeze({
    get, setText, renderCode, findLine, updateChoices, renderMode, renderFixedCode,
    showResult, resetResult, bindModes, bindChoices, ensureHiddenControls, requireIds
  });
})(window);
