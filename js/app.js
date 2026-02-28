const form = document.getElementById("formAsistencia");
const tabla = document.getElementById("tablaCuerpo");
const toggle = document.getElementById("darkToggle");

let registros = JSON.parse(localStorage.getItem("asistencia")) || [];

// ============= MODO OSCURO =============
toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    toggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// ============= GUARDAR REGISTRO =============
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
        docente: document.getElementById("docente").value,
        fecha: document.getElementById("fecha").value,
        hora: document.getElementById("hora").value,
        estado: document.getElementById("estado").value
    };

    registros.push(data);
    localStorage.setItem("asistencia", JSON.stringify(registros));

    form.reset();
    cargarTabla();
});

// ============= ELIMINAR REGISTRO =============
function eliminarRegistro(index) {
    registros.splice(index, 1);
    localStorage.setItem("asistencia", JSON.stringify(registros));
    cargarTabla();
}

// ============= CARGAR TABLA =============
function cargarTabla() {
    tabla.innerHTML = "";

    registros.forEach((r, i) => {
        tabla.innerHTML += `
            <tr>
                <td>${r.docente}</td>
                <td>${r.fecha}</td>
                <td>${r.hora}</td>
                <td class="estado-${r.estado.toLowerCase()}">${r.estado}</td>
                <td>
                    <button class="delete-btn" onclick="eliminarRegistro(${i})">
                        Eliminar
                    </button>
                </td>
            </tr>
        `;
    });
}

cargarTabla();
