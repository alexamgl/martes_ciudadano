<?php
header("Content-Type: application/json");
require "config.php";

try {
    // Verificar qué columnas existen en la base de datos
    $stmt = $pdo->query("DESCRIBE nueva_incidencia");
    $columns = $stmt->fetchAll(PDO::FETCH_COLUMN);

    // Columnas que deben mostrarse en la tabla del dashboard
    $dashboardColumns = [
        "id_incidencia",
        "folio_cus",
        "fecha_creacion",
        "tipo_solicitante",
        "departamento",
        "motivo",
        "estatus",
        "calificacion"
    ];

    // Filtrar solo las columnas que realmente existen en la base de datos
    $availableColumns = array_intersect($dashboardColumns, $columns);

    if (empty($availableColumns)) {
        echo json_encode(["error" => "No hay columnas disponibles para mostrar"]);
        exit;
    }

    // Construir la consulta con solo las columnas existentes
    $query = "SELECT " . implode(", ", $availableColumns) . " FROM nueva_incidencia ORDER BY fecha_creacion DESC";
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    $incidencias = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (!$incidencias) {
        echo json_encode(["error" => "No hay incidencias disponibles"]);
        exit;
    }

    echo json_encode($incidencias, JSON_PRETTY_PRINT);
} catch (PDOException $e) {
    echo json_encode(["error" => "Error al obtener incidencias: " . $e->getMessage()]);
}
?>
