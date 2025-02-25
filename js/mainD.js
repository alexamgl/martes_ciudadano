function cargarIncidencias() {
    let token = localStorage.getItem("token"); // Obtener token del usuario

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
            let tbody = document.querySelector(".table-container tbody");
            tbody.innerHTML = ""; // Limpiar la tabla antes de llenarla

            data.incidencias.forEach((incidencia, index) => {
                let fila = document.createElement("tr");

                fila.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${incidencia.folio_cus}</td>
                    <td>${new Date(incidencia.fecha_creacion).toLocaleDateString()}</td>
                    <td>${incidencia.tipo_solicitante}</td>
                    <td>${incidencia.departamento}</td>
                    <td>${incidencia.motivo}</td>
                    <td>${incidencia.estatus}</td>
                    <td>Pendiente de calificación</td>
                `;

                tbody.appendChild(fila);
            });
        } else {
            alert(data.message);
        }
    })
    .catch(error => console.error("Error al obtener incidencias:", error));
}

// 📌 Cargar la tabla cuando la página termine de cargar
document.addEventListener("DOMContentLoaded", cargarIncidencias);

