import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cvDir = path.resolve(__dirname, '../src/assets/cv');
const backup = fs.readFileSync(path.join(cvDir, 'CV_pagina.backup.html'), 'utf8');
const photoMatch = backup.match(/<img class="photo"[^>]+>/);

if (!photoMatch) {
  throw new Error('No se encontró la foto en el CV de respaldo.');
}

const photoTag = photoMatch[0];

const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
  :root {
    --bg: #f3f4f6;
    --surface: #ffffff;
    --surface-muted: #f9fafb;
    --ink: #111827;
    --ink-soft: #374151;
    --ink-muted: #6b7280;
    --border: #e5e7eb;
    --nav: #111827;
    --accent: #4f46e5;
    --accent-soft: #eef2ff;
    --accent-text: #4338ca;
    --shadow: 0 1px 2px rgba(17, 24, 39, 0.06), 0 4px 12px rgba(17, 24, 39, 0.04);
  }

  @page { size: A4; margin: 0; }
  * { margin: 0; padding: 0; box-sizing: border-box; }

  html, body {
    width: 210mm;
    height: 297mm;
    overflow: hidden;
    font-family: 'Inter', 'Segoe UI', sans-serif;
    font-size: 11px;
    background: var(--bg);
    color: var(--ink);
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .page {
    width: 210mm;
    height: 297mm;
    display: flex;
    flex-direction: column;
    background: var(--bg);
    overflow: hidden;
  }

  .topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 12px 18px;
    background: var(--nav);
    color: #fff;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .topbar-brand {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
  }

  .topbar-dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: #10b981;
    flex-shrink: 0;
  }

  .topbar-name {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: -0.01em;
  }

  .topbar-path {
    font-family: 'Fira Code', monospace;
    font-size: 9px;
    color: #9ca3af;
  }

  .topbar-actions {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
  }

  .pill {
    font-size: 8.5px;
    font-weight: 600;
    padding: 5px 10px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.06);
    color: #e5e7eb;
  }

  .pill--accent {
    background: var(--accent);
    border-color: var(--accent);
    color: #fff;
  }

  .content-block {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px 16px 0;
  }

  .hero {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 14px;
    box-shadow: var(--shadow);
    padding: 14px 16px;
    display: grid;
    grid-template-columns: 84px 1fr;
    gap: 10px 14px;
    align-items: center;
  }

  .photo {
    width: 84px;
    height: 84px;
    border-radius: 14px;
    object-fit: cover;
    object-position: center top;
    display: block;
    border: 1px solid var(--border);
    grid-row: span 2;
    align-self: center;
  }

  .hero-kicker {
    font-size: 8.5px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--accent-text);
    margin-bottom: 5px;
  }

  .hero-title {
    font-size: 22px;
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.1;
    margin-bottom: 5px;
  }

  .hero-sub {
    font-size: 11px;
    font-weight: 600;
    color: var(--ink-muted);
    margin-bottom: 8px;
  }

  .hero-intro {
    font-size: 10.5px;
    color: var(--ink-soft);
    line-height: 1.68;
  }

  .hero-contacts {
    grid-column: 2;
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
  }

  .contact-chip {
    font-family: 'Fira Code', monospace;
    font-size: 9px;
    font-weight: 500;
    color: var(--ink-soft);
    background: var(--surface-muted);
    border: 1px solid var(--border);
    padding: 5px 10px;
    border-radius: 999px;
    white-space: nowrap;
  }

  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 14px;
    box-shadow: var(--shadow);
    padding: 12px 14px;
  }

  .section-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 7px;
  }

  .section-title {
    font-size: 13.5px;
    font-weight: 700;
    color: var(--ink);
    letter-spacing: -0.02em;
  }

  .section-badge {
    font-family: 'Fira Code', monospace;
    font-size: 8px;
    font-weight: 500;
    color: var(--accent-text);
    background: var(--accent-soft);
    border: 1px solid #c7d2fe;
    padding: 4px 8px;
    border-radius: 6px;
    white-space: nowrap;
  }

  .hl {
    background: var(--accent-soft);
    border: 1px solid #c7d2fe;
    border-left: 4px solid var(--accent);
    padding: 9px 11px;
    font-size: 10.5px;
    color: var(--ink-soft);
    border-radius: 0 9px 9px 0;
    margin-bottom: 7px;
    line-height: 1.5;
  }

  .jobs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 9px;
  }

  .job {
    padding: 10px 11px;
    background: var(--surface-muted);
    border: 1px solid var(--border);
    border-radius: 11px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .job-head {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    align-items: flex-start;
  }

  .job-title {
    font-size: 12px;
    font-weight: 700;
    color: var(--ink);
    line-height: 1.25;
  }

  .job-date {
    flex-shrink: 0;
    font-family: 'Fira Code', monospace;
    font-size: 8px;
    font-weight: 500;
    color: var(--ink-muted);
    background: var(--surface);
    border: 1px solid var(--border);
    padding: 4px 7px;
    border-radius: 6px;
    white-space: nowrap;
  }

  .job-meta {
    font-size: 9.5px;
    color: var(--ink-muted);
    font-weight: 500;
  }

  .job-body {
    font-size: 10.5px;
    color: var(--ink-soft);
    line-height: 1.65;
  }

  .job-body ul {
    padding-left: 14px;
    margin-top: 6px;
  }

  .job-body li { margin-bottom: 2px; }

  .etg {
    display: flex;
    flex-wrap: wrap;
    gap: 3px;
    margin-top: auto;
    padding-top: 4px;
  }

  .etag {
    font-family: 'Fira Code', monospace;
    font-size: 8px;
    font-weight: 500;
    color: var(--accent-text);
    background: #fff;
    border: 1px solid #c7d2fe;
    padding: 3px 7px;
    border-radius: 5px;
  }

  .split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 9px;
    align-items: stretch;
  }

  .card-title {
    font-size: 7.5px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--ink-muted);
    margin-bottom: 7px;
  }

  .skills-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 9px 12px;
  }

  .skn {
    display: flex;
    justify-content: space-between;
    font-size: 9.5px;
    color: var(--ink-soft);
    margin-bottom: 4px;
    font-weight: 500;
  }

  .skn span:last-child {
    font-family: 'Fira Code', monospace;
    font-size: 8.5px;
    color: var(--accent-text);
  }

  .skb {
    height: 6px;
    background: #e5e7eb;
    border-radius: 999px;
    overflow: hidden;
  }

  .skf {
    height: 100%;
    border-radius: 999px;
    background: linear-gradient(90deg, #6366f1, #4f46e5);
  }

  .tg-wrap {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-top: 9px;
    padding-top: 9px;
    border-top: 1px solid var(--border);
  }

  .tg {
    font-family: 'Fira Code', monospace;
    font-size: 8.5px;
    font-weight: 500;
    color: var(--ink-soft);
    background: var(--surface-muted);
    border: 1px solid var(--border);
    padding: 4px 8px;
    border-radius: 6px;
  }

  .traits {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .trait-block h3 {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--ink-muted);
    margin-bottom: 7px;
  }

  .ss {
    font-size: 10px;
    color: var(--ink-soft);
    padding: 5px 0 5px 12px;
    position: relative;
    line-height: 1.35;
  }

  .ss::before {
    content: '';
    position: absolute;
    left: 0;
    top: 8px;
    width: 3px;
    height: 3px;
    border-radius: 1px;
    background: var(--accent);
  }

  .project-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 9px;
  }

  .tile {
    background: var(--surface-muted);
    border: 1px solid var(--border);
    border-radius: 11px;
    padding: 11px 12px;
  }

  .tile-title {
    font-size: 11.5px;
    font-weight: 700;
    color: var(--ink);
    margin-bottom: 5px;
    line-height: 1.25;
  }

  .tile-text {
    font-size: 10px;
    color: var(--ink-soft);
    line-height: 1.58;
  }

  .edu-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 9px;
    padding-top: 9px;
    border-top: 1px solid var(--border);
  }

  .edu-card {
    background: var(--surface-muted);
    border: 1px solid var(--border);
    border-radius: 11px;
    padding: 10px 11px;
  }

  .edeg {
    font-size: 10.5px;
    font-weight: 700;
    color: var(--ink);
    margin-bottom: 4px;
    line-height: 1.3;
  }

  .esch {
    font-size: 9.5px;
    color: var(--ink-muted);
    line-height: 1.4;
  }

  .edat {
    display: inline-block;
    font-family: 'Fira Code', monospace;
    font-size: 8px;
    color: var(--accent-text);
    font-weight: 500;
    margin-top: 6px;
    background: var(--accent-soft);
    border: 1px solid #c7d2fe;
    padding: 3px 7px;
    border-radius: 5px;
  }

  .page-footer {
    margin-top: auto;
    flex-shrink: 0;
    margin-left: 16px;
    margin-right: 16px;
    margin-bottom: 12px;
    padding: 10px 14px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 11px;
    box-shadow: var(--shadow);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    font-family: 'Fira Code', monospace;
    font-size: 9px;
    color: var(--ink-muted);
  }

  .page-footer strong {
    color: var(--ink-soft);
    font-weight: 600;
  }
</style>
</head>
<body>
  <div class="page">
    <header class="topbar">
      <div class="topbar-brand">
        <span class="topbar-dot"></span>
        <div>
          <div class="topbar-name">ayob.dev</div>
          <div class="topbar-path">/cv/ayob-el-kinani</div>
        </div>
      </div>
      <div class="topbar-actions">
        <span class="pill">Disponible</span>
        <span class="pill pill--accent">Web Developer Jr.</span>
      </div>
    </header>

    <div class="content-block">
      <section class="hero">
        ${photoTag}
        <div>
          <div class="hero-kicker">Perfil</div>
          <h1 class="hero-title">Ayob El Kinani</h1>
          <div class="hero-sub">Desarrollador web · DAW · Algemesí, Valencia</div>
          <p class="hero-intro">Desarrollador web con formación en DAW y experiencia práctica creando aplicaciones reales de principio a fin. Combino frontend, backend y una base técnica sólida en redes y hardware gracias al ciclo de SMR.</p>
        </div>
        <div class="hero-contacts">
          <span class="contact-chip">ayobkina@gmail.com</span>
          <span class="contact-chip">624 612 920</span>
          <span class="contact-chip">linkedin.com/in/ayob-elkinani</span>
        </div>
      </section>

      <section class="card">
        <div class="section-head">
          <h2 class="section-title">Experiencia profesional</h2>
          <span class="section-badge">2 roles</span>
        </div>
        <div class="hl">Proyecto principal: aplicación web de gestión operativa desarrollada de forma independiente, desde requisitos hasta entrega.</div>
        <div class="jobs">
          <article class="job">
            <div class="job-head">
              <div class="job-title">Desarrollador Web – Prácticas DAW</div>
              <span class="job-date">Feb 2026 – Jun 2026</span>
            </div>
            <div class="job-meta">Policía Local de Algemesí · Presencial · 5 meses</div>
            <div class="job-body">
              Aplicación web interna para gestión operativa:
              <ul>
                <li>Gestión de incidencias y seguimiento de estado</li>
                <li>Control de materiales e inventario</li>
                <li>Registro de armamento de ciudadanos</li>
                <li>Chat interno en tiempo real</li>
              </ul>
              Requisitos con usuarios finales y mejoras iterativas sobre la intranet existente.
            </div>
            <div class="etg">
              <span class="etag">Laravel 12</span><span class="etag">PHP</span><span class="etag">Blade</span><span class="etag">Tailwind CSS</span><span class="etag">JavaScript</span><span class="etag">MySQL</span><span class="etag">WebSockets</span>
            </div>
          </article>

          <article class="job">
            <div class="job-head">
              <div class="job-title">Técnico Informático</div>
              <span class="job-date">Mar 2024 – Jun 2024</span>
            </div>
            <div class="job-meta">Infollop · Algemesí · 4 meses</div>
            <div class="job-body">Reparación y optimización de equipos, impresoras y periféricos. Diagnóstico hardware/software y atención al cliente.</div>
            <div class="etg">
              <span class="etag">Hardware</span><span class="etag">Redes</span><span class="etag">Windows</span>
            </div>
          </article>
        </div>
      </section>

      <section class="card">
        <div class="section-head">
          <h2 class="section-title">Proyectos personales</h2>
          <span class="section-badge">portfolio</span>
        </div>
        <div class="project-grid">
          <article class="tile">
            <div class="tile-title">Proyectos con Laravel</div>
            <div class="tile-text">Autenticación, APIs REST, relaciones Eloquent e interfaces con Tailwind y Blade.</div>
          </article>
          <article class="tile">
            <div class="tile-title">Portfolio personal (en desarrollo)</div>
            <div class="tile-text">Laravel como backend y Angular en el frontend para mostrar proyectos y experiencia de forma dinámica.</div>
          </article>
        </div>
      </section>

      <div class="split">
        <section class="card">
          <div class="section-head">
            <h2 class="section-title">Competencias técnicas</h2>
            <span class="section-badge">stack</span>
          </div>
          <div class="skills-grid">
            <div class="sk"><div class="skn"><span>Laravel / PHP</span><span>85%</span></div><div class="skb"><div class="skf" style="width:85%"></div></div></div>
            <div class="sk"><div class="skn"><span>JavaScript</span><span>75%</span></div><div class="skb"><div class="skf" style="width:75%"></div></div></div>
            <div class="sk"><div class="skn"><span>Tailwind CSS</span><span>80%</span></div><div class="skb"><div class="skf" style="width:80%"></div></div></div>
            <div class="sk"><div class="skn"><span>MySQL</span><span>70%</span></div><div class="skb"><div class="skf" style="width:70%"></div></div></div>
            <div class="sk"><div class="skn"><span>HTML / CSS</span><span>90%</span></div><div class="skb"><div class="skf" style="width:90%"></div></div></div>
            <div class="sk"><div class="skn"><span>Redes / Hardware</span><span>65%</span></div><div class="skb"><div class="skf" style="width:65%"></div></div></div>
          </div>
          <div class="tg-wrap">
            <span class="tg">Git</span><span class="tg">Blade</span><span class="tg">Eloquent</span><span class="tg">WebSockets</span><span class="tg">Artisan</span><span class="tg">Linux</span><span class="tg">VS Code</span>
          </div>
        </section>

        <section class="card">
          <div class="section-head">
            <h2 class="section-title">Perfil y formación</h2>
            <span class="section-badge">soft + edu</span>
          </div>
          <div class="traits">
            <div class="trait-block">
              <h3>Soft skills</h3>
              <div class="ss">Trabajo autónomo</div>
              <div class="ss">Resolución de problemas</div>
              <div class="ss">Trabajo en equipo</div>
              <div class="ss">Atención al cliente</div>
            </div>
            <div class="trait-block">
              <h3>Idiomas</h3>
              <div class="ss">Español — Nativo</div>
              <div class="ss">Árabe — Nativo</div>
            </div>
          </div>
          <div class="edu-list">
            <article class="edu-card">
              <div class="edeg">CFGS – Desarrollo de Aplicaciones Web (DAW)</div>
              <div class="esch">IES Sant Vicent Ferrer · Algemesí</div>
              <div class="edat">Sept. 2024 – Jun. 2026</div>
            </article>
            <article class="edu-card">
              <div class="edeg">CFGM – Microinformática y Redes (SMR)</div>
              <div class="esch">IES Sant Vicent Ferrer · Algemesí</div>
              <div class="edat">Sept. 2022 – Jun. 2024</div>
            </article>
          </div>
        </section>
      </div>
    </div>

    <footer class="page-footer">
      <span><strong>ayob.dev</strong> / curriculum-vitae</span>
      <span>ayobkina@gmail.com · linkedin.com/in/ayob-elkinani</span>
      <span>Algemesí, Valencia</span>
    </footer>
  </div>
</body>
</html>`;

fs.writeFileSync(path.join(cvDir, 'CV_pagina.html'), html);
console.log('CV_pagina.html actualizado.');
