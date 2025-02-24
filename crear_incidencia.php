<?php
header("Content-Type: application/json");
require "config.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!$data) {
        echo json_encode(["error" => "No se enviaron datos"]);
        exit;
    }

    // Obtener datos correctamente desde el JSON recibido
    $folio_cus = $data["folio_cus"] ?? null;
    $tipo_solicitante = $data["tipo_solicitante"] ?? null;
    $origen = $data["origen"] ?? null;
    $motivo = $data["motivo"] ?? null;
    $secretaria = $data["secretaria"] ?? null;
    $coordinacion = $data["coordinacion"] ?? null;
    $departamento = $data["departamento"] ?? null;
    $tipo_incidencia = $data["tipo_incidencia"] ?? null;
    $colonia = $data["colonia"] ?? null;
    $direccion = $data["direccion"] ?? null;
    $referencia = $data["referencia"] ?? null;
    $comentarios = $data["comentarios"] ?? null;

    // Verificar si faltan campos obligatorios
    if (!$folio_cus || !$tipo_solicitante || !$origen || !$motivo || !$secretaria || !$tipo_incidencia || !$comentarios) {
        echo json_encode(["error" => "Faltan campos obligatorios"]);
        exit;
    }

    try {
        // Mostrar los datos que se están enviando para depuración
        error_log("Datos recibidos:");
        error_log(print_r($data, true));

        // Consulta SQL con columnas correctamente asignadas
        $stmt = $pdo->prepare("INSERT INTO nueva_incidencia (folio_cus, tipo_solicitante, origen, motivo, secretaria, 
            coordinacion, departamento, tipo_incidencia, colonia, direccion, referencia, comentarios, fecha_creacion) 
            VALUES (:folio_cus, :tipo_solicitante, :origen, :motivo, :secretaria, :coordinacion, :departamento, 
            :tipo_incidencia, :colonia, :direccion, :referencia, :comentarios, NOW())");

        // Ejecutar la consulta con los valores correctos
        $stmt->execute([
            ":folio_cus" => $folio_cus,
            ":tipo_solicitante" => $tipo_solicitante,
            ":origen" => $origen,
            ":motivo" => $motivo,
            ":secretaria" => $secretaria,
            ":coordinacion" => $coordinacion,
            ":departamento" => $departamento,
            ":tipo_incidencia" => $tipo_incidencia,
            ":colonia" => $colonia,
            ":direccion" => $direccion,
            ":referencia" => $referencia,
            ":comentarios" => $comentarios
        ]);

        echo json_encode(["success" => "Incidencia registrada con éxito"]);
    } catch (PDOException $e) {
        echo json_encode(["error" => "Error al guardar: " . $e->getMessage()]);
    }
}
?>
