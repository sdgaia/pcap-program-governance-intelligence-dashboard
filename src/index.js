import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

const scoreColor = v => v >= 80 ? '#16a34a' : v >= 60 ? '#2563eb' : v >= 40 ? '#f97316' : '#dc2626';
const scoreLabel = v => v >= 80 ? 'Strong' : v >= 60 ? 'Moderate' : v >= 40 ? 'Fragile' : 'Critical';
const exposureColor = v => v <= 20 ? '#16a34a' : v <= 40 ? '#2563eb' : v <= 60 ? '#f97316' : '#dc2626';
const exposureLabel = v => v <= 20 ? 'Low Exposure' : v <= 40 ? 'Moderate Exposure' : v <= 60 ? 'High Exposure' : 'Severe Exposure';
const pct = v => `${Math.round(v)}%`;

function getRecordId(req) {
  const rawQuery = req.originalUrl.split('?')[1] || '';
  const inferredRecordId = rawQuery.startsWith('rec') ? rawQuery.split('&')[0] : '';
  return req.query.recordId || req.params.recordId || inferredRecordId || '';
}

function gauge(title, value, invert = false) {
  const c = invert ? exposureColor(value) : scoreColor(value);
  const l = invert ? exposureLabel(value) : scoreLabel(value);
  const deg = -90 + (value * 1.8);
  return `
    <div class="card kpi">
      <div class="kpi-title">${title} <span class="info">i</span></div>
      <div class="gauge-wrap">
        <div class="gauge-face">
          <div class="gauge-inner"></div>
          <div class="needle" style="transform:rotate(${deg}deg)"></div>
          <div class="hub"></div>
          <div class="gauge-value" style="color:${c}">${pct(value)}</div>
          <div class="gauge-status" style="color:${c}">${l}</div>
        </div>
      </div>
      <div class="scale"><span>0%</span><span>100%</span></div>
    </div>`;
}

function bar(title, sub, value) {
  return `
    <div class="bar-row">
      <div class="bar-title"><b>${title}</b><small>${sub}</small></div>
      <div class="track"><div class="fill" style="width:${value}%;background:${scoreColor(value)}"></div></div>
      <strong>${pct(value)}</strong>
    </div>`;
}

function renderDashboard(req, res) {
  const recordId = getRecordId(req);
  const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<title>PCAP Programme Governance Intelligence Dashboard</title>
<style>
*{box-sizing:border-box}body{margin:0;background:#f4f6fb;color:#0f172a;font-family:Arial,sans-serif;padding:18px}.page{max-width:1560px;margin:0 auto}.card{background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:18px;box-shadow:0 1px 8px rgba(15,23,42,.05)}.mb{margin-bottom:16px}.header{display:flex;justify-content:space-between;align-items:flex-start}.eyebrow{font-size:13px;font-weight:900;color:#334155}.title{font-size:36px;font-weight:900;margin-top:6px;letter-spacing:-.5px}.sub{color:#64748b;margin-top:8px}.meta{display:flex;gap:20px;flex-wrap:wrap;margin-top:12px;font-size:13px;font-weight:800}.grid{display:grid;gap:14px}.g5{grid-template-columns:repeat(5,1fr)}.g3{grid-template-columns:repeat(3,1fr)}.g2{grid-template-columns:1fr 1fr}.kpi{min-height:210px}.kpi-title,.section-title{font-size:15px;font-weight:900;margin-bottom:10px}.section-title{font-size:20px}.info{display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;border:1px solid #94a3b8;border-radius:50%;font-size:11px;color:#64748b}.gauge-wrap{height:125px;display:flex;align-items:flex-end;justify-content:center;overflow:hidden}.gauge-face{position:relative;width:218px;height:109px;border-radius:218px 218px 0 0;background:conic-gradient(from 270deg,#dc2626 0 45deg,#f97316 45deg 72deg,#2563eb 72deg 144deg,#16a34a 144deg 180deg,#e5e7eb 180deg)}.gauge-inner{position:absolute;left:34px;top:34px;width:150px;height:75px;border-radius:150px 150px 0 0;background:#fff}.needle{position:absolute;left:107px;bottom:0;width:4px;height:82px;background:#111827;transform-origin:bottom center;z-index:4;border-radius:6px}.hub{position:absolute;left:97px;bottom:-11px;width:24px;height:24px;border-radius:50%;background:#111827;border:5px solid #fff;z-index:5}.gauge-value{position:absolute;left:0;right:0;bottom:27px;text-align:center;font-size:34px;font-weight:900;z-index:6}.gauge-status{position:absolute;left:0;right:0;bottom:9px;text-align:center;font-size:12px;font-weight:900;z-index:6}.scale{display:flex;justify-content:space-between;color:#64748b;font-size:12px;font-weight:800;margin-top:4px}.assessment{background:linear-gradient(135deg,#f8fafc,#eff6ff)}.assessment h2{margin:0 0 12px;font-size:20px}.mini{background:#fff;border:1px solid #dbeafe;border-radius:10px;padding:12px}.mini span{display:block;color:#64748b;font-size:12px;font-weight:800}.metric{font-size:30px;font-weight:900;margin:6px 0}.interpret{margin-top:12px;border-left:5px solid #2563eb;background:#fff;border-radius:10px;padding:14px}.tag{display:inline-block;background:#f8fafc;border:1px solid #e5e7eb;border-radius:999px;padding:7px 10px;margin:4px;font-size:12px;font-weight:800}.bar-row{display:grid;grid-template-columns:235px 1fr 55px;gap:12px;align-items:center;margin:12px 0}.bar-title small{display:block;color:#64748b;font-size:11px}.track{height:10px;background:#e5e7eb;border-radius:999px;overflow:hidden}.fill{height:100%;border-radius:999px}.weak{border:1px solid #fecaca;background:#fff1f2;color:#b91c1c;border-radius:10px;padding:12px;font-weight:900;margin-top:14px;display:flex;justify-content:space-between}.chain{display:grid;grid-template-columns:1fr 32px 1fr 32px 1fr 32px 1fr;gap:8px;align-items:center}.node{background:#eff6ff;border:1px solid #dbeafe;border-radius:10px;padding:12px;min-height:72px}.node.active{background:#dbeafe;border-color:#93c5fd}.node b,.node span{display:block}.node span{color:#475569;font-size:12px;margin-top:4px}.arrow{text-align:center;font-size:24px;color:#2563eb;font-weight:900}.box{border:1px solid #e5e7eb;border-radius:10px;padding:12px;margin-bottom:10px;background:#fff}.box h4{margin:0 0 6px;font-size:13px}.box p{margin:0;color:#475569;font-size:13px;line-height:1.45}.tbl{width:100%;border-collapse:collapse;font-size:13px}.tbl th,.tbl td{border:1px solid #e5e7eb;padding:10px}.tbl th{background:#f8fafc}.tbl td:nth-child(2){font-weight:900}.status{font-weight:900;border-radius:999px;padding:5px 9px;background:#dbeafe;color:#1d4ed8}.fragile{background:#ffedd5;color:#9a3412}.strong{background:#dcfce7;color:#166534}.exposure{background:#fff7ed;border-color:#fed7aa}.exposure-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}.exposure-item{background:#fff;border:1px solid #fed7aa;border-radius:10px;padding:12px}.exposure-item b{display:block;color:#64748b;font-size:12px}.exposure-item strong{font-size:22px;margin-top:6px;display:block}.green{color:#16a34a}.blue{color:#2563eb}.orange{color:#f97316}.red{color:#dc2626}@media(max-width:1150px){.g5,.g3,.g2,.chain,.exposure-grid{grid-template-columns:1fr}.arrow{display:none}.header{display:block}}
</style>
</head>
<body>
<div class="page">
  <div class="card header mb">
    <div>
      <div class="eyebrow">🧩 Programme Governance Intelligence Dashboard</div>
      <div class="title">National Agroecology Programme</div>
      <div class="sub">Programme Intelligence • Execution Propagation • Recursive Operational Intelligence</div>
      <div class="meta"><span>🏷️ Agroecology Programme</span><span>🇬🇭 Ghana</span><span>🏛️ MoFA</span><span>📄 PRG-1</span>${recordId ? `<span>🔗 ${recordId}</span>` : ''}</div>
    </div>
    <div class="meta"><span>📅 Updated: 5/23/2026</span><span>⬇ Export</span></div>
  </div>
  <div class="grid g5 mb">${gauge('Programme Governance Intelligence Score',79)}${gauge('Operational Aggregation Intelligence',74)}${gauge('Intrinsic OCI-D',82)}${gauge('Intrinsic OCI-O',69)}${gauge('Fragmentation Exposure Index',31,true)}</div>
  <div class="card assessment mb"><h2>🧠 Overall Programme-Level Governance Assessment</h2><div class="grid g3"><div class="mini"><span>⚙️ PrOG — Programme Operational Governance</span><div class="metric" style="color:#2563eb">66%</div>Moderate</div><div class="mini"><span>🧠 PrIG — Programme Governance Intelligence</span><div class="metric" style="color:#16a34a">79%</div>Moderate/Strong</div><div class="mini"><span>⚖️ Intelligence–Execution Differential</span><div class="metric">13%</div>🟠 Execution Lag</div></div><div class="interpret"><b>🧩 Execution Propagation With Intelligence Lead</b><p>Programme intelligence is structurally stronger than execution continuity. Monitoring recursion and escalation inheritance should be reinforced before scaling action-level implementation.</p><span class="tag">🔵 Execution continuity</span><span class="tag">🟢 Monitoring recursion</span><span class="tag">🟠 Escalation inheritance</span><span class="tag">📄 Operational traceability</span></div></div>
  <div class="grid g2 mb"><div class="card"><div class="section-title">Recursive Governance Intelligence Components (C1–C6)</div>${bar('C1 Strategic Alignment','Programme-to-policy alignment',88)}${bar('C2 Instrument Translation','Policy instruments translated into action logic',84)}${bar('C3 Operational Architecture','Action architecture and delivery logic',76)}${bar('C4 Monitoring Intelligence','Recursive monitoring and signal quality',71)}${bar('C5 Escalation Intelligence','Escalation inheritance and closure logic',63)}${bar('C6 Recursive Auditability','Traceability across action chains',81)}<div class="weak"><span>Weakest Recursive Layer<br>C5 Escalation Intelligence</span><span>63%</span></div></div><div class="card"><div class="section-title">Governance Intelligence Stability Layer</div><div class="box"><h4>Execution Continuity</h4><p>Action propagation remains stable across operational clusters, but closure discipline varies between actions.</p></div><div class="box"><h4>Monitoring Integrity</h4><p>Recursive monitoring logic remains partially dependent on reporting quality and action-level data cadence.</p></div><div class="box"><h4>Escalation Continuity</h4><p>Escalation inheritance remains uneven across action chains and requires stronger trigger ownership.</p></div><div class="box"><h4>Recursive Auditability</h4><p>Programme evidence architecture remains structurally coherent and broadly traceable.</p></div></div></div>
  <div class="grid g3 mb"><div class="card"><div class="section-title">Programme Propagation Architecture</div><div class="chain"><div class="node"><b>🏛️ National Strategy</b><span>NS-1</span></div><div class="arrow">➜</div><div class="node"><b>📄 Policy Layer</b><span>POL-1</span></div><div class="arrow">➜</div><div class="node active"><b>📦 Programme Layer</b><span>PRG-1 active layer</span></div><div class="arrow">➜</div><div class="node"><b>⚙️ Action Layer</b><span>3 linked actions</span></div></div></div><div class="card">${gauge('Governance Certification Readiness',76)}</div><div class="card"><div class="section-title">Propagation Intelligence</div><div class="box"><h4>Strongest Action Propagation</h4><p>ACT-2 Circular Food System — 84%</p></div><div class="box"><h4>Weakest Action Propagation</h4><p>ACT-5 Nutrition Outreach — 53%</p></div><span class="tag">🟠 Escalation propagation risk</span><span class="tag">🔵 Monitoring dependency</span></div></div>
  <div class="card exposure mb"><div class="section-title">⚠️ Programme Intelligence Exposure</div><div class="exposure-grid"><div class="exposure-item"><b>Monitoring Dependency</b><strong class="blue">Moderate</strong></div><div class="exposure-item"><b>Escalation Inheritance</b><strong class="orange">Uneven</strong></div><div class="exposure-item"><b>Action Propagation</b><strong class="green">Stable</strong></div><div class="exposure-item"><b>Closure Traceability</b><strong class="blue">Moderate</strong></div></div><span class="tag">📡 Propagation risk</span><span class="tag">🚨 Escalation bottleneck</span><span class="tag">🧾 Evidence continuity</span></div>
  <div class="grid g2"><div class="card"><div class="section-title">Linked Action Governance Intelligence Benchmarking</div><table class="tbl"><tr><th>#</th><th>Action</th><th>Governance Intelligence</th><th>Status</th></tr><tr><td>1</td><td>ACT-1 Agroecology Pilot</td><td>81%</td><td><span class="status strong">Strong</span></td></tr><tr><td>2</td><td>ACT-2 Circular Food System</td><td>84%</td><td><span class="status strong">Strong</span></td></tr><tr><td>3</td><td>ACT-5 Nutrition Outreach</td><td>53%</td><td><span class="status fragile">Fragile</span></td></tr></table></div><div class="card"><div class="section-title">Programme Governance Intelligence Synthesis</div><div class="box"><h4>Executive Summary</h4><p>Programme governance intelligence remains operationally coherent with moderate escalation continuity and stable action propagation.</p></div><div class="box"><h4>Reviewer Focus</h4><p>Recursive monitoring sufficiency, escalation inheritance and action-level propagation stability.</p></div><div class="box"><h4>Intelligence Strengths</h4><p>✅ Strong strategic alignment<br>✅ Stable action propagation<br>✅ Robust recursive auditability</p></div><div class="box"><h4>Key Intelligence Gaps</h4><p>⚠️ Escalation inheritance remains partially unstable<br>⚠️ Monitoring recursion depends on action-level reporting discipline</p></div></div></div>
</div>
</body>
</html>`;
  res.type('html').send(html);
}

app.get('/', renderDashboard);
app.get('/api', renderDashboard);
app.get('/api/:recordId', renderDashboard);
app.get('/dashboard', renderDashboard);
app.get('/dashboard/:recordId', renderDashboard);

app.listen(port, () => console.log(`Programme Governance Intelligence Dashboard running on ${port}`));
