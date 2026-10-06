/* shared/nav.js — LuxStay PMS: comportamiento estándar del menú lateral y la barra superior.
   Incluir al FINAL de <body>, en este orden:
     <script src="https://unpkg.com/lucide@latest"></script>
     <script src="../shared/nav.js"></script>
     <script>window.MODULE_ID = "XX";</script>
     <script src="script.js"></script>
   El HTML ya contiene el markup estático estándar (.sidebar + .topbar) con los IDs:
   UserNameTopbar, AvatarInitials, #branchTabs/.tab[data-suc], .branch-title,
   #searchInput (contenido), #btnLogoutDash. */
window.MODULE_ID = window.MODULE_ID || "disponibilidad";

(function () {
  "use strict";
  // 0) Guardia de sesión (coherente con Login / Menú Principal)
  var sesion = JSON.parse(sessionStorage.getItem("luxstay_sesion") || "null");
  if (!sesion) { location.href = "../Login/index.html"; return; }

  // 1) Sucursal interactiva (branch-tabs) sincronizada con la sesión
  function syncBranch() {
    var tabs = document.querySelectorAll("#branchTabs .tab");
    tabs.forEach(function (t) {
      t.classList.toggle("active", t.dataset.suc === sesion.sucursal);
    });
    var b = document.getElementById("BranchName");
    if (b) b.textContent = sesion.sucursal;
  }
  var btnTabs = document.getElementById("branchTabs");
  if (btnTabs) btnTabs.addEventListener("click", function (e) {
    var t = e.target.closest(".tab");
    if (!t) return;
    sesion.sucursal = t.dataset.suc;
    sessionStorage.setItem("luxstay_sesion", JSON.stringify(sesion));
    syncBranch();
    if (typeof window.onSucursalChange === "function") {
      window.onSucursalChange(t.dataset.suc);
    } else {
      location.reload();
    }
  });

  // 2) Rellenar la barra superior con la sesión iniciada
  function fillTopbar() {
    var u = document.getElementById("UserNameTopbar");
    var a = document.getElementById("AvatarInitials");
    if (u) u.textContent = sesion.usuario;
    if (a) {
      var init = (sesion.usuario || "").split(" ").map(function (p) {
        return p.charAt(0);
      }).join("").toUpperCase().slice(0, 2);
      a.textContent = init || "CM";
    }
    syncBranch();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fillTopbar);
  } else {
    fillTopbar();
  }

  // 3) Cerrar sesión desde la barra superior
  var out = document.getElementById("btnLogoutDash");
  if (out) out.onclick = function () {
    sessionStorage.removeItem("luxstay_sesion");
    location.href = "../Login/index.html";
  };

  if (window.lucide) lucide.createIcons();
})();
