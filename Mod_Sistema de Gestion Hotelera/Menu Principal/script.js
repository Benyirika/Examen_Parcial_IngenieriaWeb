// Menú: sesión, reloj, sucursal y accesos
const sesion = JSON.parse(sessionStorage.getItem("luxstay_sesion") || "null");
if (!sesion) location.href = "../Login/index.html";

// Saludo y sucursal guardada
if (sesion) {
  document.getElementById("saludo").textContent = sesion.usuario;
  document.getElementById("comboSucursal").value = sesion.sucursal;
  document.getElementById("sucursalTxt").textContent = "Sucursal " + sesion.sucursal;
}

// Reloj + fecha de hoy
function reloj() {
  const h = new Date();
  const pill = h.toLocaleDateString("es-PE", { day: "numeric", month: "long", year: "numeric" });
  document.getElementById("livePill").textContent = "Sistema en línea • " + pill + " • " + h.toLocaleTimeString("es-PE");
  document.getElementById("reloj").textContent = h.toLocaleString("es-PE");
}
setInterval(reloj, 1000); reloj();

// Cambiar sucursal (se guarda)
document.getElementById("comboSucursal").onchange = e => {
  sesion.sucursal = e.target.value;
  sessionStorage.setItem("luxstay_sesion", JSON.stringify(sesion));
  document.getElementById("sucursalTxt").textContent = "Sucursal " + sesion.sucursal;
};
document.getElementById("btnCambiar").onclick = () => document.getElementById("comboSucursal").focus();

// Solo Nueva Reserva está activa
document.querySelectorAll(".card-modulo[data-ruta]").forEach(c => {
  c.onclick = () => location.href = c.dataset.ruta;
});

// Salir
document.getElementById("btnSalir").onclick = () => {
  sessionStorage.removeItem("luxstay_sesion");
  location.href = "../Login/index.html";
};
