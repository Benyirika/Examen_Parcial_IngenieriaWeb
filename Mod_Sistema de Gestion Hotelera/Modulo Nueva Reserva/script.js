// Datos de ejemplo (luego vendrán del backend)
const HABITACIONES = [
  { id: "std", nombre: "Standard", desc: "1 Queen · Interior", precio: 120, disp: 5 },
  { id: "suite", nombre: "Suite", desc: "King · Vista ciudad", precio: 220, disp: 2 },
  { id: "pres", nombre: "Presidencial", desc: "Lujo · Panorámica", precio: 450, disp: 0 },
];
const PLANES = [
  { id: "des", nombre: "Desayuno", icono: "coffee", precio: 55, desc: "Buffet gourmet diario" },
  { id: "alm", nombre: "Almuerzo", icono: "lunch_dining", precio: 85, desc: "Menú a la carta" },
  { id: "cena", nombre: "Cena", icono: "dinner_dining", precio: 95, desc: "Cena gourmet + postre" },
];
const SERVICIOS = [
  { id: "champ", nombre: "Champagne de Bienvenida", desc: "Botella en habitación al arribo", icono: "liquor", precio: 150, tipo: "único" },
  { id: "park", nombre: "Estacionamiento Privado", desc: "Valet parking incluido", icono: "directions_car", precio: 35, tipo: "día" },
  { id: "tras", nombre: "Traslado Aeropuerto", desc: "SUV privado", icono: "flight_land", precio: 200, tipo: "único" },
  { id: "spa", nombre: "Pase Spa Diario", desc: "Circuito termal", icono: "spa", precio: 70, tipo: "día" },
  { id: "gym", nombre: "Gimnasio Premium", desc: "Acceso 24/7 + entrenador 1h", icono: "fitness_center", precio: 0, tipo: "cortesía" },
  { id: "late", nombre: "Late check-out", desc: "Salida hasta las 14:00", icono: "schedule", precio: 60, tipo: "único" },
  { id: "lav", nombre: "Lavandería", desc: "Hasta 5 prendas", icono: "local_laundry_service", precio: 45, tipo: "único" },
  { id: "tour", nombre: "City Tour", desc: "Medio día guiado", icono: "tour", precio: 120, tipo: "único" },
];
const PAISES = [
  ["Perú", "+51"], ["Chile", "+56"], ["Colombia", "+57"], ["Argentina", "+54"],
  ["Bolivia", "+591"], ["Ecuador", "+593"], ["México", "+52"], ["España", "+34"],
  ["EE.UU.", "+1"], ["Brasil", "+55"],
];

// Estado
let paso = 1;
let habitacion = HABITACIONES[0];
let acompanantes = [];
let planesSel = { des: true, alm: false, cena: false };
let lugarPlan = { des: "Restaurante", alm: "Restaurante", cena: "Restaurante" };
let servSel = { champ: true, park: true };

const $ = id => document.getElementById(id);

setInterval(() => { $("reloj").textContent = new Date().toLocaleString("es-PE"); }, 1000);

// --- Fechas DD/MM/AAAA ---
function hoyDDMMAAAA(n = 0) {
  const d = new Date(); d.setDate(d.getDate() + n);
  return d.toLocaleDateString("es-PE", { day: "2-digit", month: "2-digit", year: "numeric" });
}
$("checkin").value = hoyDDMMAAAA(0);
$("checkout").value = hoyDDMMAAAA(3);

// Escribir a mano con máscara
["checkin", "checkout"].forEach(id => {
  $(id).addEventListener("input", e => {
    let v = e.target.value.replace(/\D/g, "").slice(0, 8);
    if (v.length > 4) v = v.slice(0, 2) + "/" + v.slice(2, 4) + "/" + v.slice(4);
    else if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2);
    e.target.value = v;
    calcularNoches();
  });
});

function aFecha(txt) {
  const m = txt.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!m) return null;
  const f = new Date(m[3], m[2] - 1, m[1]);
  if (f.getDate() != +m[1] || f.getMonth() != m[2] - 1) return null;
  return f;
}
function fmtFecha(f) {
  return f.toLocaleDateString("es-PE", { day: "2-digit", month: "2-digit", year: "numeric" });
}
function noches() {
  const a = aFecha($("checkin").value), b = aFecha($("checkout").value);
  if (!a || !b) return 0;
  return Math.round((b - a) / 86400000);
}
function calcularNoches() {
  const n = noches();
  $("nochesTxt").textContent = n > 0 ? n + (n === 1 ? " noche" : " noches") : "Revisa las fechas";
  actualizarResumen();
}

// --- Calendario propio (colores Brand_core) ---
let calPara = "checkin"; // input activo
let calVista = new Date(); // mes visible

document.querySelectorAll(".btn-cal").forEach(b => {
  b.onclick = e => {
    e.stopPropagation();
    calPara = b.dataset.para;
    const f = aFecha($(calPara).value);
    calVista = f ? new Date(f) : new Date();
    $("cal").classList.toggle("hidden");
    pintarCal();
  };
});
$("calPrev").onclick = e => { e.stopPropagation(); calVista.setMonth(calVista.getMonth() - 1); pintarCal(); };
$("calNext").onclick = e => { e.stopPropagation(); calVista.setMonth(calVista.getMonth() + 1); pintarCal(); };
// Botón Hoy: vuelve al mes actual
$("calHoy").onclick = e => {
  e.stopPropagation();
  calVista = new Date();
  $(calPara).value = fmtFecha(calVista);
  pintarCal(); calcularNoches();
};
document.addEventListener("click", e => {
  if (!$("cal").classList.contains("hidden") && !$("cal").contains(e.target)) $("cal").classList.add("hidden");
});

// Dibuja la grilla del mes (hoy siempre marcado)
function pintarCal() {
  const y = calVista.getFullYear(), m = calVista.getMonth();
  $("calTitulo").textContent = calVista.toLocaleDateString("es-PE", { month: "long", year: "numeric" });
  $("hoyTxt").textContent = hoyDDMMAAAA(0);
  const primero = (new Date(y, m, 1).getDay() + 6) % 7; // lunes=0
  const diasMes = new Date(y, m + 1, 0).getDate();
  const box = $("calDias");
  box.innerHTML = "";
  for (let i = 0; i < primero; i++) box.innerHTML += `<span class="dia vacio"></span>`;
  const hoy = new Date(); hoy.setHours(0, 0, 0, 0);
  const fIn = aFecha($("checkin").value), fOut = aFecha($("checkout").value);
  for (let d = 1; d <= diasMes; d++) {
    const f = new Date(y, m, d);
    const s = document.createElement("span");
    s.textContent = d;
    s.className = "dia";
    if (f.getTime() === hoy.getTime()) s.classList.add("hoy");
    if (fIn && f.getTime() === fIn.getTime()) s.classList.add("sel");
    if (fOut && f.getTime() === fOut.getTime()) s.classList.add("sel");
    if (fIn && fOut && f > fIn && f < fOut) s.classList.add("rango");
    if (f < hoy) { s.style.opacity = ".35"; s.onclick = () => toast("No puedes elegir días pasados."); }
    else s.onclick = () => {
      $(calPara).value = fmtFecha(f);
      $("cal").classList.add("hidden");
      calcularNoches();
    };
    box.appendChild(s);
  }
}

// --- Habitaciones ---
function pintarHabs() {
  $("habitaciones").innerHTML = "";
  HABITACIONES.forEach(h => {
    const d = document.createElement("div");
    d.className = "hab" + (habitacion.id === h.id ? " sel" : "") + (h.disp === 0 ? " bloq" : "");
    d.innerHTML = `<b>${h.nombre}</b><br><small>${h.desc}</small><br>
      <small>${h.disp === 0 ? "Ocupado" : h.disp + " disponibles"}</small><br><b>S/. ${h.precio}</b>`;
    if (h.disp > 0) d.onclick = () => { habitacion = h; pintarHabs(); actualizarResumen(); };
    $("habitaciones").appendChild(d);
  });
}

// --- Titular ---
function pintarPaises() {
  $("tNacionalidad").innerHTML = PAISES.map(p => `<option>${p[0]}</option>`).join("");
  $("tNacionalidad").onchange = e => {
    const p = PAISES.find(x => x[0] === e.target.value);
    if (p) $("tPrefijo").value = p[1];
  };
}
function error(input, msgId, texto) {
  const msg = $(msgId);
  if (texto) { input.classList.add("error"); msg.textContent = texto; return false; }
  input.classList.remove("error"); msg.textContent = ""; return true;
}
const soloLetras = v => /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{2,40}$/.test(v.trim());

function validarPaso1() {
  let ok = true;
  if (!aFecha($("checkin").value)) { error($("checkin"), "msgIn", "Usa DD/MM/AAAA, ej. 12/10/2026."); ok = false; }
  else error($("checkin"), "msgIn", "");
  if (!aFecha($("checkout").value)) { error($("checkout"), "msgOut", "Usa DD/MM/AAAA."); ok = false; }
  else error($("checkout"), "msgOut", "");
  if (ok && noches() <= 0) { error($("checkout"), "msgOut", "El check-out debe ser después del check-in."); ok = false; }
  if (!habitacion || habitacion.disp === 0) { toast("Elige una habitación disponible."); ok = false; }
  return ok;
}

// Bloquea teclas no permitidas mientras escribe (muestra mensaje)
function soloPermitidos(input, msgId, patron, msgTexto) {
  input.addEventListener("beforeinput", e => {
    if (e.data && !patron.test(e.data)) {
      e.preventDefault();
      error(input, msgId, msgTexto);
    }
  });
  input.addEventListener("input", () => {
    const limpio = input.value.split("").filter(c => patron.test(c) || c === "").join("");
    if (limpio !== input.value) {
      input.value = limpio;
      error(input, msgId, msgTexto);
    } else if (input.value) error(input, msgId, "");
    if (input.id === "tEmail") $("cEmail").textContent = input.value.length;
  });
}
function validarTitular() {
  let ok = true;
  if (!soloLetras($("tNombre").value)) ok = error($("tNombre"), "mNombre", "Solo letras, 2-40 caracteres.") && ok;
  else error($("tNombre"), "mNombre", "");
  if (!soloLetras($("tApellidos").value)) ok = error($("tApellidos"), "mApellidos", "Solo letras, 2-40 caracteres.") && ok;
  else error($("tApellidos"), "mApellidos", "");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($("tEmail").value.trim())) ok = error($("tEmail"), "mEmail", "Email no válido.") && ok;
  else error($("tEmail"), "mEmail", "");
  if (!/^\d{6,12}$/.test($("tTelefono").value.replace(/\s/g, ""))) ok = error($("tTelefono"), "mTelefono", "6-12 dígitos.") && ok;
  else error($("tTelefono"), "mTelefono", "");
  const tipo = $("tTipoDoc").value, doc = $("tNumDoc").value.trim();
  if (tipo === "DNI" && !/^\d{8}$/.test(doc)) ok = error($("tNumDoc"), "mNumDoc", "DNI: 8 dígitos.") && ok;
  else if (tipo === "Pasaporte" && !/^[A-Za-z0-9]{6,12}$/.test(doc)) ok = error($("tNumDoc"), "mNumDoc", "Pasaporte: 6-12 letras/números.") && ok;
  else if (tipo === "CE" && !/^[A-Za-z0-9]{9,12}$/.test(doc)) ok = error($("tNumDoc"), "mNumDoc", "CE: 9-12 caracteres.") && ok;
  else error($("tNumDoc"), "mNumDoc", "");
  return ok;
}
["tNombre", "tApellidos", "tEmail", "tTelefono", "tNumDoc"].forEach(id => $(id).addEventListener("blur", validarTitular));

// Activa el bloqueo en vivo por tipo de campo
soloPermitidos($("tNombre"), "mNombre", /[A-Za-zÁÉÍÓÚáéíóúÑñ ]/, "Solo letras y espacios.");
soloPermitidos($("tApellidos"), "mApellidos", /[A-Za-zÁÉÍÓÚáéíóúÑñ ]/, "Solo letras y espacios.");
soloPermitidos($("tTelefono"), "mTelefono", /[0-9 ]/, "Solo números (0-9).");
soloPermitidos($("tEmail"), "mEmail", /[A-Za-z0-9@._-]/, "Solo letras, números, @ . _ -");
// Documento: el filtro depende del tipo (evita acumular listeners)
$("tNumDoc").addEventListener("beforeinput", e => {
  if (!e.data) return;
  const t = $("tTipoDoc").value;
  const ok = t === "DNI" ? /[0-9]/.test(e.data) : /[A-Za-z0-9-]/.test(e.data);
  if (!ok) { e.preventDefault(); error($("tNumDoc"), "mNumDoc", "Caracter no permitido para " + t + "."); }
});
$("tTipoDoc").onchange = () => {
  const t = $("tTipoDoc").value;
  $("tNumDoc").value = "";
  error($("tNumDoc"), "mNumDoc", "");
  $("tNumDoc").maxLength = t === "DNI" ? 8 : 12;
  $("tNumDoc").placeholder = t === "DNI" ? "12345678" : "P-98124501";
};

// --- Acompañantes (máx 6) ---
function pintarAcomp() {
  const box = $("listaAcomp");
  box.innerHTML = "";
  $("conteo").textContent = acompanantes.length;
  if (acompanantes.length === 0) box.innerHTML = `<p class="text-sm">Viaja solo. Usa el botón para agregar.</p>`;
  acompanantes.forEach((a, i) => {
    const d = document.createElement("div");
    d.className = "acomp";
    d.innerHTML = `
      <button class="x" data-i="${i}"><span class="material-symbols-outlined">close</span></button>
      <b>Acompañante ${i + 1}</b>
      <div class="grid grid-cols-2 gap-2 mt-2">
        <div><label>Nombre *</label><input data-i="${i}" data-c="nombre" value="${a.nombre}" placeholder="Solo letras" maxlength="40"></div>
        <div><label>Tipo</label><select data-i="${i}" data-c="tipo">
          <option ${a.tipo === "Adulto" ? "selected" : ""}>Adulto</option>
          <option ${a.tipo === "Niño" ? "selected" : ""}>Niño</option>
        </select></div>
        <div class="col-span-2"><label>Documento (opcional)</label><input data-i="${i}" data-c="doc" value="${a.doc}" maxlength="12" placeholder="Solo letras y números"></div>
      </div>
      <small class="msg" id="mA${i}"></small>`;
    box.appendChild(d);
  });
  box.querySelectorAll("input, select").forEach(el => {
    el.oninput = () => { acompanantes[el.dataset.i][el.dataset.c] = el.value; };
  });
  // Bloqueo en vivo también en acompañantes
  box.querySelectorAll('input[data-c="nombre"]').forEach(inp => {
    inp.addEventListener("beforeinput", e => {
      if (e.data && !/[A-Za-zÁÉÍÓÚáéíóúÑñ ]/.test(e.data)) {
        e.preventDefault();
        $("mA" + inp.dataset.i).textContent = "Solo letras y espacios.";
      }
    });
  });
  box.querySelectorAll(".x").forEach(b => {
    b.onclick = () => { acompanantes.splice(b.dataset.i, 1); pintarAcomp(); actualizarResumen(); };
  });
}
$("btnAgregar").onclick = () => {
  if (acompanantes.length >= 6) return toast("Máximo 6 acompañantes.");
  acompanantes.push({ nombre: "", tipo: "Adulto", doc: "" });
  pintarAcomp();
};
function validarAcomp() {
  for (let i = 0; i < acompanantes.length; i++) {
    const n = acompanantes[i].nombre.trim();
    if (n === "") { $("mA" + i).textContent = "Escribe el nombre o elimina con X."; return false; }
    if (!soloLetras(n)) { $("mA" + i).textContent = "Solo letras, 2-40 caracteres."; return false; }
  }
  return true;
}

// --- Servicios estilo wireframe ---
function pintarPlanes() {
  $("planes").innerHTML = "";
  PLANES.forEach(p => {
    const on = planesSel[p.id];
    const d = document.createElement("div");
    d.className = "plan" + (on ? " sel" : " off");
    d.innerHTML = `
      <div class="flex justify-between items-start">
        <div class="flex items-center gap-2"><span class="material-symbols-outlined">${p.icono}</span><b>${p.nombre}</b></div>
        <span class="switch"></span>
      </div>
      <div class="${on ? "" : "opacity-50"}">
        <span class="precio">S/. ${p.precio.toFixed(2)} / día</span>
        <small>${p.desc}</small>
        <div class="lugar">
          <button data-l="Restaurante" class="${lugarPlan[p.id] === "Restaurante" ? "on" : ""}">Restaurante</button>
          <button data-l="Room Service" class="${lugarPlan[p.id] === "Room Service" ? "on" : ""}">Room Service</button>
        </div>
      </div>`;
    d.onclick = e => {
      if (e.target.tagName === "BUTTON") return;
      planesSel[p.id] = !planesSel[p.id];
      pintarPlanes(); actualizarResumen();
    };
    d.querySelectorAll(".lugar button").forEach(b => {
      b.onclick = e => { e.stopPropagation(); lugarPlan[p.id] = b.dataset.l; pintarPlanes(); actualizarResumen(); };
    });
    $("planes").appendChild(d);
  });
}
function pintarServs() {
  $("servicios").innerHTML = "";
  SERVICIOS.forEach(s => {
    const on = !!servSel[s.id];
    const d = document.createElement("div");
    d.className = "serv" + (on ? " sel" : "");
    d.innerHTML = `
      <div class="flex items-center gap-3">
        <div class="serv-ico"><span class="material-symbols-outlined">${s.icono}</span></div>
        <div><b>${s.nombre}</b><br><small>${s.desc}</small></div>
      </div>
      <div class="precio-col">
        ${s.precio === 0 ? `<span class="badge-cortesia">Cortesía</span>` : `<b>S/. ${s.precio.toFixed(2)}${s.tipo === "día" ? " /día" : ""}</b>`}
        <input type="checkbox" ${on ? "checked" : ""} class="w-5 h-5">
      </div>`;
    d.onclick = () => { servSel[s.id] = !servSel[s.id]; pintarServs(); actualizarResumen(); };
    $("servicios").appendChild(d);
  });
}
$("btnSin").onclick = () => {
  Object.keys(planesSel).forEach(k => planesSel[k] = false);
  servSel = {}; pintarPlanes(); pintarServs(); actualizarResumen();
};
$("btnPremium").onclick = () => {
  Object.keys(planesSel).forEach(k => planesSel[k] = true);
  SERVICIOS.forEach(s => servSel[s.id] = true);
  pintarPlanes(); pintarServs(); actualizarResumen();
};

// --- Totales S/. ---
function totales() {
  const n = Math.max(noches(), 0);
  const base = habitacion.precio * n;
  let comida = 0;
  PLANES.forEach(p => { if (planesSel[p.id]) comida += p.precio * n; });
  let extra = 0;
  SERVICIOS.forEach(s => { if (servSel[s.id]) extra += s.tipo === "día" ? s.precio * n : s.precio; });
  const sub = base + comida + extra;
  const igv = sub * 0.18;
  return { n, base, comida, extra, igv, total: sub + igv };
}
function actualizarResumen() {
  const t = totales();
  $("resumenBox").innerHTML = `Hab. ${habitacion.nombre}: S/. ${t.base.toFixed(2)}<br>
    Alimentación: S/. ${t.comida.toFixed(2)}<br>Extras: S/. ${t.extra.toFixed(2)}<br>
    IGV 18%: S/. ${t.igv.toFixed(2)}<br><small>${t.n} noches</small>`;
  $("totalTxt").textContent = "S/. " + t.total.toFixed(2);
  if (paso === 5) pintarResumenFinal();
}
function pintarResumenFinal() {
  const t = totales();
  $("resumenFinal").innerHTML = `
    <div class="conf-box azul"><b><span class="material-symbols-outlined">person</span> Titular</b><br>
      ${$("tNombre").value} ${$("tApellidos").value} · ${$("tTipoDoc").value} ${$("tNumDoc").value}<br>
      <small>${$("tEmail").value} · ${$("tPrefijo").value} ${$("tTelefono").value} · ${$("tNacionalidad").value}</small></div>
    <div class="conf-box verde"><b><span class="material-symbols-outlined">calendar_month</span> Estancia</b><br>
      ${$("checkin").value} → ${$("checkout").value} (${t.n} noches) · ${habitacion.nombre} S/. ${habitacion.precio}/noche<br>
      <small>Acompañantes: ${acompanantes.map(a => a.nombre + " (" + a.tipo + ")").join(", ") || "Ninguno"}</small></div>
    <div class="conf-box naranja"><b><span class="material-symbols-outlined">room_service</span> Servicios</b><br>
      Planes: ${PLANES.filter(p => planesSel[p.id]).map(p => p.nombre + " [" + lugarPlan[p.id] + "]").join(", ") || "Ninguno"}<br>
      <small>Extras: ${SERVICIOS.filter(s => servSel[s.id]).map(s => s.nombre).join(", ") || "Ninguno"}</small></div>
    <div class="conf-box total"><small>IGV 18% incluido</small><br><b>Total: S/. ${t.total.toFixed(2)}</b></div>`;
}

// --- Navegación ---
function irAPaso(n) {
  paso = n;
  [1, 2, 3, 4, 5].forEach(i => $("paso" + i).classList.toggle("hidden", i !== paso));
  document.querySelectorAll(".paso").forEach(p => {
    const k = +p.dataset.p;
    p.classList.toggle("activo", k === paso);
    p.classList.toggle("ok", k < paso);
  });
  $("btnPrev").disabled = paso === 1;
  $("btnNext").innerHTML = paso === 5
    ? `Confirmar <span class="material-symbols-outlined">check</span>`
    : `Siguiente <span class="material-symbols-outlined">arrow_forward</span>`;
  if (paso === 5) pintarResumenFinal();
  window.scrollTo({ top: 0, behavior: "smooth" });
}
$("btnNext").onclick = () => {
  if (paso === 1 && !validarPaso1()) return;
  if (paso === 2 && !validarTitular()) { toast("Revisa los campos en rojo."); return; }
  if (paso === 3 && !validarAcomp()) { toast("Revisa los acompañantes."); return; }
  if (paso === 5) return confirmar();
  irAPaso(paso + 1);
};
$("btnPrev").onclick = () => { if (paso > 1) irAPaso(paso - 1); };

function confirmar() {
  const cod = "LX-" + Math.floor(100000 + Math.random() * 900000);
  $("codigo").textContent = cod;
  $("modalDato").textContent = $("tNombre").value + " · " + $("totalTxt").textContent;
  $("modal").classList.remove("hidden");
}
$("btnNueva").onclick = () => {
  $("modal").classList.add("hidden");
  acompanantes = []; pintarAcomp(); irAPaso(1); actualizarResumen();
};
function toast(txt) {
  const t = $("toast");
  t.textContent = txt; t.classList.add("ver");
  setTimeout(() => t.classList.remove("ver"), 3000);
}

// Inicio
pintarHabs(); pintarPaises(); pintarAcomp(); pintarPlanes(); pintarServs();
calcularNoches(); irAPaso(1);
