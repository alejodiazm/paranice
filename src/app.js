const roadmap = {
  30: {
    label: "0-30 días",
    title: "Control, visibilidad y contención",
    intent: "Cerrar los vacíos que hoy dependen de memoria manual y de la buena voluntad de RRHH.",
    metrics: ["100% activos críticos inventariados", "100% admins con MFA", "< 1 hora para salidas sensibles"],
    moves: [
      "Canal único de solicitudes IT",
      "RACI RRHH / IT / Finanzas",
      "Matriz de accesos por rol",
      "Checklist temporal de onboarding/offboarding"
    ]
  },
  60: {
    label: "31-60 días",
    title: "Implementación y transferencia controlada",
    intent: "IT asume ejecución técnica sin romper la supervisión de RRHH ni la velocidad del negocio.",
    metrics: ["85% endpoints en MDM o plan", "8 equipos de stock objetivo", "Primer piloto Zero Trust"],
    moves: ["MDM Apple/Windows por oleadas", "SSO/SCIM donde aplique", "Base de conocimiento IT", "Revisión de licencias Google, Slack, Adobe y SAP"]
  },
  90: {
    label: "61-90 días",
    title: "Escalamiento medible",
    intent: "Convertir una función reactiva en un sistema operativo IT con KPIs, presupuesto y mejora continua.",
    metrics: ["95% equipos cifrados", "Auditoría trimestral diseñada", "Roadmap anual aprobado"],
    moves: ["Dashboard ejecutivo", "Simulacro de offboarding", "Política IA responsable", "Plan anual de continuidad y proveedores"]
  }
};

const risks = {
  offboarding: {
    title: "Excolaborador con accesos activos",
    severity: "Crítico",
    owner: "RRHH dispara evento; IT revoca",
    impact: "Gmail, Drive, Slack, Adobe, SAP o dispositivo pueden seguir exponiendo información.",
    action: "SLA salida sensible < 1 hora, suspensión de sesiones, transferencia de Drive y bloqueo MDM."
  },
  assets: {
    title: "Activos sin responsable",
    severity: "Crítico",
    owner: "IT + Finanzas",
    impact: "El negocio pierde trazabilidad sobre equipos, garantías, costo hundido y recuperación.",
    action: "Inventario con serial, usuario, estado, criticidad, garantía, ubicación y evidencia."
  },
  mdm: {
    title: "Equipos sin MDM",
    severity: "Alto",
    owner: "IT",
    impact: "No hay borrado remoto, cifrado consistente ni política base por sistema operativo.",
    action: "Enrolamiento progresivo Apple/Windows y políticas mínimas de seguridad por rol."
  },
  shadowai: {
    title: "Shadow AI",
    severity: "Alto",
    owner: "IT + Legal/RRHH",
    impact: "Datos sensibles pueden terminar en herramientas personales sin control contractual.",
    action: "Política de IA, pilotos internos y reglas claras de datos permitidos/prohibidos."
  },
  credentials: {
    title: "Credenciales compartidas",
    severity: "Alto",
    owner: "IT",
    impact: "Imposible atribuir acciones, revocar por persona o auditar cambios críticos.",
    action: "Cuentas nominales, MFA, grupos por rol y revisión trimestral de privilegios."
  },
  rrhh: {
    title: "RRHH sobrecargado técnicamente",
    severity: "Medio",
    owner: "RRHH supervisa; IT opera",
    impact: "El área humana queda respondiendo por riesgos que requieren criterio técnico.",
    action: "Transferencia documentada: RRHH conserva eventos laborales, IT toma ejecución técnica."
  }
};

const offboarding = [
  "RRHH notifica salida y criticidad",
  "IT suspende Google y revoca sesiones",
  "Se cierran Slack, Adobe, SAP y ClickUp",
  "Se transfiere Drive y propiedad documental",
  "MDM bloquea equipo y celular",
  "Finanzas cierra activo y evidencia"
];

function qs(selector) {
  return document.querySelector(selector);
}

function qsa(selector) {
  return Array.from(document.querySelectorAll(selector));
}

function renderIcons() {
  if (window.lucide?.createIcons) {
    window.lucide.createIcons();
  }
}

function updateStock() {
  const deviceCount = Math.max(1, Number(qs("#deviceCount").value || 79));
  const stockRatio = Math.max(5, Number(qs("#stockRatio").value || 10));
  const apple = Math.round(deviceCount * 0.8);
  const windows = deviceCount - apple;
  const stockTarget = Math.ceil((deviceCount * stockRatio) / 100);
  const reorder = Math.ceil(stockTarget / 2);
  const appleStock = Math.max(1, Math.round(stockTarget * 0.75));
  const winStock = Math.max(1, stockTarget - appleStock);

  qs("#appleCount").textContent = apple;
  qs("#windowsCount").textContent = windows;
  qs("#stockTarget").textContent = stockTarget;
  qs("#reorderPoint").textContent = reorder;
  qs("#stockRatioLabel").textContent = `${stockRatio}% del parque`;
  qs("#stockFormula").innerHTML = `Mezcla inicial sugerida: <strong>${appleStock} Apple</strong> y <strong>${winStock} Windows</strong>, ajustable por ingresos, fallas y tiempos de compra.`;
  qs("#stockMeterFill").style.width = `${Math.min(96, Math.max(18, 18 + ((stockRatio - 5) / 13) * 78))}%`;
}

function setRisk(riskId) {
  const risk = risks[riskId];
  if (!risk) return;
  const detail = qs("#riskDetail");
  detail.classList.add("swapping");
  setTimeout(() => {
    qsa("[data-risk]").forEach((button) => button.classList.toggle("active", button.dataset.risk === riskId));
    qs("#riskSeverity").textContent = risk.severity;
    qs("#riskTitle").textContent = risk.title;
    qs("#riskImpact").textContent = risk.impact;
    qs("#riskOwner").textContent = risk.owner;
    qs("#riskAction").textContent = risk.action;
    detail.classList.remove("swapping");
  }, 160);
}

function setRoadmap(key) {
  const phase = roadmap[key];
  if (!phase) return;
  const card = qs("#roadmapCard");
  card.classList.add("swapping");
  setTimeout(() => {
    qsa("[data-roadmap]").forEach((button) => button.classList.toggle("active", button.dataset.roadmap === key));
    qs("#roadmapLabel").textContent = phase.label;
    qs("#roadmapTitle").textContent = phase.title;
    qs("#roadmapIntent").textContent = phase.intent;
    qs("#roadmapMoves").innerHTML = phase.moves
      .map((move) => `<li><i data-lucide="chevron-right"></i>${move}</li>`)
      .join("");
    qs("#roadmapMetrics").innerHTML = phase.metrics.map((metric) => `<span>${metric}</span>`).join("");
    card.classList.remove("swapping");
    renderIcons();
  }, 160);
}

function setOffboarding(step) {
  qsa(".step-line").forEach((button, index) => {
    button.classList.toggle("done", index <= step);
    const marker = button.querySelector("span");
    marker.innerHTML = index <= step ? '<i data-lucide="check"></i>' : String(index + 1);
  });
  qs("#drillProgress").style.width = `${((step + 1) / offboarding.length) * 100}%`;
  qs("#drillLabel").textContent = `Paso ${step + 1} de ${offboarding.length}`;
  renderIcons();
}

function renderOffboarding() {
  qs("#offboardingSteps").innerHTML = offboarding
    .map(
      (step, index) =>
        `<button class="step-line ${index === 0 ? "done" : ""}" data-step="${index}"><span>${index === 0 ? '<i data-lucide="check"></i>' : index + 1}</span>${step}</button>`
    )
    .join("");
  qsa("[data-step]").forEach((button) => {
    button.addEventListener("click", () => setOffboarding(Number(button.dataset.step)));
  });
}

function updateAiScore() {
  const active = qsa("[data-ai].on").length;
  qs("#aiScore").textContent = `${active}/4`;
  qs(".ai-score").style.setProperty("--ai-score", String((active / 4) * 100));
}

function updateMaturity() {
  const sliders = qsa("[data-maturity]");
  const score = Math.round(sliders.reduce((sum, slider) => sum + Number(slider.value), 0) / sliders.length);
  const stage =
    score < 35
      ? ["Base reactiva", "La prioridad es inventario, MFA, ownership y salida segura antes de automatizar."]
      : score < 65
        ? ["Control en construcción", "Ya hay trazabilidad; conviene acelerar MDM, matriz de accesos y medición de SLAs."]
        : score < 85
          ? ["Operación gobernada", "La función IT puede escalar automatización, auditorías y continuidad con bajo ruido."]
          : ["IT estratégico", "La base permite pilotos de productividad, analítica e IA responsable con controles claros."];

  qs("#maturityScore").textContent = score;
  qs("#maturityStage").textContent = stage[0];
  qs("#maturityNarrative").textContent = stage[1];
  qs("#maturityRing").style.setProperty("--score", String(score));
}

function animateCount(element) {
  if (element.dataset.animated === "true") return;
  element.dataset.animated = "true";
  const target = Number(element.dataset.count);
  const duration = 950;
  const start = performance.now();
  const tick = (now) => {
    const progress = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = String(Math.round(target * eased));
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function bindRevealAndCounters() {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        entry.target.querySelectorAll("[data-count]").forEach(animateCount);
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.16 }
  );

  qsa(".reveal").forEach((element) => revealObserver.observe(element));
}

function bindScrollProgress() {
  const update = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable <= 0 ? 0 : (window.scrollY / scrollable) * 100;
    qs("#scrollProgress").style.width = `${Math.max(0, Math.min(100, progress))}%`;
  };
  update();
  window.addEventListener("scroll", update, { passive: true });
}

function bindNavSpy() {
  const navLinks = qsa("[data-nav]");
  if (!navLinks.length) return;

  const activate = (sectionId) => {
    navLinks.forEach((link) => link.classList.toggle("active", link.dataset.nav === sectionId));
  };

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target?.id) activate(visible.target.id);
    },
    {
      rootMargin: "-25% 0px -58% 0px",
      threshold: [0.12, 0.3, 0.55]
    }
  );

  navLinks.forEach((link) => {
    const section = qs(`#${link.dataset.nav}`);
    if (section) sectionObserver.observe(section);
  });
}

function bindParallax() {
  const hero = qs(".hero-section");
  const packs = qsa(".pack");
  hero.addEventListener("pointermove", (event) => {
    const rect = hero.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    packs.forEach((pack, index) => {
      const depth = [22, -16, 12][index] || 10;
      pack.style.setProperty("--parallax-x", String(Math.round(x * depth)));
      pack.style.setProperty("--parallax-y", String(Math.round(y * depth)));
    });
  });
  hero.addEventListener("pointerleave", () => {
    packs.forEach((pack) => {
      pack.style.setProperty("--parallax-x", "0");
      pack.style.setProperty("--parallax-y", "0");
    });
  });
}

function bindTiltCards() {
  qsa(".tilt-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty("--tilt-x", `${x * 7}deg`);
      card.style.setProperty("--tilt-y", `${y * -7}deg`);
    });
    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
    });
  });
}

function bindEvents() {
  qs("#deviceCount").addEventListener("input", updateStock);
  qs("#stockRatio").addEventListener("input", updateStock);

  qsa("[data-risk]").forEach((button) => {
    button.addEventListener("click", () => setRisk(button.dataset.risk));
  });

  qsa("[data-roadmap]").forEach((button) => {
    button.addEventListener("click", () => setRoadmap(button.dataset.roadmap));
  });

  qs("#resetDrill").addEventListener("click", () => setOffboarding(0));

  qsa("[data-ai]").forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.toggle("on");
      const icon = button.querySelector("i, svg");
      const isOn = button.classList.contains("on");
      if (icon) {
        const replacement = document.createElement("i");
        replacement.setAttribute("data-lucide", isOn ? "check" : "x");
        icon.replaceWith(replacement);
      }
      updateAiScore();
      renderIcons();
    });
  });

  qsa("[data-maturity]").forEach((slider) => {
    slider.addEventListener("input", updateMaturity);
  });
}

renderOffboarding();
setRoadmap("30");
updateStock();
updateAiScore();
updateMaturity();
bindEvents();
bindRevealAndCounters();
bindScrollProgress();
bindNavSpy();
bindParallax();
bindTiltCards();
renderIcons();
