let incidenciasGlobal = []; // Variable global para almacenar los registros

function cargarIncidencias() {
    let token = localStorage.getItem("token");

    if (!token) {
        alert("No tienes una sesión activa. Inicia sesión nuevamente.");
        return;
    }

    fetch("https://sanjuandelrio.gob.mx/tramites-sjr/Api/principal/obtener_incidencias", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                incidenciasGlobal = data.incidencias;
                console.log("Datos cargados:", incidenciasGlobal.length); // Verificar cuántos registros se cargan
                renderizarTabla(incidenciasGlobal);
            } else {
                alert(data.message);
            }
        })
        .catch(error => console.error("Error al obtener incidencias:", error));
}

document.addEventListener("DOMContentLoaded", cargarIncidencias);


// 📌 Cargar la tabla cuando la página termine de cargar
document.addEventListener("DOMContentLoaded", cargarIncidencias);

function renderizarTabla(incidencias) {
    let tbody = document.querySelector(".table-container tbody");
    tbody.innerHTML = ""; // Limpiar la tabla antes de llenarla

    incidencias.forEach((incidencia, index) => {
        let ciudadano = incidencia.nombre ? `${incidencia.nombre} ${incidencia.primer_apellido} ${incidencia.segundo_apellido}` : "No registrado";

        let fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${index + 1}</td>
            <td>${incidencia.folio_cus}</td>
            <td>${new Date(incidencia.fecha_creacion).toLocaleDateString()}</td>
            <td>${ciudadano}</td>
            <td>${incidencia.departamento}</td>
            <td>${incidencia.motivo}</td>
            <td>${incidencia.estatus}</td>
            <td>Pendiente de calificación</td>
        `;

        // 📌 Guardar la incidencia en localStorage y redirigir
        fila.addEventListener("click", () => {
            localStorage.setItem("incidenciaSeleccionada", JSON.stringify(incidencia)); // Guardar datos
            window.location.href = "detalle_folio.html"; // Redirigir sin usar la URL
        });

        tbody.appendChild(fila);
    });
}


function filtrarIncidencias() {
    console.log("Filtrando incidencias...");

    let estatusSeleccionado = document.querySelector(".filter-btn.selected")?.textContent.trim() || "";
    let secretaria = document.getElementById("secretaria").value.trim();
    let origen = document.getElementById("origenFilter").value.trim();
    let motivo = document.getElementById("motivoFilter").value.trim();
    let departamento = document.getElementById("jefatura").value.trim();
    let coordinacion = document.getElementById("coordinacion").value.trim(); // Nuevo filtro
    let nombreFilter = document.getElementById("nombreTelefonoFilter").value.trim().toLowerCase();
    let apellidoPaternoFilter = document.getElementById("apellidoPaternoFilter").value.trim().toLowerCase();
    let apellidoMaternoFilter = document.getElementById("apellidoMaternoFilter").value.trim().toLowerCase();
    let fechaInicio = document.getElementById("fechaInicioFilter").value;
    let fechaFin = document.getElementById("fechaFinFilter").value;

    let registrosMaximos = document.getElementById("registrosFilter").value;
    let limiteRegistros = registrosMaximos.includes("100") ? 100 :
                          registrosMaximos.includes("200") ? 200 :
                          registrosMaximos.includes("400") ? 400 :
                          incidenciasGlobal.length;

    console.log("Estatus:", estatusSeleccionado);
    console.log("Secretaría:", secretaria);
    console.log("Coordinación:", coordinacion);
    console.log("Origen:", origen);
    console.log("Motivo:", motivo);
    console.log("Departamento:", departamento);
    console.log("Nombre:", nombreFilter);
    console.log("Apellido Paterno:", apellidoPaternoFilter);
    console.log("Apellido Materno:", apellidoMaternoFilter);
    console.log("Fecha Inicio:", fechaInicio);
    console.log("Fecha Fin:", fechaFin);

    let incidenciasFiltradas = incidenciasGlobal.filter(incidencia => {
        let fechaIncidencia = new Date(incidencia.fecha_creacion).toISOString().split('T')[0];

        let nombreCompleto = `${incidencia.nombre ?? ""} ${incidencia.primer_apellido ?? ""} ${incidencia.segundo_apellido ?? ""}`.trim().toLowerCase();

        return (
            (estatusSeleccionado === "" || incidencia.estatus.toLowerCase().includes(estatusSeleccionado.toLowerCase())) &&
            (secretaria === "" || incidencia.secretaria?.toLowerCase() === secretaria.toLowerCase()) &&
            (coordinacion === "" || incidencia.coordinacion?.toLowerCase() === coordinacion.toLowerCase()) && // Nuevo filtro de Coordinación
            (origen === "Orígen..." || incidencia.origen?.toLowerCase() === origen.toLowerCase()) &&
            (motivo === "Motivos..." || incidencia.motivo?.toLowerCase() === motivo.toLowerCase()) &&
            (departamento === "" || incidencia.departamento?.toLowerCase() === departamento.toLowerCase()) &&
            (nombreFilter === "" || (incidencia.nombre?.toLowerCase() || "").includes(nombreFilter)) &&
            (apellidoPaternoFilter === "" || (incidencia.primer_apellido?.toLowerCase() || "").includes(apellidoPaternoFilter)) &&
            (apellidoMaternoFilter === "" || (incidencia.segundo_apellido?.toLowerCase() || "").includes(apellidoMaternoFilter)) &&
            (!fechaInicio || !fechaFin || (fechaIncidencia >= fechaInicio && fechaIncidencia <= fechaFin))
        );
    });

    console.log("Incidencias Filtradas:", incidenciasFiltradas.length);
    
    renderizarTabla(incidenciasFiltradas.slice(0, limiteRegistros));
}

document.getElementById("secretaria").addEventListener("change", filtrarIncidencias);
document.getElementById("origenFilter").addEventListener("change", filtrarIncidencias);
document.getElementById("motivoFilter").addEventListener("change", filtrarIncidencias);
document.getElementById("jefatura").addEventListener("change", filtrarIncidencias);
document.getElementById("nombreTelefonoFilter").addEventListener("input", filtrarIncidencias);
document.getElementById("apellidoPaternoFilter").addEventListener("input", filtrarIncidencias);
document.getElementById("apellidoMaternoFilter").addEventListener("input", filtrarIncidencias);
document.getElementById("fechaInicioFilter").addEventListener("change", filtrarIncidencias);
document.getElementById("fechaFinFilter").addEventListener("change", filtrarIncidencias);
document.getElementById("registrosFilter").addEventListener("change", filtrarIncidencias);
document.getElementById("coordinacion").addEventListener("change", filtrarIncidencias);


// 📌 Lógica para seleccionar el estatus
document.querySelectorAll(".filter-btn").forEach(button => {
    button.addEventListener("click", function () {
        document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("selected"));
        this.classList.add("selected");
        filtrarIncidencias();
    });
});
