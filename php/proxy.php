<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$apiKey = "41200f382c6cdce21b4483ee0c3de2ce2eeac9df";
$id_estado = "22"; // Querétaro
$id_mun = "016"; // San Juan del Río

$url = "https://api.tau.com.mx/dipomex/v1/colonias?id_estado=$id_estado&id_mun=$id_mun";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    "APIKEY: $apiKey"
));

$response = curl_exec($ch);
curl_close($ch);

echo $response;
?>
