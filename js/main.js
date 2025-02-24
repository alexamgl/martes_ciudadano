document.getElementById("btnBuscar").addEventListener("click", function () {
    let folioUsuario = document.getElementById("inputFolio").value.trim(); // Obtener el folio ingresado sin espacios extra
    let token = localStorage.getItem("token"); // Obtener el token almacenado

    if (!folioUsuario) {
        alert("Por favor, ingrese un folio.");
        return;
    }

    if (!token) {
        alert("No tienes una sesión activa. Inicia sesión nuevamente.");
        return;
    }

    let folioCompleto = `CUS-${folioUsuario}`; // Agregar el prefijo automáticamente

    fetch("https://sanjuandelrio.gob.mx/tramites-sjr/Api/principal/buscar_ciudadano", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // Se obtiene el token desde localStorage
        },
        body: JSON.stringify({ folio: folioCompleto }) // Se envía el folio con el prefijo
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById("nombre").value = data.nombre;
                document.getElementById("apellidoPaterno").value = data.primer_apellido;
                document.getElementById("apellidoMaterno").value = data.segundo_apellido;
                document.getElementById("telefono").value = data.telefono;
                document.getElementById("correo").value = data.email;
            } else {
                alert(data.message);
            }
        })
        .catch(error => console.error("Error al buscar ciudadano:", error));
});

$.ajax({
    url: 'http://localhost/sec_particular/martes_ciudadano/php/proxy.php', // O la URL de tu servidor proxy
    method: 'GET',
    success: function(response) {

        // Validar si la API respondió correctamente
        if (response.error || !response.colonias) {
            console.error("Error en la respuesta de la API:", response.message);
            return;
        }

        let colonias = response.colonias; // ✅ Acceder correctamente a las colonias
        let selectData = [];

        // Recorrer cada colonia y formatear los datos para Select2
        colonias.forEach(colonia => {
            selectData.push({
                id: colonia.CP, // Código Postal como ID
                text: `${colonia.COLONIA} (${colonia.CP})` // Nombre + CP en el select
            });
        });

        // Inicializar Select2 con la lista de colonias
        $('#colonias').select2({
            data: selectData,
            placeholder: "Selecciona una colonia...",
            allowClear: true
        });
    },
    error: function(xhr, status, error) {
        console.error("Error al obtener las colonias:", error);
    }
});

document.querySelector(".btn-create").addEventListener("click", function() {
    let folioUsuario = document.getElementById("inputFolio").value.trim();
    let token = localStorage.getItem("token"); // Obtener token

    if (!folioUsuario) {
        alert("Por favor, ingrese un folio.");
        return;
    }

    if (!token) {
        alert("No tienes una sesión activa. Inicia sesión nuevamente.");
        return;
    }

    let folio_cus = `CUS-${folioUsuario}`;

    let data = {
        folio_cus: folio_cus,
        tipo_solicitante: document.getElementById("tipo_solicitante").value,
        origen: document.getElementById("origen").value,
        motivo: document.getElementById("motivo").value,
        secretaria: document.getElementById("secretaria").value,
        coordinacion: document.getElementById("coordinacion").value,
        departamento: document.getElementById("jefatura").value,
        tipo_incidencia: document.getElementById("tipo_incidencia").value,
        colonia: document.getElementById("colonias").value,
        direccion: document.querySelector("input[placeholder='Ingrese dirección']").value,
        referencia: document.querySelector("input[placeholder='Ingrese referencia']").value,
        comentarios: document.querySelector("textarea[placeholder='Ingrese comentarios']").value
    };

    fetch("https://sanjuandelrio.gob.mx/tramites-sjr/Api/principal/crear_incidencia", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.success) location.reload();
    })
    .catch(error => console.error("Error al crear incidencia:", error));
});
