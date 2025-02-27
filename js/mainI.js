function cargarDetallesIncidencia() {
    let incidencia = JSON.parse(localStorage.getItem("incidenciaSeleccionada"));

    if (!incidencia) {
        alert("No se encontró una incidencia válida.");
        window.location.href = "index.html"; // Redirigir si no hay incidencia almacenada
        return;
    }

    // 📌 Mostrar información en la interfaz
    document.querySelector(".folio-info").innerHTML = `FOLIO: ${incidencia.folio_cus} / CREADO: ${new Date(incidencia.fecha_creacion).toLocaleString()}`;

    document.getElementById("info").innerHTML = `
        <h2>Información</h2>
        <p><strong>Ciudadano:</strong> ${incidencia.nombre} ${incidencia.primer_apellido} ${incidencia.segundo_apellido}</p>
        <p><strong>Departamento:</strong> ${incidencia.departamento}</p>
        <p><strong>Motivo:</strong> ${incidencia.motivo}</p>
        <p><strong>Estatus:</strong> ${incidencia.estatus}</p>
        <p><strong>Comentarios:</strong> ${incidencia.comentarios || "Sin comentarios"}</p>
    `;
}

// 📌 Cargar los datos cuando la página termine de cargar
document.addEventListener("DOMContentLoaded", cargarDetallesIncidencia);
