

'use strict';

/* ── DATA ─────────────────────────────────────────────────── */

// Pakistan annual WPV1 cases (raw count) 2000–2024
const PAK_CASES = {
  2000:198, 2001:119, 2002:90, 2003:103, 2004:53, 2005:28,
  2006:39, 2007:32, 2008:118, 2009:89, 2010:144, 2011:198,
  2012:58, 2013:93, 2014:328, 2015:54, 2016:20, 2017:8,
  2018:12, 2019:147, 2020:84, 2021:1, 2022:20, 2023:6, 2024:0
};

// Paralytic cases per million (OWID / WHO)
const CASES_PER_MILLION = {
  Pakistan: {
    1980:4.2, 1985:5.1, 1988:3.8, 1990:3.1, 1994:4.08,
    1995:3.82, 1996:2.48, 1997:8.12, 1998:2.34, 1999:3.73,
    2000:1.29, 2001:0.75, 2002:0.55, 2003:0.62, 2004:0.31,
    2005:0.16, 2006:0.22, 2007:0.18, 2008:0.63, 2009:0.47,
    2010:0.74, 2011:1.00, 2012:0.37, 2013:0.69, 2014:1.58,
    2015:0.27, 2016:0.10, 2017:0.04, 2018:0.05, 2019:0.76,
    2020:0.96, 2021:0.04, 2022:0.08, 2023:0.02
  },
  Afghanistan: {
    1980:70.5, 1985:188.4, 1988:29.6, 1990:4.5, 1995:0,
    1997:1.07, 1998:3.19, 1999:7.79, 2000:6.14, 2001:0.56,
    2002:0.48, 2003:0.35, 2004:0.17, 2005:0.37, 2006:1.22,
    2007:0.66, 2008:1.17, 2009:1.39, 2010:1.06, 2011:2.77,
    2012:1.51, 2013:0.54, 2014:0.86, 2015:0.59, 2016:0.38,
    2017:0.39, 2018:0.57, 2019:0.77, 2020:9.34, 2021:1.12,
    2022:0.05, 2023:0.14
  },
  India: {
    1980:3.2, 1985:2.8, 1990:1.5, 1995:0.9, 2000:0.41,
    2005:0.12, 2010:0.04, 2011:0.003, 2012:0, 2013:0,
    2014:0, 2015:0, 2016:0, 2017:0, 2018:0, 2019:0, 2020:0, 2021:0, 2022:0, 2023:0
  },
  Nigeria: {
    1980:5.1, 1985:4.2, 1990:3.8, 1995:2.1, 2000:1.4,
    2005:3.8, 2010:2.1, 2014:0.8, 2015:0.2, 2016:0.1,
    2017:0.05, 2018:0.02, 2019:0.01, 2020:0, 2021:0, 2022:0, 2023:0
  },
  World: {
    1980:3.8, 1985:2.9, 1988:4.1, 1990:2.3, 1995:0.8,
    2000:0.12, 2001:0.08, 2002:0.06, 2003:0.04, 2004:0.03,
    2005:0.02, 2006:0.015, 2007:0.013, 2008:0.012, 2009:0.011,
    2010:0.009, 2011:0.008, 2012:0.007, 2013:0.006, 2014:0.005,
    2015:0.004, 2016:0.003, 2017:0.002, 2018:0.002, 2019:0.003,
    2020:0.002, 2021:0.001, 2022:0.001, 2023:0.001
  }
};

// Pakistan OPV3 coverage (WHO/UNICEF JRF xlsx) 2000–2024
const COVERAGE = {
  2000: { ADMIN:74, OFFICIAL:74, WUENIC:61 },
  2001: { ADMIN:74, OFFICIAL:74, WUENIC:63 },
  2002: { ADMIN:69, OFFICIAL:71, WUENIC:64 },
  2003: { ADMIN:71, OFFICIAL:69, WUENIC:66 },
  2004: { ADMIN:69, OFFICIAL:65, WUENIC:67 },
  2005: { ADMIN:77, OFFICIAL:81, WUENIC:63 },
  2006: { ADMIN:86, OFFICIAL:83, WUENIC:58 },
  2007: { ADMIN:88, OFFICIAL:83, WUENIC:54 },
  2008: { ADMIN:73, OFFICIAL:81, WUENIC:53 },
  2009: { ADMIN:87, OFFICIAL:85, WUENIC:52 },
  2010: { ADMIN:100, OFFICIAL:88, WUENIC:52 },
  2011: { ADMIN:95, OFFICIAL:89, WUENIC:63 },
  2012: { ADMIN:95, OFFICIAL:89, WUENIC:64 },
  2013: { ADMIN:95, OFFICIAL:66, WUENIC:65 },
  2014: { ADMIN:90, OFFICIAL:70, WUENIC:69 },
  2015: { ADMIN:87, OFFICIAL:75, WUENIC:72 },
  2016: { ADMIN:87, OFFICIAL:86, WUENIC:75 },
  2017: { ADMIN:87, OFFICIAL:null, WUENIC:75 },
  2018: { ADMIN:84, OFFICIAL:83, WUENIC:75 },
  2019: { ADMIN:90, OFFICIAL:84, WUENIC:84 },
  2020: { ADMIN:89, OFFICIAL:83, WUENIC:83 },
  2021: { ADMIN:87, OFFICIAL:83, WUENIC:83 },
  2022: { ADMIN:95, OFFICIAL:93, WUENIC:85 },
  2023: { ADMIN:98, OFFICIAL:86, WUENIC:86 },
  2024: { ADMIN:91, OFFICIAL:87, WUENIC:87 }
};

// Province data (refugees + cases)
const PROVINCES = [
  { name:'Khyber Pakhtunkhwa', refugees:553245, cases:108, pct:59 },
  { name:'Balochistan',        refugees:212922, cases:41,  pct:23 },
  { name:'Punjab',             refugees:104510, cases:5,   pct:11 },
  { name:'Sindh',              refugees:39110,  cases:3,   pct:4  },
  { name:'Islamabad',          refugees:22866,  cases:1,   pct:1  }
];

// Global OPV3 coverage 2023 (sample of countries)
const GLOBAL_2023 = [
  { country:'Chad', code:'TCD', cov:36 },
  { country:'DRC', code:'COD', cov:42 },
  { country:'Nigeria', code:'NGA', cov:52 },
  { country:'Ethiopia', code:'ETH', cov:58 },
  { country:'Somalia', code:'SOM', cov:44 },
  { country:'Yemen', code:'YEM', cov:66 },
  { country:'Afghanistan', code:'AFG', cov:61 },
  { country:'Haiti', code:'HTI', cov:53 },
  { country:'Pakistan', code:'PAK', cov:86 },
  { country:'India', code:'IND', cov:91 },
  { country:'Bangladesh', code:'BGD', cov:97 },
  { country:'Brazil', code:'BRA', cov:78 },
  { country:'Indonesia', code:'IDN', cov:82 },
  { country:'Mexico', code:'MEX', cov:88 },
  { country:'USA', code:'USA', cov:93 },
  { country:'UK', code:'GBR', cov:95 },
  { country:'Germany', code:'DEU', cov:97 },
  { country:'Japan', code:'JPN', cov:99 },
  { country:'Australia', code:'AUS', cov:96 },
  { country:'Mozambique', code:'MOZ', cov:71 },
  { country:'Uganda', code:'UGA', cov:75 },
  { country:'Ghana', code:'GHA', cov:92 },
  { country:'Kenya', code:'KEN', cov:83 },
  { country:'South Africa', code:'ZAF', cov:80 }
];

/* ── CHART DEFAULTS ───────────────────────────────────────── */
Chart.defaults.color = '#8a8fa8';
Chart.defaults.borderColor = 'rgba(255,255,255,0.06)';
Chart.defaults.font.family = "'IBM Plex Mono', monospace";
Chart.defaults.font.size = 11;

const COLORS = {
  violet: '#b4a0ff',
  rose:   '#ffaab4',
  mint:   '#7effc4',
  sky:    '#7dd3fc',
  amber:  '#ffd580',
  coral:  '#ff8c7f',
  lilac:  '#d4b8f0',
};

function rgba(hex, a) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `rgba(${r},${g},${b},${a})`;
}

/* ── UTILITY ──────────────────────────────────────────────── */
const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);

function lerp(a, b, t) { return a + (b - a) * t; }

/* ── PARTICLE CANVAS ──────────────────────────────────────── */
function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = canvas.parentElement.offsetWidth;
    H = canvas.height = canvas.parentElement.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < 28; i++) {
    particles.push({
      x: Math.random() * 1,
      y: Math.random(),
      r: Math.random() * 50 + 15,
      speed: Math.random() * 0.0004 + 0.0001,
      opacity: Math.random() * 0.05 + 0.01,
      hue: Math.random() > 0.5 ? '#b4a0ff' : '#ffaab4'
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.y -= p.speed;
      if (p.y < -0.1) { p.y = 1.1; p.x = Math.random(); }
      const x = p.x * W;
      const y = p.y * H;
      ctx.beginPath();
      ctx.arc(x, y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.hue + Math.round(p.opacity * 255).toString(16).padStart(2,'0');
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
}

/* ── COUNTER ANIMATION ────────────────────────────────────── */
function animateCounters() {
  $$('[data-count]').forEach(el => {
    const target = parseFloat(el.dataset.count);
    const duration = 1800;
    const start = performance.now();
    function tick(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const val = lerp(0, target, eased);
      el.textContent = target < 10 ? val.toFixed(1) : Math.round(val).toLocaleString();
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = target < 10 ? target.toFixed(1) : target.toLocaleString();
    }
    requestAnimationFrame(tick);
  });
}

/* ── PROGRESS BAR ─────────────────────────────────────────── */
function initProgress() {
  const bar = document.getElementById('progress-bar');
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
    bar.style.width = pct + '%';
  });
}

/* ── NAV ACTIVE ────────────────────────────────────────────── */
function initNavHighlight() {
  const sections = $$('section[id], div[id]');
  const links = $$('.nav-links a');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const match = $$(`.nav-links a[href="#${e.target.id}"]`);
        match.forEach(l => l.classList.add('active'));
      }
    });
  }, { threshold: 0.3 });
  sections.forEach(s => observer.observe(s));
}

/* ── SCROLL REVEAL ────────────────────────────────────────── */
function initReveal() {
  const revealEls = $$('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => observer.observe(el));
}

/* ── PROVINCE BARS ANIMATION ──────────────────────────────── */
function initProvinceBars() {
  const bars = $$('.pbar-fill');
  const tooltip = document.getElementById('tooltip');

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      bars.forEach((bar, i) => {
        setTimeout(() => bar.classList.add('animated'), i * 200);
      });
      observer.disconnect();
    }
  }, { threshold: 0.3 });

  const container = document.getElementById('province-bars');
  if (container) observer.observe(container);

  bars.forEach(bar => {
    const track = bar.parentElement;
    track.addEventListener('mouseenter', e => {
      const cases = bar.dataset.cases;
      const pct = bar.dataset.pct;
      tooltip.innerHTML = `WPV1 Cases (2019–23): <strong style="color:#ffaab4">${cases}</strong><br/>Share of refugees: <strong style="color:#b4a0ff">${pct}</strong>`;
      tooltip.style.opacity = '1';
    });
    track.addEventListener('mousemove', e => {
      tooltip.style.left = (e.clientX + 14) + 'px';
      tooltip.style.top  = (e.clientY - 10) + 'px';
    });
    track.addEventListener('mouseleave', () => tooltip.style.opacity = '0');
  });
}

/* ── MAP TOOLTIPS ─────────────────────────────────────────── */
function initMapTooltips() {
  const tooltip = document.getElementById('tooltip');
  $$('.province-path').forEach(path => {
    path.addEventListener('mouseenter', e => {
      const name = path.dataset.name;
      const ref  = path.dataset.refugees;
      const cas  = path.dataset.cases;
      if (!name) return;
      tooltip.innerHTML = `<strong>${name}</strong><br/>Refugees: ${ref || '—'}<br/>Cases 2019–23: ${cas || '—'}`;
      tooltip.style.opacity = '1';
    });
    path.addEventListener('mousemove', e => {
      tooltip.style.left = (e.clientX + 14) + 'px';
      tooltip.style.top  = (e.clientY - 10) + 'px';
    });
    path.addEventListener('mouseleave', () => tooltip.style.opacity = '0');
  });
}

/* ── CHART 1: PAKISTAN ANNUAL CASES (BAR) ─────────────────── */
function initCasesChart() {
  const ctx = document.getElementById('chart-pak-cases').getContext('2d');
  const years = Object.keys(PAK_CASES).map(Number);
  const vals  = Object.values(PAK_CASES);

  const annotations = {
    2014: '2014 Peak: Taliban FATA vaccination ban',
    2019: '2019 Resurgence: cross-border import (147 cases)',
    2021: '2021 Historic Low: 1 case',
    2017: '2017 Near-zero: 8 cases after coverage recovery'
  };

  const bgColors = vals.map((v, i) => {
    const yr = years[i];
    if (yr === 2014) return rgba(COLORS.rose, 0.9);
    if (yr === 2019) return rgba(COLORS.amber, 0.8);
    if (yr === 2021) return rgba(COLORS.mint, 0.9);
    return rgba(COLORS.violet, 0.5);
  });

  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: years,
      datasets: [{
        label: 'Cases',
        data: vals,
        backgroundColor: bgColors,
        borderColor: bgColors.map(c => c.replace(/[\d.]+\)$/, '1)')),
        borderWidth: 1,
        borderRadius: 4,
        hoverBackgroundColor: rgba(COLORS.violet, 0.9)
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      animation: { duration: 1200, easing: 'easeOutQuart' },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#141820',
          borderColor: rgba(COLORS.violet, 0.3),
          borderWidth: 1,
          titleColor: COLORS.violet,
          bodyColor: '#e8e4f0',
          callbacks: {
            title: ctx => `Year: ${ctx[0].label}`,
            label: ctx => ` Cases: ${ctx.raw}`,
            afterLabel: ctx => {
              const yr = ctx.label;
              return annotations[yr] ? ` ↳ ${annotations[yr]}` : '';
            }
          }
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: { color: '#4a4e62', font: { size: 9 }, maxRotation: 45 }
        },
        y: {
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: { color: '#8a8fa8' },
          title: { display: true, text: 'WPV1 cases', color: '#4a4e62', font: { size: 9 } }
        }
      },
      onClick(e, elements) {
        if (elements.length) {
          const idx = elements[0].index;
          const yr = years[idx];
          const ann = document.getElementById('cases-annotation');
          ann.textContent = annotations[yr] ? `${yr}: ${annotations[yr]}` : `${yr}: ${vals[idx]} cases reported`;
          ann.style.color = '#b4a0ff';
        }
      }
    }
  });
}

/* ── CHART 2: GLOBAL LINE CHART ─────────────────────────────── */
function initGlobalChart() {
  const ctx = document.getElementById('chart-global').getContext('2d');

  const allYears = Array.from({length:44}, (_, i) => 1980 + i);
  const regionColors = {
    Pakistan:    COLORS.rose,
    Afghanistan: COLORS.amber,
    India:       COLORS.mint,
    Nigeria:     COLORS.sky,
    World:       COLORS.lilac
  };

  function interpolate(data, years) {
    const keys = Object.keys(data).map(Number).sort((a,b)=>a-b);
    return years.map(yr => {
      if (data[yr] !== undefined) return data[yr];
      // linear interpolation
      const before = keys.filter(k => k <= yr).pop();
      const after  = keys.filter(k => k >= yr).shift();
      if (before === undefined || after === undefined) return null;
      if (before === after) return data[before];
      const t = (yr - before) / (after - before);
      return lerp(data[before], data[after], t);
    });
  }

  const activeRegions = new Set(['Pakistan', 'Afghanistan']);

  const datasets = Object.entries(CASES_PER_MILLION).map(([region, data]) => ({
    label: region === 'World' ? 'World Avg' : region,
    data: interpolate(data, allYears),
    borderColor: regionColors[region],
    backgroundColor: rgba(regionColors[region], 0.08),
    borderWidth: region === 'Pakistan' ? 2.5 : 1.5,
    pointRadius: region === 'Pakistan' ? 3 : 1.5,
    pointHoverRadius: 5,
    tension: 0.4,
    fill: false,
    hidden: !activeRegions.has(region)
  }));

  const chart = new Chart(ctx, {
    type: 'line',
    data: { labels: allYears, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      animation: { duration: 1000 },
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            color: '#8a8fa8',
            font: { size: 10 },
            boxWidth: 14,
            padding: 16
          }
        },
        tooltip: {
          backgroundColor: '#141820',
          borderColor: rgba(COLORS.violet, 0.3),
          borderWidth: 1,
          titleColor: '#b4a0ff',
          bodyColor: '#e8e4f0',
          callbacks: {
            label: ctx => ` ${ctx.dataset.label}: ${ctx.raw !== null ? ctx.raw.toFixed(3) : '—'} per million`
          }
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: { color: '#4a4e62', maxTicksLimit: 10 }
        },
        y: {
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: { color: '#8a8fa8' },
          title: { display: true, text: 'Cases per million', color: '#4a4e62', font: { size: 9 } }
        }
      }
    }
  });

  // Toggle buttons
  document.getElementById('region-btns').addEventListener('click', e => {
    const btn = e.target.closest('.btn');
    if (!btn) return;
    const region = btn.dataset.region;
    btn.classList.toggle('active');
    const ds = chart.data.datasets.find(d => d.label === (region === 'World' ? 'World Avg' : region));
    if (ds) { ds.hidden = !ds.hidden; chart.update(); }
  });
}

/* ── CHART 3: SCATTER PLOT (refugees vs cases) ─────────────── */
function initScatterChart() {
  const ctx = document.getElementById('chart-scatter').getContext('2d');

  const colors = [COLORS.coral, COLORS.rose, COLORS.sky, COLORS.mint, COLORS.amber];

  const chart = new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: PROVINCES.map((p, i) => ({
        label: p.name,
        data: [{ x: p.refugees / 1000, y: p.cases }],
        backgroundColor: rgba(colors[i], 0.7),
        borderColor: colors[i],
        borderWidth: 1.5,
        pointRadius: 10,
        pointHoverRadius: 14
      }))
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      animation: { duration: 1200 },
      plugins: {
        legend: {
          display: true,
          position: 'right',
          labels: { color:'#8a8fa8', font:{ size:10 }, boxWidth:10, padding:12 }
        },
        tooltip: {
          backgroundColor: '#141820',
          borderColor: rgba(COLORS.violet, 0.3),
          borderWidth: 1,
          titleColor: '#b4a0ff',
          bodyColor: '#e8e4f0',
          callbacks: {
            title: ctx => ctx[0].dataset.label,
            label: ctx => [
              ` Refugees: ${Math.round(ctx.raw.x * 1000).toLocaleString()}`,
              ` Cases: ${ctx.raw.y}`
            ]
          }
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(255,255,255,0.04)' },
          title: { display:true, text:'Refugees (thousands)', color:'#4a4e62', font:{size:9} },
          ticks: { color: '#4a4e62' }
        },
        y: {
          grid: { color: 'rgba(255,255,255,0.04)' },
          title: { display:true, text:'WPV1 Cases 2019–23', color:'#4a4e62', font:{size:9} },
          ticks: { color: '#8a8fa8' }
        }
      }
    }
  });

  // Draw r annotation after render
  chart.options.animation.onComplete = () => {
    const chartCtx = chart.ctx;
    chartCtx.save();
    chartCtx.font = "10px 'IBM Plex Mono', monospace";
    chartCtx.fillStyle = rgba(COLORS.violet, 0.7);
    chartCtx.fillText('Pearson r ≈ 0.97', chart.chartArea.left + 10, chart.chartArea.top + 20);
    chartCtx.restore();
  };
}

/* ── CHART 4: COVERAGE DUAL-AXIS (line + bar) ──────────────── */
let coverageChart = null;

function initCoverageChart() {
  const ctx = document.getElementById('chart-coverage').getContext('2d');
  const years = Object.keys(COVERAGE).map(Number).sort((a,b)=>a-b);

  const admin   = years.map(y => COVERAGE[y].ADMIN);
  const official= years.map(y => COVERAGE[y].OFFICIAL);
  const wuenic  = years.map(y => COVERAGE[y].WUENIC);
  const cases   = years.map(y => PAK_CASES[y] ?? null);

  coverageChart = new Chart(ctx, {
    data: {
      labels: years,
      datasets: [
        {
          type: 'line',
          label: 'ADMIN',
          data: admin,
          borderColor: COLORS.rose,
          backgroundColor: rgba(COLORS.rose, 0.08),
          borderWidth: 2,
          pointRadius: 3,
          tension: 0.4,
          yAxisID: 'y'
        },
        {
          type: 'line',
          label: 'OFFICIAL',
          data: official,
          borderColor: COLORS.sky,
          backgroundColor: rgba(COLORS.sky, 0.05),
          borderWidth: 1.5,
          borderDash: [5,3],
          pointRadius: 2,
          tension: 0.4,
          yAxisID: 'y'
        },
        {
          type: 'line',
          label: 'WUENIC',
          data: wuenic,
          borderColor: COLORS.mint,
          backgroundColor: rgba(COLORS.mint, 0.08),
          borderWidth: 2,
          pointRadius: 3,
          tension: 0.4,
          yAxisID: 'y'
        },
        {
          type: 'bar',
          label: 'WPV1 Cases',
          data: cases,
          backgroundColor: rgba(COLORS.amber, 0.45),
          borderColor: rgba(COLORS.amber, 0.7),
          borderWidth: 1,
          borderRadius: 3,
          yAxisID: 'y2',
          order: 10
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      animation: { duration: 900 },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: '#141820',
          borderColor: rgba(COLORS.violet, 0.3),
          borderWidth: 1,
          titleColor: '#b4a0ff',
          bodyColor: '#e8e4f0',
          mode: 'index',
          intersect: false,
          callbacks: {
            label: ctx => {
              if (ctx.dataset.label === 'WPV1 Cases') {
                return ` Cases: ${ctx.raw ?? '—'}`;
              }
              return ` ${ctx.dataset.label}: ${ctx.raw ?? '—'}%`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: { color:'#4a4e62', maxRotation:45, font:{size:9} }
        },
        y: {
          position: 'left',
          min: 40, max: 105,
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: { color:'#8a8fa8', callback: v => v+'%' },
          title: { display:true, text:'Coverage %', color:'#4a4e62', font:{size:9} }
        },
        y2: {
          position: 'right',
          grid: { drawOnChartArea: false },
          ticks: { color: rgba(COLORS.amber, 0.8) },
          title: { display:true, text:'Annual Cases', color: rgba(COLORS.amber, 0.8), font:{size:9} }
        }
      }
    }
  });
}

/* ── YEAR SLIDER ───────────────────────────────────────────── */
function initYearSlider() {
  const slider = document.getElementById('year-slider');
  const yearLabel = document.getElementById('slider-year');
  const detail = document.getElementById('year-detail');

  function update(yr) {
    yr = parseInt(yr);
    yearLabel.textContent = yr;
    const cov = COVERAGE[yr];
    const cases = PAK_CASES[yr] ?? '—';
    if (!cov) return;

    const admin = cov.ADMIN;
    const wuenic = cov.WUENIC;
    const gap = wuenic ? (admin - wuenic).toFixed(1) : '—';
    const gapColor = gap > 20 ? '#ffaab4' : gap > 10 ? '#ffd580' : '#7effc4';

    detail.innerHTML = `
      <span style="color:#ffaab4">ADMIN: ${admin}%</span> &nbsp;|&nbsp;
      <span style="color:#7dd3fc">OFFICIAL: ${cov.OFFICIAL ?? '—'}%</span> &nbsp;|&nbsp;
      <span style="color:#7effc4">WUENIC: ${wuenic ?? '—'}%</span><br/>
      Gap (ADMIN−WUENIC): <span style="color:${gapColor};font-weight:700">${gap}pp</span><br/>
      Reported WPV1 cases: <span style="color:#ffd580">${cases}</span>
    `;

    // Highlight bar on coverage chart
    if (coverageChart) {
      const years = Object.keys(COVERAGE).map(Number).sort((a,b)=>a-b);
      const idx = years.indexOf(yr);
      coverageChart.data.datasets.forEach((ds, di) => {
        if (di === 3) return; // skip cases bar
        // highlight logic via chart update isn't trivial; just update
      });
    }
  }

  slider.addEventListener('input', e => update(e.target.value));
  update(2010);
}

/* ── CHART 5: DOT PLOT (global rank) ─────────────────────────── */
function initDotPlot() {
  const ctx = document.getElementById('chart-dotplot').getContext('2d');
  const sorted = [...GLOBAL_2023].sort((a,b) => a.cov - b.cov);

  const highlight = { PAK: COLORS.rose, IND: COLORS.mint, NGA: COLORS.sky };
  const bgColors = sorted.map(d => {
    if (d.code === 'PAK') return rgba(COLORS.rose, 0.9);
    if (d.code === 'IND') return rgba(COLORS.mint, 0.8);
    if (d.code === 'NGA') return rgba(COLORS.sky, 0.8);
    return rgba(COLORS.violet, 0.3);
  });

  const radii = sorted.map(d => ['PAK','IND','NGA'].includes(d.code) ? 10 : 6);

  new Chart(ctx, {
    type: 'bubble',
    data: {
      datasets: [{
        data: sorted.map((d, i) => ({ x: i, y: d.cov, r: radii[i], ...d })),
        backgroundColor: bgColors,
        borderColor: bgColors.map(c => c.replace(/[\d.]+\)$/, '0.9)')),
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      animation: { duration: 1200 },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#141820',
          borderColor: rgba(COLORS.violet, 0.3),
          borderWidth: 1,
          titleColor: '#b4a0ff',
          bodyColor: '#e8e4f0',
          callbacks: {
            title: ctx => ctx[0].raw.country,
            label: ctx => ` OPV3 Coverage: ${ctx.raw.cov}%`
          }
        }
      },
      scales: {
        x: {
          display: false
        },
        y: {
          min: 25, max: 105,
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: { color: '#8a8fa8', callback: v => v+'%' },
          title: { display:true, text:'OPV3 Coverage 2023', color:'#4a4e62', font:{size:9} }
        }
      },
      layout: { padding: { left:10, right:10 } },
      animation: {
        onComplete() {
          const c = this.ctx;
          c.save();
          c.fillStyle = rgba(COLORS.rose, 0.9);
          c.font = "bold 9px 'IBM Plex Mono'";
          // Label key countries
          const meta = this.getDatasetMeta(0);
          meta.data.forEach((pt, i) => {
            const d = sorted[i];
            if (['PAK','IND','NGA'].includes(d.code)) {
              c.fillStyle = d.code === 'PAK' ? COLORS.rose : d.code === 'IND' ? COLORS.mint : COLORS.sky;
              c.fillText(d.code, pt.x - 10, pt.y - 14);
            }
          });
          // 80% WHO line
          c.strokeStyle = rgba(COLORS.amber, 0.4);
          c.setLineDash([4,4]);
          c.lineWidth = 1;
          const yPos = this.scales.y.getPixelForValue(80);
          c.beginPath();
          c.moveTo(this.chartArea.left, yPos);
          c.lineTo(this.chartArea.right, yPos);
          c.stroke();
          c.fillStyle = rgba(COLORS.amber, 0.6);
          c.font = "9px 'IBM Plex Mono'";
          c.fillText('WHO 80% target', this.chartArea.left + 4, yPos - 4);
          c.restore();
        }
      }
    }
  });
}

/* ── SCROLLYTELLING ───────────────────────────────────────── */
function initScrollytelling() {
  const steps = $$('.scrolly-step');
  if (!steps.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        steps.forEach(s => s.classList.remove('active'));
        e.target.classList.add('active');

        // Update coverage chart highlight based on step
        const step = parseInt(e.target.dataset.step);
        highlightCoverageStep(step);
      }
    });
  }, { threshold: 0.5, rootMargin: '-30% 0px -30% 0px' });

  steps.forEach(s => observer.observe(s));
}

function highlightCoverageStep(step) {
  if (!coverageChart) return;
  // step 1 → highlight 2010 (index of year 2010)
  const years = Object.keys(COVERAGE).map(Number).sort((a,b)=>a-b);

  let highlightYear = null;
  if (step === 1) highlightYear = 2010;
  if (step === 3) highlightYear = 2019;

  const pointRadii = years.map(y => {
    if (y === highlightYear) return 8;
    return 3;
  });

  coverageChart.data.datasets[0].pointRadius = pointRadii;
  coverageChart.data.datasets[2].pointRadius = pointRadii;
  coverageChart.update('none');
}

/* ── INIT ─────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initProgress();
  initNavHighlight();
  initReveal();
  initProvinceBars();
  initMapTooltips();

  // Counter animation triggers on hero entering view
  const hero = document.getElementById('hero');
  const heroObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      animateCounters();
      heroObs.disconnect();
    }
  }, { threshold: 0.5 });
  if (hero) heroObs.observe(hero);

  // Lazy-init charts when they enter viewport
  function lazyChart(id, fn) {
    const el = document.getElementById(id);
    if (!el) return;
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        fn();
        obs.disconnect();
      }
    }, { threshold: 0.1 });
    obs.observe(el);
  }

  lazyChart('chart-pak-cases', initCasesChart);
  lazyChart('chart-global',    initGlobalChart);
  lazyChart('chart-scatter',   initScatterChart);
  lazyChart('chart-coverage',  () => {
    initCoverageChart();
    initYearSlider();
    initScrollytelling();
  });
  lazyChart('chart-dotplot',   initDotPlot);
});
