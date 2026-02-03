// ==========================================
// COMPILACION AUTOMATICA JAVASCRIPT
// GRUPO: VENTAS
// FECHA: 2026-02-01 22:20:33
// ==========================================

////////////////////////////////////////////////////////////
// ARCHIVO: Envio.js
// RUTA: C:\Users\juanl\Git\PROYECTOS\UrbanStore\UStore\app\static\js\Ventas\Envio.js
////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////
// ARCHIVO: Pago.js
// RUTA: C:\Users\juanl\Git\PROYECTOS\UrbanStore\UStore\app\static\js\Ventas\Pago.js
////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', function() {
    const paymentForm = document.getElementById('payment-form');
    
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar los datos de la tarjeta aquí
            const cardNumber = document.getElementById('numero-tarjeta').value;
            const expiryDate = document.getElementById('fecha-expiracion').value;
            const cvv = document.getElementById('cvv').value;
            
            // Validación básica (puedes mejorarla)
            if (!cardNumber || !expiryDate || !cvv) {
                alert('Por favor complete todos los campos de pago');
                return;
            }
            
            // Si todo está bien, enviar el formulario
            this.submit();
        });
    }
});

////////////////////////////////////////////////////////////
// ARCHIVO: send_pay.js
// RUTA: C:\Users\juanl\Git\PROYECTOS\UrbanStore\UStore\app\static\js\Ventas\send_pay.js
////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', function() {
        // Enviar el formulario automáticamente después de 2 segundos
        setTimeout(function() {
            document.forms['send_pay_form'].submit();
        }, 2000);
    });

