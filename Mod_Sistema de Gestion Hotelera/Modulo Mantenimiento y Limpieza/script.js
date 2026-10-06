// ===== DATOS DE EJEMPLO POR SUCURSAL (sin backend: solo para la maqueta navegable) =====
// Cada sucursal es un hotel distinto: tiene sus propias habitaciones y sus propios totales.
const branches = {
  'Centro Histórico': {
    total: 42,
    totals: { limpia: 28, sucia: 12, mantenimiento: 2 },
    rooms: [
      { id: '101', type: 'Standard Double',    status: 'limpia',        last: 'Hoy, 09:30 AM' },
      { id: '102', type: 'Standard Double',    status: 'sucia',         last: 'Ayer, 11:00 AM' },
      { id: '205', type: 'Suite Presidencial', status: 'mantenimiento', last: 'Hace 3 días' },
      { id: '310', type: 'Queen Superior',     status: 'limpia',        last: 'Hoy, 10:15 AM' }
    ]
  },
  'Magisterio': {
    total: 36,
    totals: { limpia: 24, sucia: 9, mantenimiento: 3 },
    rooms: [
      { id: '104', type: 'Standard Single',  status: 'limpia',        last: 'Hoy, 08:45 AM' },
      { id: '108', type: 'Doble Superior',   status: 'sucia',         last: 'Ayer, 06:20 PM' },
      { id: '112', type: 'Triple Familiar',  status: 'sucia',         last: 'Ayer, 02:10 PM' },
      { id: '207', type: 'Junior Suite',     status: 'mantenimiento', last: 'Hace 2 días' },
      { id: '301', type: 'Standard Single',  status: 'limpia',        last: 'Hoy, 11:05 AM' }
    ]
  },
  'Pisac': {
    total: 24,
    totals: { limpia: 15, sucia: 7, mantenimiento: 2 },
    rooms: [
      { id: 'A-01', type: 'Cabaña Andina',        status: 'limpia',        last: 'Hoy, 07:50 AM' },
      { id: 'A-03', type: 'Matrimonial Estándar', status: 'sucia',         last: 'Ayer, 04:30 PM' },
      { id: 'B-02', type: 'Suite Valle Sagrado',  status: 'limpia',        last: 'Hoy, 09:10 AM' },
      { id: 'B-05', type: 'Doble Twin',           status: 'mantenimiento', last: 'Hace 5 días' }
    ]
  }
};
// Sucursal activa (desde sesión) — coerente con shared/nav.js
var _ses = JSON.parse(sessionStorage.getItem('luxstay_sesion') || 'null') || {};
var _cur = _ses.sucursal || 'Centro Histórico';
let rooms = branches[_cur].rooms;
let totals = branches[_cur].totals;
let totalRooms = branches[_cur].total;
const labels = { limpia: 'Limpia', sucia: 'Sucia', mantenimiento: 'Mantenimiento' };

const $ = id => document.getElementById(id);

// HU-LM-03: pintar la tabla de habitaciones (aplica búsqueda y filtro de estado)
function renderTable() {
  const q = $('searchInput').value.toLowerCase().trim();
  const f = $('statusFilter').value;
  const list = rooms.filter(r =>
    (f === 'all' || r.status === f) && (r.id.includes(q) || r.type.toLowerCase().includes(q)));

  $('roomsBody').innerHTML = list.length ? list.map(r => `
    <tr class="row-${r.status}">
      <td><span class="room-num">${r.id}</span></td>
      <td>${r.type}</td>
      <td><span class="badge b-${r.status}">${r.status === 'mantenimiento' ? '<span class="ms">build</span>' : ''}${labels[r.status]}</span></td>
      <td>${r.last}</td>
      <td class="actions">
        ${r.status === 'sucia' ? `<button title="Marcar como limpia" onclick="markClean('${r.id}')"><span class="ms">check_circle</span></button>` : ''}
        <button title="Bloquear por mantenimiento" onclick="openModal('${r.id}')"><span class="ms">enhanced_encryption</span></button>
      </td>
    </tr>`).join('') : '<tr><td colspan="5" class="empty">Sin resultados</td></tr>';

  $('kTotal').textContent = totalRooms;
  $('kClean').textContent = totals.limpia;
  $('kDirty').textContent = totals.sucia;
  $('kMaint').textContent = totals.mantenimiento;
}

// HU-LM-03: marcar habitación sucia -> limpia (actualiza los contadores)
function markClean(id) {
  const r = rooms.find(x => x.id === id);
  totals[r.status]--; totals.limpia++;
  r.status = 'limpia'; r.last = 'Hoy, justo ahora';
  renderTable(); toast(`Hab. ${id} marcada como limpia`);
}

// HU-LM-04: modal "Nuevo Bloqueo" (puede abrirse con una habitación preseleccionada)
function openModal(preselect) {
  $('blockRoom').innerHTML = rooms.filter(r => r.status !== 'mantenimiento')
    .map(r => `<option value="${r.id}" ${r.id === preselect ? 'selected' : ''}>Habitación ${r.id} (${r.type})</option>`).join('');
  $('blockReason').value = '';
  $('modalBlock').classList.remove('hidden');
}
const closeModal = () => $('modalBlock').classList.add('hidden');

function confirmBlock() {
  const r = rooms.find(x => x.id === $('blockRoom').value);
  if (!r) return closeModal();
  totals[r.status]--; totals.mantenimiento++;
  r.status = 'mantenimiento';
  closeModal(); renderTable(); toast(`Hab. ${r.id} bloqueada por mantenimiento`);
}

function toast(msg) {
  const t = $('toast'); t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2400);
}

// HU-LM-01: re-render al cambiar de sucursal (click + persistencia gestionados por shared/nav.js)
window.onSucursalChange = function(name){
  var b = branches[name];
  rooms = b.rooms; totals = b.totals; totalRooms = b.total;
  $('searchInput').value = ''; $('statusFilter').value = 'all';
  renderTable();
};

// Eventos de la pantalla
$('searchInput').addEventListener('input', renderTable);
$('statusFilter').addEventListener('change', renderTable);
$('btnFilters').addEventListener('click', () => $('filterPanel').classList.toggle('hidden'));
$('btnNewBlock').addEventListener('click', () => openModal());
$('closeModal').addEventListener('click', closeModal);
$('cancelModal').addEventListener('click', closeModal);
$('confirmBlock').addEventListener('click', confirmBlock);

document.addEventListener('DOMContentLoaded', renderTable);
