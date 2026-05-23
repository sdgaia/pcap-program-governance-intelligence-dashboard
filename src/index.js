import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

function gaugeColor(value) {
  if (value >= 80) return '#16a34a';
  if (value >= 65) return '#2563eb';
  if (value >= 50) return '#f97316';
  return '#dc2626';
}

function gauge(title, value, label = '') {
  const rotation = (value / 100) * 180 - 90;

  return `
  <div class="gauge-card">
    <div class="gauge-title">${title}</div>
    <div class="gauge-wrap">
      <div class="gauge-arc"></div>
      <div class="gauge-fill" style="background:${gaugeColor(value)}"></div>
      <div class="needle" style="transform:rotate(${rotation}deg)"></div>
      <div class="gauge-value" style="color:${gaugeColor(value)}">${value}%</div>
      <div class="gauge-label">${label}</div>
    </div>
  </div>`;
}

app.get('/', (req, res) => {
  const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>Programme Governance Intelligence Dashboard</title>
<style>
body{margin:0;background:#eef2f7;font-family:Arial,sans-serif;color:#0f172a}
.container{width:1450px;margin:auto;padding:18px}
.hero{background:white;border-radius:18px;padding:24px;margin-bottom:18px;border:1px solid #dbe4ee}
.hero h1{margin:0;font-size:46px;font-weight:800}
.hero p{margin-top:8px;color:#64748b}
.top-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:14px;margin-bottom:18px}
.gauge-card,.panel,.summary{background:white;border-radius:16px;padding:16px;border:1px solid #dbe4ee}
.gauge-title{font-size:13px;font-weight:700;margin-bottom:8px}
.gauge-wrap{position:relative;height:120px;overflow:hidden}
.gauge-arc{width:160px;height:160px;border-radius:50%;border:18px solid #d1d5db;border-bottom-color:transparent;border-left-color:transparent;transform:rotate(45deg);position:absolute;left:50%;top:22px;margin-left:-80px}
.gauge-fill{width:160px;height:160px;border-radius:50%;position:absolute;left:50%;top:22px;margin-left:-80px;clip-path: inset(0 0 50% 0);opacity:0.18}
.needle{width:4px;height:62px;background:#111827;position:absolute;left:50%;bottom:18px;transform-origin:bottom center;border-radius:4px}
.gauge-value{position:absolute;bottom:28px;width:100%;text-align:center;font-size:36px;font-weight:800}
.gauge-label{position:absolute;bottom:8px;width:100%;text-align:center;font-size:13px;font-weight:700;color:#64748b}
.section-title{font-size:20px;font-weight:800;margin-bottom:14px}
.assessment-grid,.dual-grid,.triple-grid,.bottom-grid{display:grid;gap:16px;margin-bottom:18px}
.assessment-grid{grid-template-columns:repeat(3,1fr)}
.dual-grid{grid-template-columns:1fr 1fr}
.triple-grid{grid-template-columns:1fr 1fr 1fr}
.bottom-grid{grid-template-columns:1fr 1fr}
.metric-row{display:grid;grid-template-columns:240px 1fr 60px;gap:12px;align-items:center;margin-bottom:14px;font-size:14px;font-weight:700}
.bar-wrap{background:#e2e8f0;height:10px;border-radius:999px;overflow:hidden}
.bar{height:10px;border-radius:999px}
.intel-box{background:#f8fafc;border:1px solid #dbe4ee;border-radius:12px;padding:12px;margin-bottom:10px;font-size:13px;line-height:1.45}
.chain-box{background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;padding:12px;margin-bottom:10px;font-weight:700}
.chain-active{background:#dbeafe}
.summary{background:#f8fafc}
.badge{display:inline-block;padding:4px 10px;border-radius:999px;background:#e2e8f0;font-size:12px;font-weight:700;margin-right:8px;margin-top:10px}
</style>
</head>
<body>
<div class="container">

<div class="hero">
<h1>🧩 National Agroecology Programme</h1>
<p>Programme Governance Intelligence • Execution Propagation • Recursive Operational Intelligence</p>
</div>

<div class="top-grid">
${gauge('Programme Governance Intelligence',79,'Moderate')} 
${gauge('Operational Aggregation Intelligence',74,'Moderate')} 
${gauge('Intrinsic OCI-D',82,'Strong')} 
${gauge('Intrinsic OCI-O',69,'Moderate')} 
${gauge('Fragmentation Exposure',31,'Low Exposure')} 
</div>

<div class="panel" style="margin-bottom:18px">
<div class="section-title">Overall Programme Governance Intelligence Assessment</div>
<div class="assessment-grid">
<div class="summary"><strong>Programme Governance Intelligence</strong><br/><div style="font-size:34px;font-weight:800;color:#16a34a;margin-top:8px">79%</div></div>
<div class="summary"><strong>Execution Continuity</strong><br/><div style="font-size:34px;font-weight:800;color:#2563eb;margin-top:8px">Stable</div></div>
<div class="summary"><strong>Intelligence Differential</strong><br/><div style="font-size:34px;font-weight:800;color:#f97316;margin-top:8px">13%</div></div>
</div>
<div style="margin-top:16px;font-size:14px;line-height:1.6">Programme governance intelligence remains operationally coherent with moderate escalation continuity and partially fragmented propagation chains.</div>
<div>
<span class="badge">Execution continuity</span>
<span class="badge">Monitoring recursion</span>
<span class="badge">Escalation inheritance</span>
<span class="badge">Operational traceability</span>
</div>
</div>

<div class="dual-grid">
<div class="panel">
<div class="section-title">Recursive Governance Intelligence Components</div>

<div class="metric-row"><div>C1 Strategic Alignment</div><div class="bar-wrap"><div class="bar" style="width:88%;background:#16a34a"></div></div><div>88%</div></div>
<div class="metric-row"><div>C2 Instrument Translation</div><div class="bar-wrap"><div class="bar" style="width:84%;background:#16a34a"></div></div><div>84%</div></div>
<div class="metric-row"><div>C3 Operational Architecture</div><div class="bar-wrap"><div class="bar" style="width:76%;background:#2563eb"></div></div><div>76%</div></div>
<div class="metric-row"><div>C4 Monitoring Intelligence</div><div class="bar-wrap"><div class="bar" style="width:71%;background:#2563eb"></div></div><div>71%</div></div>
<div class="metric-row"><div>C5 Escalation Intelligence</div><div class="bar-wrap"><div class="bar" style="width:63%;background:#f97316"></div></div><div>63%</div></div>
<div class="metric-row"><div>C6 Recursive Auditability</div><div class="bar-wrap"><div class="bar" style="width:81%;background:#16a34a"></div></div><div>81%</div></div>

<div class="intel-box" style="border-color:#fecaca;background:#fff1f2"><strong>Weakest Recursive Layer</strong><br/>C5 Escalation Intelligence — 63%</div>
</div>

<div class="panel">
<div class="section-title">Governance Intelligence Stability Layer</div>

<div class="intel-box"><strong>Execution Continuity</strong><br/>Action propagation remains stable across operational clusters.</div>
<div class="intel-box"><strong>Monitoring Integrity</strong><br/>Recursive monitoring logic remains partially dependent on reporting quality.</div>
<div class="intel-box"><strong>Escalation Continuity</strong><br/>Escalation inheritance remains uneven across action chains.</div>
<div class="intel-box"><strong>Recursive Auditability</strong><br/>Programme evidence architecture remains structurally coherent.</div>
</div>
</div>

<div class="triple-grid">
<div class="panel">
<div class="section-title">Programme Propagation Architecture</div>
<div class="chain-box">National Strategy</div>
<div class="chain-box">Policy Layer</div>
<div class="chain-box chain-active">Programme Layer</div>
<div class="chain-box">Action Layer</div>
</div>

<div class="panel">
<div class="section-title">Governance Certification Readiness</div>
${gauge('Certification Feasibility',76,'Moderate')} 
</div>

<div class="panel">
<div class="section-title">Propagation Intelligence</div>
<div class="intel-box"><strong>Strongest Action Propagation</strong><br/>ACT-2 Circular Food System — 84%</div>
<div class="intel-box"><strong>Weakest Action Propagation</strong><br/>ACT-5 Nutrition Outreach — 53%</div>
<div class="intel-box"><strong>Propagation Risk</strong><br/>Escalation continuity remains partially fragmented.</div>
</div>
</div>

<div class="bottom-grid">
<div class="panel">
<div class="section-title">Linked Action Governance Intelligence Benchmarking</div>
<div class="intel-box">ACT-1 Agroecology Pilot — 81%</div>
<div class="intel-box">ACT-2 Circular Food System — 84%</div>
<div class="intel-box">ACT-5 Nutrition Outreach — 53%</div>
</div>

<div class="panel">
<div class="section-title">Programme Governance Intelligence Synthesis</div>
<div class="intel-box"><strong>Executive Summary</strong><br/>Programme governance intelligence remains operationally coherent with moderate escalation continuity.</div>
<div class="intel-box"><strong>Reviewer Focus</strong><br/>Recursive monitoring sufficiency and escalation propagation stability.</div>
<div class="intel-box"><strong>Key Structural Gap</strong><br/>Operational escalation inheritance remains partially unstable across action chains.</div>
</div>
</div>

</div>
</body>
</html>`;

  res.send(html);
});

app.listen(port, () => {
  console.log(`Programme Governance Intelligence Dashboard running on ${port}`);
});