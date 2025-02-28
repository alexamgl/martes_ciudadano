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

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modalCompartirIncidencia");
    const btnCompartir = document.querySelector(".btn-share");
    const closeModal = document.querySelector(".modal-compartir-close");
    const btnCancelar = document.querySelector(".modal-compartir-btn-cancelar");

    // Mostrar el modal al hacer clic en el botón "Compartir"
    btnCompartir.addEventListener("click", () => {
        modal.style.display = "flex";
    });

    // Cerrar modal al hacer clic en la "X" o en el botón "Cancelar"
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    btnCancelar.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Cerrar modal si el usuario hace clic fuera de él
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modalSeguimiento");
    const btnAbrir = document.querySelector(".btn-comment"); // Botón que abre el modal
    const btnCerrar = document.querySelector(".modal-seguimiento-close");
    const btnCancelar = document.querySelector(".modal-seguimiento-btn-cancelar");

    // Mostrar el modal al hacer clic en "Agregar Comentario"
    btnAbrir.addEventListener("click", () => {
        modal.style.display = "flex";
    });

    // Cerrar modal con la "X" o botón cancelar
    btnCerrar.addEventListener("click", () => {
        modal.style.display = "none";
    });

    btnCancelar.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Cerrar modal si el usuario hace clic fuera del contenido
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modalConcluir");
    const btnAbrir = document.querySelector(".btn-success"); // Botón "Concluido"
    const btnCerrar = document.querySelector(".modal-concluir-close");
    const btnCancelar = document.querySelector(".modal-concluir-btn-cancelar");
    const btnAceptar = document.querySelector(".modal-concluir-btn-aceptar");

    // Mostrar el modal al hacer clic en "Concluido"
    btnAbrir.addEventListener("click", () => {
        modal.style.display = "flex";
    });

    // Cerrar modal con la "X" o botón "Cancelar"
    btnCerrar.addEventListener("click", () => {
        modal.style.display = "none";
    });

    btnCancelar.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Acción al hacer clic en "Aceptar"
    btnAceptar.addEventListener("click", () => {
        alert("Incidente concluido correctamente."); // Aquí puedes agregar la lógica que necesites
        modal.style.display = "none";
    });

    // Cerrar modal si el usuario hace clic fuera del contenido
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const modalNoProcede = document.getElementById("modalNoProcede");
    const btnNoProcede = document.querySelector(".btn-danger"); // Botón "No Procede"
    const btnCerrarNoProcede = document.querySelector(".modal-no-procede-close");
    const btnCancelarNoProcede = document.querySelector(".modal-no-procede-btn-cancelar");
    const btnAceptarNoProcede = document.querySelector(".modal-no-procede-btn-aceptar");

    btnNoProcede.addEventListener("click", () => {
        modalNoProcede.style.display = "flex";
    });

    btnCerrarNoProcede.addEventListener("click", () => {
        modalNoProcede.style.display = "none";
    });

    btnCancelarNoProcede.addEventListener("click", () => {
        modalNoProcede.style.display = "none";
    });

    btnAceptarNoProcede.addEventListener("click", () => {
        alert("Incidente marcado como 'No Procede'.");
        modalNoProcede.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === modalNoProcede) {
            modalNoProcede.style.display = "none";
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const modalReservado = document.getElementById("modalReservado");
    const btnReservado = document.querySelector(".btn-warning"); // Botón "Reservado"
    const btnCerrarReservado = document.querySelector(".modal-reservado-close");
    const btnCancelarReservado = document.querySelector(".modal-reservado-btn-cancelar");
    const btnAceptarReservado = document.querySelector(".modal-reservado-btn-aceptar");

    btnReservado.addEventListener("click", () => {
        modalReservado.style.display = "flex";
    });

    btnCerrarReservado.addEventListener("click", () => {
        modalReservado.style.display = "none";
    });

    btnCancelarReservado.addEventListener("click", () => {
        modalReservado.style.display = "none";
    });

    btnAceptarReservado.addEventListener("click", () => {
        alert("Incidente marcado como 'Reservado'.");
        modalReservado.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === modalReservado) {
            modalReservado.style.display = "none";
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const modalTransferir = document.getElementById("modalTransferir");
    const modalConfirmacion = document.getElementById("modalConfirmacion");

    const btnTransferir = document.querySelector(".btn-transfer"); // Botón de abrir el modal
    const btnCerrarTransferir = document.querySelector(".modal-transferir-close");
    const btnCancelarTransferir = document.querySelector(".modal-transferir-btn-cancelar");
    const btnGuardarTransferir = document.querySelector(".modal-transferir-btn-guardar");
    const btnCerrarConfirmacion = document.querySelector(".modal-confirmacion-btn");

    // Mostrar el modal de transferencia
    btnTransferir.addEventListener("click", () => {
        modalTransferir.style.display = "flex";
    });

    // Cerrar modal de transferencia
    btnCerrarTransferir.addEventListener("click", () => {
        modalTransferir.style.display = "none";
    });

    btnCancelarTransferir.addEventListener("click", () => {
        modalTransferir.style.display = "none";
    });

    // Guardar y mostrar el modal de confirmación
    btnGuardarTransferir.addEventListener("click", () => {
        modalTransferir.style.display = "none";
        modalConfirmacion.style.display = "flex";
    });

    // Cerrar modal de confirmación
    btnCerrarConfirmacion.addEventListener("click", () => {
        modalConfirmacion.style.display = "none";
    });

    // Cerrar modales al hacer clic fuera
    window.addEventListener("click", (event) => {
        if (event.target === modalTransferir) {
            modalTransferir.style.display = "none";
        }
        if (event.target === modalConfirmacion) {
            modalConfirmacion.style.display = "none";
        }
    });
});

//CARGAR EL JSON DINAMICAMENTE

let dataJSON;

document.addEventListener("DOMContentLoaded", async function () {
    await cargarJSON();
    llenarSecretarias();

    document.getElementById("selectSecretaria").addEventListener("change", function () {
        llenarCoordinacionesODirecciones(this.value);
    });

    document.getElementById("selectCoordinacion").addEventListener("change", function () {
        llenarJefaturas(this.value);
    });

    // Control de modales
    const modalTransferir = document.getElementById("modalTransferir");
    const btnTransferir = document.querySelector(".btn-transfer");
    const btnCerrarTransferir = document.querySelector(".modal-transferir-close");
    const btnCancelarTransferir = document.querySelector(".modal-transferir-btn-cancelar");
    const btnGuardarTransferir = document.querySelector(".modal-transferir-btn-guardar");

    btnTransferir.addEventListener("click", () => {
        modalTransferir.style.display = "flex";
    });

    btnCerrarTransferir.addEventListener("click", () => {
        modalTransferir.style.display = "none";
    });

    btnCancelarTransferir.addEventListener("click", () => {
        modalTransferir.style.display = "none";
    });

    btnGuardarTransferir.addEventListener("click", () => {
        alert("Transferencia guardada exitosamente");
        modalTransferir.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === modalTransferir) {
            modalTransferir.style.display = "none";
        }
    });
});

// Cargar JSON externo
async function cargarJSON() {
    try {
        const response = await fetch("secretarias.json");
        dataJSON = await response.json();
    } catch (error) {
        console.error("Error al cargar el JSON:", error);
    }
}

// Llenar el filtro de Secretarías
function llenarSecretarias() {
    const select = document.getElementById("selectSecretaria");
    select.innerHTML = '<option selected disabled>Seleccione una secretaría...</option>';

    dataJSON.secretarias.forEach(secretaria => {
        const option = document.createElement("option");
        option.value = secretaria.nombre;
        option.textContent = secretaria.nombre;
        select.appendChild(option);
    });
}

// Llenar el filtro de Coordinaciones/Direcciones/Subsecretarías
function llenarCoordinacionesODirecciones(secretariaSeleccionada) {
    const selectCoordinacion = document.getElementById("selectCoordinacion");
    const selectJefatura = document.getElementById("selectJefatura");

    selectCoordinacion.innerHTML = '<option selected disabled>Seleccione una coordinación/dirección...</option>';
    selectJefatura.innerHTML = '<option selected disabled>Seleccione una jefatura...</option>';
    selectCoordinacion.disabled = true;
    selectJefatura.disabled = true;

    const secretaria = dataJSON.secretarias.find(s => s.nombre === secretariaSeleccionada);

    if (secretaria) {
        // Agregar Coordinaciones
        if (secretaria.coordinaciones) {
            secretaria.coordinaciones.forEach(coordinacion => {
                const option = document.createElement("option");
                option.value = coordinacion.nombre;
                option.textContent = `${coordinacion.nombre} (Coordinación)`;
                selectCoordinacion.appendChild(option);
            });
        }

        // Agregar Direcciones
        if (secretaria.direcciones) {
            secretaria.direcciones.forEach(direccion => {
                const option = document.createElement("option");
                option.value = direccion.nombre;
                option.textContent = `${direccion.nombre} (Dirección)`;
                selectCoordinacion.appendChild(option);
            });
        }

        // Agregar Subsecretarías
        if (secretaria.subsecretarías) {
            secretaria.subsecretarías.forEach(subsecretaria => {
                const option = document.createElement("option");
                option.value = subsecretaria.nombre;
                option.textContent = `${subsecretaria.nombre} (Subsecretaría)`;
                selectCoordinacion.appendChild(option);
            });
        }

        if (selectCoordinacion.children.length > 1) {
            selectCoordinacion.disabled = false;
        }
    }
}

// Llenar el filtro de Jefaturas
function llenarJefaturas(coordinacionSeleccionada) {
    const select = document.getElementById("selectJefatura");
    select.innerHTML = '<option selected disabled>Seleccione una jefatura...</option>';
    select.disabled = true;

    const secretaria = dataJSON.secretarias.find(s => s.nombre === document.getElementById("selectSecretaria").value);

    let elementoSeleccionado = null;

    if (secretaria) {
        // Buscar en Coordinaciones
        if (secretaria.coordinaciones) {
            elementoSeleccionado = secretaria.coordinaciones.find(c => c.nombre === coordinacionSeleccionada);
        }
        // Buscar en Direcciones
        if (!elementoSeleccionado && secretaria.direcciones) {
            elementoSeleccionado = secretaria.direcciones.find(d => d.nombre === coordinacionSeleccionada);
        }
        // Buscar en Subsecretarías
        if (!elementoSeleccionado && secretaria.subsecretarías) {
            elementoSeleccionado = secretaria.subsecretarías.find(sub => sub.nombre === coordinacionSeleccionada);
        }

        // Si tiene Jefaturas, las agregamos
        if (elementoSeleccionado && elementoSeleccionado.jefaturas) {
            elementoSeleccionado.jefaturas.forEach(jefatura => {
                const option = document.createElement("option");
                option.value = jefatura;
                option.textContent = jefatura;
                select.appendChild(option);
            });
            select.disabled = false;
        }
    }
}

