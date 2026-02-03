// PROYECTOS\UrbanStore\UStore\app\static\js\agrega_marca.js

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const nombreInput = document.getElementById('id_nombre');

    // Validación en tiempo real (opcional)
    if (nombreInput) {
        nombreInput.addEventListener('input', function() {
            if (this.value.length > 0) {
                this.style.borderColor = '#5DD62C'; // Verde Brillante si hay texto
            } else {
                this.style.borderColor = '#337418'; // Vuelve al Verde Oscuro
            }
        });
    }

    form.addEventListener('submit', function(e) {
        let errores = [];
        const nombreValue = nombreInput.value.trim();

        // 1. Validar que el nombre no esté vacío
        if (nombreValue === '') {
            errores.push('El NOMBRE DE LA MARCA es obligatorio.');
        }

        // 2. Validar largo mínimo (evitar nombres de una sola letra)
        if (nombreValue.length > 0 && nombreValue.length < 2) {
            errores.push('El nombre de la marca debe tener al menos 2 caracteres.');
        }

        // 3. Validación de seguridad para el Spot (Tienda)
        // Como quitamos el select, verificamos que el sistema reconozca la tienda del usuario
        const spotText = document.querySelector('.context-item .value')?.textContent;
        if (!spotText || spotText.includes('SIN TIENDA')) {
            errores.push('Error: No tienes un SPOT asignado. Contacta al administrador.');
        }

        // Mostrar errores si existen
        if (errores.length > 0) {
            e.preventDefault(); // Detener el envío
            
            // Usamos un alert con el estilo del proyecto
            alert("⚠️ URBAN STORE - ERROR DE VALIDACIÓN:\n\n" + errores.join('\n'));
            
            if (nombreInput) {
                nombreInput.focus();
                nombreInput.style.borderColor = '#d62c2c'; // Rojo para indicar error
            }
        }
    });
});