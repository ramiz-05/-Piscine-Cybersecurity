"use strict";

// Isolated sandbox simulation: never modify the browser's Object.prototype.
document.addEventListener("DOMContentLoaded", () => {
  const ui = window.BreakPointLabUI;
  const $ = ui.get;

  // ===== BEGIN PROTECTED CORE: LAB 3 — DO NOT EDIT =====
  const payloads = {
    admin: { title: "Payload: make everyone an admin", json: '{"theme":"dark","__proto__":{"isAdmin":true}}' },
    role:  { title: "Payload: change everyone's role", json: '{"theme":"dark","__proto__":{"role":"admin"}}' },
    debug: { title: "Payload: turn on debug mode", json: '{"theme":"dark","__proto__":{"debug":true}}' }
  };

  function vulnerableMerge(target, source) {
    for (const key of Object.keys(source)) {
      const value = source[key];
      if (value && typeof value === "object") {
        target[key] = target[key] || {}; // BUG: key may be "__proto__"
        vulnerableMerge(target[key], value);
      } else {
        target[key] = value;
      }
    }
  }

  const BLOCKED = ["__proto__", "constructor", "prototype"];
  function fixedMerge(target, source) {
    for (const key of Object.keys(source)) {
      if (BLOCKED.includes(key)) continue; // FIX: skip dangerous keys
      const value = source[key];
      if (value && typeof value === "object") {
        target[key] = Object.hasOwn(target, key) ? target[key] : {};
        fixedMerge(target[key], value);
      } else {
        target[key] = value;
      }
    }
  }

  // ===== END PROTECTED CORE: LAB 3 =====

  // ===== BEGIN BREAKPOINT UI ADDITIONS: LAB 3 — EDIT BELOW =====
  const code = {
    vulnerable: [
      "function merge(target, source) {",
      "  for (const key of Object.keys(source)) {",
      "    const value = source[key];",
      "    if (value && typeof value === 'object') {",
      "      target[key] = target[key] || {};   // BUG: key may be '__proto__'",
      "      merge(target[key], value);",
      "    } else {",
      "      target[key] = value;",
      "    }",
      "  }",
      "}"
    ],
    fixed: [
      "const BLOCKED = ['__proto__', 'constructor', 'prototype'];",
      "",
      "function merge(target, source) {",
      "  for (const key of Object.keys(source)) {",
      "    if (BLOCKED.includes(key)) continue; // FIX: skip dangerous keys",
      "    const value = source[key];",
      "    if (value && typeof value === 'object') {",
      "      target[key] = Object.hasOwn(target, key) ? target[key] : {};",
      "      merge(target[key], value);",
      "    } else {",
      "      target[key] = value;",
      "    }",
      "  }",
      "}"
    ]
  };
  const explanations = {
    fixed: "Fix: the merge skips __proto__, constructor and prototype, so attacker input can never reach the shared prototype.",
    vulnerable: "Why it is vulnerable: for the key \"__proto__\", target[key] already exists (it is the shared prototype), so the merge writes attacker values straight into it."
  };
  let selectedPayload = "admin";
  let currentMode = "vulnerable";

  function resetResult() {
    ui.resetResult({
      title: "No payload run yet",
      message: "Press Run Payload. Then check the normal user below.",
      fields: {
        roleValue: "user", adminValue: "false", debugValue: "false",
        consoleOutput: "Runs on a sandbox, never on the page's real Object.prototype."
      },
      tiles: ["roleTile", "adminTile", "debugTile"]
    });
  }

  function runPayload() {
    const selected = payloads[selectedPayload];
    const input = JSON.parse(selected.json);
    const sandboxProto = {};
    const settings = Object.create(sandboxProto);
    const user = Object.create(sandboxProto);
    (currentMode === "fixed" ? fixedMerge : vulnerableMerge)(settings, input);

    const role = user.role || "user";
    const isAdmin = user.isAdmin === true;
    const debug = user.debug === true;
    const polluted = isAdmin || role !== "user" || debug;
    const inherited = Object.keys(sandboxProto).length > 0 && !Object.hasOwn(user, "isAdmin");
    const globalIntact = !("isAdmin" in Object.prototype) && !("role" in Object.prototype) &&
      !("debug" in Object.prototype);

    ui.showResult({
      title: polluted ? "Prototype polluted" : "Payload blocked",
      status: polluted ? "VULNERABLE" : "BLOCKED",
      tone: polluted ? "bad" : "good",
      message: polluted
        ? "A normal user that never set these values now has them, because the payload changed the shared prototype. Now switch to Fixed and run the same payload."
        : "Same payload, but the __proto__ key was skipped. The normal user is unchanged."
    });
    ui.setText({
      roleValue: role,
      adminValue: isAdmin,
      debugValue: debug,
      consoleOutput: `Normal setting still merged (theme = ${settings.theme}). ` +
        `Page's real Object.prototype untouched: ${globalIntact}.` +
        (polluted ? ` The user inherited the change from the shared prototype: ${inherited}.` : "")
    });
    $("roleTile").className = role !== "user" ? "pp-result is-bad" : "pp-result";
    $("adminTile").className = isAdmin ? "pp-result is-bad" : "pp-result";
    $("debugTile").className = debug ? "pp-result is-bad" : "pp-result";
    $("resultPanel").scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  ui.bindModes(mode => { currentMode = mode; ui.renderMode(mode, code, explanations); resetResult(); });
  ui.bindChoices("payload", selected => {
    if (!Object.hasOwn(payloads, selected)) return;
    selectedPayload = selected;
    ui.updateChoices(document.querySelectorAll("[data-payload]"), "payload", selectedPayload);
    resetResult();
  });
  $("runPayload").addEventListener("click", runPayload);
  $("resetLab").addEventListener("click", () => {
    selectedPayload = "admin"; currentMode = "vulnerable";
    ui.updateChoices(document.querySelectorAll("[data-payload]"), "payload", selectedPayload);
    ui.renderMode(currentMode, code, explanations);
    resetResult();
  });
  ui.renderFixedCode(code.fixed);
  ui.renderMode(currentMode, code, explanations);
  ui.updateChoices(document.querySelectorAll("[data-payload]"), "payload", selectedPayload);
  resetResult();
});
