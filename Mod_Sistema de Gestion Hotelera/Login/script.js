// Login: entra con cualquier valor (sin backend)
let sucursal = "Centro Histórico";

// 1. Elegir sucursal
document.querySelectorAll(".btn-suc").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".btn-suc").forEach(b => b.classList.remove("activo"));
    btn.classList.add("activo");
    sucursal = btn.dataset.suc;
  };
});

// 2. Ver clave (icono SVG, sin emojis)
document.getElementById("verClave").onclick = () => {
  const c = document.getElementById("clave");
  c.type = c.type === "password" ? "text" : "password";
};

// 3. Entrar
function entrar() {
  const u = document.getElementById("usuario");
  const c = document.getElementById("clave");
  let ok = true;
  ok = validarMinimo(u, "msgUsuario", "Escribe tu usuario (mín. 4 letras).") && ok;
  ok = validarMinimo(c, "msgClave", "Escribe tu clave (mín. 4 caracteres).") && ok;
  if (!ok) return;
  sessionStorage.setItem("luxstay_sesion", JSON.stringify({
    usuario: u.value.trim(), sucursal: sucursal, fecha: Date.now()
  }));
  location.href = "../Menu Principal/index.html";
}

// Marca el borde en rojo si falta
function validarMinimo(input, msgId, texto) {
  const box = input.closest(".input-ico");
  const msg = document.getElementById(msgId);
  if (input.value.trim().length < 4) {
    box.classList.add("error");
    msg.textContent = texto;
    return false;
  }
  box.classList.remove("error");
  msg.textContent = "";
  return true;
}

document.getElementById("btnEntrar").onclick = entrar;
document.addEventListener("keydown", e => { if (e.key === "Enter") entrar(); });
