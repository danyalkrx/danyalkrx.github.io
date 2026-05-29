let chart;

/* =========================
   ACTIVE NAV
========================= */

function setActiveNav() {
  const path = window.location.pathname.split("/").pop();

  document.querySelectorAll(".nav-item").forEach(link => {
    const href = link.getAttribute("href");
    if (!href) return;

    if (href === path || (path === "" && href.includes("dashboard"))) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

/* =========================
   CHART
========================= */

function loadCSVAndRenderChart() {

  const canvas = document.getElementById("streamChart");
  if (!canvas) return;

  if (typeof Papa === "undefined" || typeof Chart === "undefined") {
    console.error("Missing Chart.js or PapaParse");
    return;
  }

  Papa.parse("/artists/streams.csv", {
    download: true,
    header: true,

    complete: function(results) {

      const rows = results.data
        .filter(r => r.date && r.streams)
        .map(r => ({
          date: r.date,
          streams: Number(r.streams)
        }));

      const labels = rows.map(r => r.date);
      const data = rows.map(r => r.streams);

      if (chart) chart.destroy();

      chart = new Chart(canvas, {
        type: "line",
        data: {
          labels,
          datasets: [{
            label: "Streams",
            data,
            borderColor: "#9bb2ff",
            backgroundColor: "rgba(130,150,255,0.15)",
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: "#fff",
            pointBorderColor: "#9bb2ff",
            pointBorderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: "rgba(255,255,255,0.4)" }
            },
            y: {
              min: 0,
              grid: { color: "rgba(255,255,255,0.06)" },
              ticks: { color: "rgba(255,255,255,0.4)" }
            }
          }
        }
      });

    }
  });
}

/* =========================
   SIDEBAR SYSTEM
========================= */

function setupSidebar() {

  const sidebar = document.getElementById("sidebar");
  const main = document.getElementById("main");

  const collapseBtn = document.getElementById("collapseBtn");
  const mobileToggle = document.getElementById("mobileToggle");
  const overlay = document.getElementById("overlay");

  if (!sidebar) return;

  function openSidebar(){
    sidebar.classList.add("open");
    overlay?.classList.add("active");
  }

  function closeSidebar(){
    sidebar.classList.remove("open");
    overlay?.classList.remove("active");
  }

  collapseBtn?.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
    main.classList.toggle("expanded");
  });

  mobileToggle?.addEventListener("click", () => {
    sidebar.classList.contains("open") ? closeSidebar() : openSidebar();
  });

  overlay?.addEventListener("click", closeSidebar);

  document.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("click", closeSidebar);
  });
}

/* =========================
   INIT
========================= */

function initDashboard() {
  setupSidebar();
  setActiveNav();
  loadCSVAndRenderChart();
}

/* =========================
   BOOT AFTER SIDEBAR LOAD
========================= */

fetch("sidebar.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("sidebar-container").innerHTML = html;
    initDashboard();
  })
  .catch(err => console.error("Sidebar failed:", err));