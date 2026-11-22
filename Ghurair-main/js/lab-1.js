"use strict";

// Local IDOR simulation: no real HTTP requests or server-side authorization.
document.addEventListener("DOMContentLoaded", () => {
  const ui = window.BreakPointLabUI;
  const $ = ui.get;

  // SECTION 1 — LAB CORE LOGIC
  const currentUserId = 1001;
  const records = {
    1001: { slip_id: 1001, owner_id: 1001, employee: "Alex Morgan", department: "Cybersecurity & GRC", net_pay: "$4,250.00", status: "Active Full-Time" },
    1002: { slip_id: 1002, owner_id: 1002, employee: "Sam Rivera", department: "Software Engineering", net_pay: "$5,100.00", status: "Active Contractor" },
    1003: { slip_id: 1003, owner_id: 1003, employee: "Jordan Blake", department: "Executive Leadership", net_pay: "$12,400.00", status: "Executive" }
  };
  let vector = "query";
  let mode = "vulnerable";

  function parseId(raw) {
    let value = raw.trim();
    if (vector === "body") {
      const data = JSON.parse(value);
      if (!data || typeof data !== "object" || !Object.hasOwn(data, "slip_id")) throw Error("Missing slip_id");
      value = String(data.slip_id);
    } else if (vector === "token") {
      if (!/^[A-Za-z0-9+/]+={0,2}$/.test(value) || value.length % 4 !== 0) throw Error("Invalid Base64 token");
      value = atob(value);
    }
    if (!/^\d+$/.test(value) || !Number.isSafeInteger(Number(value))) throw Error("Invalid record ID");
    return Number(value);
  }

  function sendRequest() {
    let targetId;
    try { targetId = parseId($("payloadInput").value); }
    catch { showRequestResult(400, null, "Enter a valid payload for the selected request type.", "INVALID"); return; }
    const record = records[targetId];
    if (!record) { showRequestResult(404, null, "The requested record does not exist.", "NOT FOUND"); return; }
    if (mode === "fixed" && record.owner_id !== currentUserId) {
      showRequestResult(403, record, "Same payload, but the ownership check refused it. Nothing was leaked.", "BLOCKED");
    } else if (record.owner_id !== currentUserId) {
      showRequestResult(200, record, "Another employee's private pay slip was returned. Now switch to Fixed and send the same payload.", "IDOR EXPOSED");
    } else {
      showRequestResult(200, record, "You are permitted to access your own record.", "AUTHORIZED");
    }
  }

  // SECTION 2 — GHURAIR UI ADDITIONS (END OF FILE)
  const attackTargetId = 1002;
  const vectors = {
    query: { title: "URL Query Parameter", prefix: "GET /api/payroll/view?slip_id=" },
    body:  { title: "JSON Body", prefix: "POST /api/payroll/view  JSON:" },
    token: { title: "Encoded Reference", prefix: "GET /api/payroll/view?ref=" }
  };
  const code = {
    vulnerable: [
      "app.all('/api/payroll/view', requireLogin, (req, res) => {",
      "  // The ID may arrive in the query string, JSON body or Base64 ref",
      "  const id = extractResourceId(req);",
      "  const record = findPaySlip(id);",
      "  if (!record) {",
      "    return res.sendStatus(404);",
      "  }",
      "  return res.json(record); // BUG: no ownership check",
      "});"
    ],
    fixed: [
      "app.all('/api/payroll/view', requireLogin, (req, res) => {",
      "  // The ID may arrive in the query string, JSON body or Base64 ref",
      "  const id = extractResourceId(req);",
      "  const record = findPaySlip(id);",
      "  if (!record) {",
      "    return res.sendStatus(404);",
      "  }",
      "  if (record.owner_id !== req.session.user_id) { // FIX",
      "    return res.sendStatus(403);",
      "  }",
      "  return res.json(record);",
      "});"
    ]
  };
  const explanations = {
    fixed: "Fix: the server compares the record's owner with the logged-in user before replying, so other users' records get 403.",
    vulnerable: "Why it is vulnerable: the server trusts the ID in the request and returns the record without checking that it belongs to the logged-in user."
  };
  function inputFor(id) {
    return vector === "query" ? String(id) :
      vector === "body" ? JSON.stringify({ slip_id: id }) : btoa(String(id));
  }

  function renderVector() {
    ui.updateChoices(document.querySelectorAll("[data-vector]"), "vector", vector);
    ui.setText({ payloadTitle: vectors[vector].title, requestPrefix: vectors[vector].prefix });
    $("payloadInput").value = inputFor(attackTargetId);
    const label = document.createElement("span");
    label.className = "chip-label";
    label.textContent = "Or try:";
    $("quickChips").replaceChildren(label);
    for (const record of Object.values(records)) {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "quick-chip";
      chip.textContent = `${record.slip_id} ${record.owner_id === currentUserId ? "(you)" : "(other)"}`;
      chip.addEventListener("click", () => {
        $("payloadInput").value = inputFor(record.slip_id);
        resetResult();
      });
      $("quickChips").append(chip);
    }
  }

  function resetResult() {
    ui.resetResult({
      title: "No request sent yet",
      message: "Press Send Request to see what the server returns.",
      fields: { statusValue: "—", ownerValue: "—", verdictValue: "—", responseOutput: "Nothing yet." },
      tiles: ["verdictTile"]
    });
  }

  function showRequestResult(httpStatus, record, message, verdict) {
    const exploited = verdict === "IDOR EXPOSED";
    const title = verdict === "AUTHORIZED" ? "Authorized access" :
      exploited ? "IDOR vulnerability demonstrated" :
      httpStatus === 403 ? "Unauthorized request blocked" :
      httpStatus === 404 ? "Record not found" : "Invalid request";
    const tone = exploited || httpStatus === 400 ? "bad" :
      verdict === "BLOCKED" || httpStatus === 200 ? "good" : "neutral";
    ui.showResult({ title, status: `HTTP ${httpStatus}`, message, tone });
    const response = httpStatus === 200
      ? { status: 200, vector, data: record }
      : { status: httpStatus, error: httpStatus === 403 ? "Forbidden" : httpStatus === 404 ? "Record not found" : "Invalid payload" };
    ui.setText({
      statusValue: httpStatus,
      ownerValue: record ? `#${record.owner_id}` : "—",
      verdictValue: exploited ? "Data leaked" : verdict === "BLOCKED" ? "Blocked" :
        verdict === "AUTHORIZED" ? "Allowed (your record)" : verdict === "NOT FOUND" ? "No such record" : "Rejected",
      responseOutput: JSON.stringify(response, null, 2)
    });
    $("verdictTile").className = `pp-result ${exploited ? "is-bad" : verdict === "BLOCKED" ? "is-good" : ""}`.trim();
    $("resultPanel").scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  ui.bindChoices("vector", selected => { vector = selected; renderVector(); resetResult(); });
  ui.bindModes(selected => { mode = selected; ui.renderMode(mode, code, explanations); resetResult(); });
  $("sendRequest").addEventListener("click", sendRequest);
  $("payloadInput").addEventListener("keydown", event => { if (event.key === "Enter") sendRequest(); });
  $("resetLab").addEventListener("click", () => {
    vector = "query"; mode = "vulnerable"; renderVector(); ui.renderMode(mode, code, explanations); resetResult();
  });
  ui.renderFixedCode(code.fixed);
  renderVector(); ui.renderMode(mode, code, explanations); resetResult();
});
