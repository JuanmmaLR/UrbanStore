// static/js/Ventas/Envio.js
document.addEventListener('DOMContentLoaded', function() {
    // Costos de envío por región
    const costosRegion = {
        'RM': 3000,
        'I': 13000,
        'II': 14000,
        'III': 11000,
        'IV': 8000,
        'V': 4000,
        'VI': 5000,
        'VII': 6000,
        'VIII': 7000,
        'IX': 9000,
        'XIV': 10000,
        'X': 12000,
        'XI': 15000,
        'XII': 16000,
        'XV': 14500,
        'XVI': 7000,
    };

    // Costos de courier
    const costosCourier = {
        'CHILEXPRESS': 5000,
        'STARKEN': 4500,
        'CORREOS_CHILE': 4000,
        'BLUE_EXPRESS': 4800,
    };

    // Función para formatear números con separadores de miles
    function formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    // Función para actualizar el resumen
    function actualizarResumen() {
        const region = document.getElementById('id_region').value;
        const courier = document.getElementById('id_courier').value;
        const subtotal = parseFloat("{{ total_carrito }}") || 0;
        
        let costoRegion = costosRegion[region] || 0;
        let costoCourier = costosCourier[courier] || 0;
        let costoEnvioTotal = costoRegion + costoCourier;
        let total = subtotal + costoEnvioTotal;
        
        // Actualizar en el resumen
        document.getElementById('costo-envio').textContent = '$' + formatNumber(costoRegion);
        document.getElementById('costo-courier').textContent = '$' + formatNumber(costoCourier);
        document.getElementById('total-pagar').innerHTML = '<strong>$' + formatNumber(total) + '</strong>';
    }

    // Escuchar cambios en región y courier
    document.getElementById('id_region').addEventListener('change', actualizarResumen);
    document.getElementById('id_courier').addEventListener('change', actualizarResumen);

    // Inicializar al cargar
    actualizarResumen();
});