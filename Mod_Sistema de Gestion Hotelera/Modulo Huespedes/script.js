// ===== DATOS DE EJEMPLO POR SUCURSAL (sin backend: solo para la maqueta navegable) =====
// Cada sucursal es un hotel distinto con sus propios huéspedes e indicadores.
// Fila: [nombre, etiqueta, correo, documento, país, habitación, tipo, entrada, hora, salida, hora, estado, acompañantes]
// Estados: inhouse | outtoday | pending | done
const DATA = {
  'Centro Histórico': {
    active: 142,
    k: { inh: [48, 60, 80], ci: [14, 9, 5], co: [11, 7, 4], vip: [6, 100] },
    rows: [
      ['Carlos Mendoza Rivera', 'VIP Platinum', 'mendoza.c@latampartners.com', 'PAS P-8839210', 'España', 'Suite #501', 'Presidencial Imperial', '12 Oct 2026', '14:20 hrs', '18 Oct 2026', '12:00 hrs', 'inhouse'],
      ['Dra. Valeria Ramos', 'Frecuente', 'v.ramos@medinvest.org', 'DNI 45678912', 'Perú', 'Suite #402', 'Ejecutiva Panorámica', '14 Oct 2026', '11:15 hrs', 'Hoy, 15 Oct', '11:00 hrs', 'outtoday'],
      ['Juan Carlos Gómez', 'Directo Web', 'jc.gomez@andalucia.es', 'PAS AB-892102', 'España', 'Hab. #304', 'Chalet Garden Colonial', '13 Oct 2026', '16:45 hrs', '19 Oct 2026', '12:00 hrs', 'inhouse'],
      ['Martín García (Tech Latam)', 'Corporativo', 'm.garcia@techlatam.io', 'RUC 20601992811', 'PAS AR-449102', 'Bloque #201 - #204', 'Suites Ejecutivas Dobles', 'Hoy, 15 Oct', 'Prog. 15:30 hrs', '22 Oct 2026', '11:00 hrs', 'pending', 4],
      ['Sophie Dubois', 'VIP Gold', 's.dubois@parislux.fr', 'PAS 19FRA8820', 'Francia', 'Penthouse #601', 'Sky View Terraza', '11 Oct 2026', '18:10 hrs', '17 Oct 2026', '12:00 hrs', 'inhouse'],
      ['Kenji Tanaka', 'Agencia / OTA', 'tanaka.k@kyoto-arts.jp', 'PAS TK-990142', 'Japón', 'Hab. #108', 'Standard King Courtyard', '08 Oct 2026', '13:40 hrs', '14 Oct 2026', 'Salida 10:15 hrs', 'done'],
      ['Ana María Benavides', 'Directo Tel', 'anabenavides@consulting.pe', 'DNI 18294821', 'Perú', 'Hab. #203', 'Standard Twin Balcony', '14 Oct 2026', '15:00 hrs', '16 Oct 2026', '11:00 hrs', 'inhouse'],
      ['Alessandro Conti', 'Booking.com', 'a.conti@milano-design.it', 'PAS IT-820199', 'Italia', 'Hab. #105', 'Standard King Classic', 'Hoy, 15 Oct', 'Est. 19:00 hrs', '20 Oct 2026', '11:00 hrs', 'pending']
    ]
  },
  'Magisterio': {
    active: 87,
    k: { inh: [31, 45, 69], ci: [9, 6, 3], co: [8, 5, 3], vip: [3, 100] },
    rows: [
      ['Lucía Fernández Paredes', 'Frecuente', 'lucia.fernandez@gmail.com', 'DNI 41237788', 'Perú', 'Hab. #204', 'Boutique Deluxe', '13 Oct 2026', '15:10 hrs', '16 Oct 2026', '11:00 hrs', 'inhouse'],
      ['Thomas Becker', 'Directo Web', 't.becker@web.de', 'PAS C4X8821Z', 'Alemania', 'Suite #301', 'Junior Suite Vista Plaza', '12 Oct 2026', '13:40 hrs', 'Hoy, 15 Oct', '11:00 hrs', 'outtoday'],
      ['Rosa Elena Huamán', 'Corporativo', 'rhuaman@minera-andes.pe', 'RUC 20556781234', 'Perú', 'Hab. #108', 'Standard Queen', 'Hoy, 15 Oct', 'Prog. 14:00 hrs', '18 Oct 2026', '11:00 hrs', 'pending', 2],
      ['Hiroshi Sato', 'Agencia / OTA', 'h.sato@tokyo-travel.jp', 'PAS TR-5521098', 'Japón', 'Hab. #112', 'Doble Twin Boutique', '14 Oct 2026', '16:20 hrs', '17 Oct 2026', '11:00 hrs', 'inhouse'],
      ['Camila Torres Quispe', 'Directo Tel', 'camila.torres@outlook.com', 'DNI 70451239', 'Perú', 'Hab. #206', 'Boutique Deluxe', '09 Oct 2026', '12:30 hrs', '13 Oct 2026', 'Salida 10:40 hrs', 'done'],
      ['Ethan Walker', 'VIP Gold', 'ethan.walker@wlk-capital.com', 'PAS 53281749', 'EE. UU.', 'Suite #302', 'Suite Balcón Catedral', '11 Oct 2026', '17:05 hrs', '19 Oct 2026', '12:00 hrs', 'inhouse']
    ]
  },
  'Pisac': {
    active: 54,
    k: { inh: [19, 28, 68], ci: [6, 4, 2], co: [5, 3, 2], vip: [2, 100] },
    rows: [
      ['Mariana Cusi Condori', 'Directo Tel', 'mariana.cusi@gmail.com', 'DNI 44872110', 'Perú', 'Cabaña #A-01', 'Cabaña Andina', '13 Oct 2026', '14:30 hrs', '16 Oct 2026', '11:00 hrs', 'inhouse'],
      ['Olivier Laurent', 'Booking.com', 'o.laurent@laposte.fr', 'PAS 19FR77261', 'Francia', 'Suite #B-02', 'Suite Valle Sagrado', '12 Oct 2026', '16:00 hrs', 'Hoy, 15 Oct', '11:00 hrs', 'outtoday'],
      ['Grace Miller', 'VIP Platinum', 'grace.miller@millerfam.com', 'PAS 58829104', 'EE. UU.', 'Cabaña #A-04', 'Cabaña Familiar Mirador', 'Hoy, 15 Oct', 'Prog. 17:30 hrs', '21 Oct 2026', '12:00 hrs', 'pending', 5],
      ['Diego Ramírez Soto', 'Agencia / OTA', 'd.ramirez@andeantrails.pe', 'DNI 40118923', 'Perú', 'Hab. #B-05', 'Doble Twin', '10 Oct 2026', '11:45 hrs', '14 Oct 2026', 'Salida 09:50 hrs', 'done'],
      ['Ingrid Svensson', 'Directo Web', 'ingrid.s@telia.se', 'PAS SE-7740219', 'Suecia', 'Hab. #A-03', 'Matrimonial Estándar', '14 Oct 2026', '15:15 hrs', '18 Oct 2026', '11:00 hrs', 'inhouse']
    ]
  }
};
// Convierte cada fila (arreglo) en objeto para trabajar más cómodo
const toObj = a => ({ name: a[0], tag: a[1], mail: a[2], doc: a[3], pais: a[4], room: a[5], rtype: a[6], inD: a[7], inT: a[8], outD: a[9], outT: a[10], st: a[11], pax: a[12] || 0 });
Object.values(DATA).forEach(b => b.rows = b.rows.map(toObj));

const STATUS = { inhouse: ['In-House', 'p-green'], outtoday: ['Check-out Hoy', 'p-orange'], pending: ['Check-in Pendiente', 'p-blue'], done: ['Completado', 'p-gray'] };
const $ = id => document.getElementById(id);
let branch = ((JSON.parse(sessionStorage.getItem('luxstay_sesion') || 'null') || {}).sucursal) || 'Centro Histórico';
let vipOn = false, paxOn = false;

// Iniciales (sin foto): "Dra. Valeria Ramos" -> VR, ignora títulos y paréntesis
const initials = n => {
  const w = n.replace(/\(.*?\)/g, '').replace(/^(Dra?|Sra?)\.\s*/, '').trim().split(/\s+/);
  return (w[0][0] + w[w.length - 1][0]).toUpperCase();
};
const roomIcon = r => r.startsWith('Suite') ? 'king_bed' : r.startsWith('Bloque') ? 'apartment' : r.startsWith('Penthouse') ? 'location_city' : r.startsWith('Cabaña') ? 'cottage' : 'bed';

// HU-GU-02: tarjetas de indicadores de la sucursal activa
function renderKpis() {
  const { inh, ci, co, vip } = DATA[branch].k;
  const cards = [
    ['kpi-clean', 'Huéspedes In-House', 'bed', inh[0], `/ ${inh[1]} pax cap.`, `<b><span class="ms" style="font-size:14px;vertical-align:middle">trending_up</span>${inh[2]}%</b> Ocupación actual de camas`, inh[2]],
    ['kpi-blue', 'Check-in hoy', 'flight_land', ci[0], 'esperados', `<b>${ci[1]} arribados</b> · ${ci[2]} en tránsito`, ci[1] / ci[0] * 100],
    ['kpi-maint', 'Check-out hoy', 'flight_takeoff', co[0], 'previstos', `<b>${co[1]} liberadas</b> · ${co[2]} pendientes`, co[1] / co[0] * 100],
    ['kpi-total', 'Huéspedes VIP', 'star', vip[0], 'en estancia', `<b>Amenities ${vip[1]}%</b> atendidos hoy`, vip[1]]
  ];
  $('kpiGrid').innerHTML = cards.map(c => `
    <div class="kpi kpi-g ${c[0]}">
      <span class="kpi-label"><span>${c[1]}</span><span class="ms">${c[2]}</span></span>
      <div class="num"><strong>${c[3]}</strong><small>${c[4]}</small></div>
      <div class="kpi-sub">${c[5]}</div>
      <div class="bar"><i style="width:${c[6]}%"></i></div>
    </div>`).join('');
}

// HU-GU-03 / HU-GU-04: tabla con búsqueda y filtros
function renderTable() {
  const b = DATA[branch], q = $('searchInput').value.toLowerCase().trim();
  const fs = $('fState').value, fr = $('fRoom').value;
  const list = b.rows.map((g, i) => ({ g, i })).filter(({ g }) => {
    const room = fr === 'all' || (fr === 's' && g.room.startsWith('Suite')) || (fr === 'h' && g.room.startsWith('Hab.')) || (fr === 'o' && !g.room.startsWith('Suite') && !g.room.startsWith('Hab.'));
    const txt = [g.name, g.mail, g.doc, g.room].join(' ').toLowerCase().includes(q);
    return room && txt && (fs === 'all' || g.st === fs) && (!vipOn || g.tag.startsWith('VIP')) && (!paxOn || g.pax);
  });

  $('guestsBody').innerHTML = list.length ? list.map(({ g, i }, n) => {
    const warn = g.outD.startsWith('Hoy') ? 'warn' : '';
    const acts = {
      inhouse: '<button class="ic" title="Ver ficha"><span class="ms">badge</span></button><button class="ic" title="Ver cuenta"><span class="ms">receipt_long</span></button>',
      outtoday: `<button class="btn-mini green" onclick="act(${i})">Hacer Out</button>`,
      pending: `<button class="btn-mini navy" onclick="act(${i})">Check-in</button>`,
      done: '<button class="ic" title="Historial"><span class="ms">history</span></button>'
    }[g.st];
    return `<tr>
      <td><div class="guest"><span class="gav av${n % 3}">${initials(g.name)}</span><div>
        <div class="gname">${g.name} <span class="tag ${g.tag.startsWith('VIP') ? 'tag-vip' : ''}">${g.tag}</span></div>
        <div class="gmail">${g.mail}${g.pax ? ` • (${g.pax} pax)` : ''}</div></div></div></td>
      <td><div class="doc">${g.doc}</div><div class="sub">${g.pais}</div></td>
      <td><div class="room-chip"><span class="ms">${roomIcon(g.room)}</span><div><b>${g.room}</b><span>${g.rtype}</span></div></div></td>
      <td><div class="mono">${g.inD}</div><div class="sub">${g.inT}</div></td>
      <td><div class="mono ${warn}">${g.outD}</div><div class="sub ${warn}">${g.outT}</div></td>
      <td><span class="pill ${STATUS[g.st][1]}">${STATUS[g.st][0]}</span></td>
      <td class="actions">${acts}<button class="ic" title="Más opciones"><span class="ms">more_vert</span></button></td>
    </tr>`;
  }).join('') : '<tr><td colspan="7" class="empty">Sin resultados</td></tr>';

  // Pie de tabla: contador y paginación (visual)
  const pages = Math.ceil(b.active / 8);
  $('footInfo').innerHTML = `Mostrando <b>1</b> a <b>${list.length}</b> de <b>${b.active}</b> huéspedes registrados`;
  $('pager').innerHTML = `<span class="dim">‹ Anterior</span><span class="pg on">1</span><span class="pg">2</span><span class="pg">3</span><span class="dim">…</span><span class="pg">${pages}</span><span>Siguiente ›</span>`;
}

// HU-GU-05: Check-in (pendiente -> in-house) y Check-out (sale -> completado)
function act(i) {
  const g = DATA[branch].rows[i];
  g.st = g.st === 'pending' ? 'inhouse' : 'done';
  toast(g.st === 'inhouse' ? `Check-in registrado: ${g.name}` : `Check-out realizado: ${g.name}`);
  renderTable();
}

function loadBranch(name) {
  branch = name;
  $('activeBadge').textContent = DATA[name].active + ' Activos';
  clearFilters(false);
  renderKpis(); renderTable();
}
function clearFilters(redraw = true) {
  $('searchInput').value = ''; $('fState').value = 'all'; $('fRoom').value = 'all';
  vipOn = paxOn = false;
  $('chipVip').classList.remove('on'); $('chipPax').classList.remove('on');
  if (redraw) renderTable();
}
function toast(msg) {
  const t = $('toast'); t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2400);
}

// Cambio de sucursal: nav.js persiste + delega a loadBranch
window.onSucursalChange = function(name){ loadBranch(name); };
['searchInput', 'fState', 'fRoom'].forEach(id => $(id).addEventListener('input', renderTable));
$('chipVip').addEventListener('click', e => { vipOn = !vipOn; e.currentTarget.classList.toggle('on', vipOn); renderTable(); });
$('chipPax').addEventListener('click', e => { paxOn = !paxOn; e.currentTarget.classList.toggle('on', paxOn); renderTable(); });
$('btnClear').addEventListener('click', () => clearFilters());
$('btnNew').addEventListener('click', () => toast('Formulario de nuevo huésped (HU-GU-06) - pendiente'));
$('btnExport').addEventListener('click', () => toast('Exportando directorio... (maqueta)'));

document.addEventListener('DOMContentLoaded', () => loadBranch(branch));
