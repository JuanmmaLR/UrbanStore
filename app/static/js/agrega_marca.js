// static/js/agrega_marca.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', function(e) {
        // Validación Nombre
        const nombreInput = document.getElementById('id_nombre');
        if (!nombreInput || nombreInput.value.trim() === '') {
            e.preventDefault();
            alert('Por favor, ingrese un nombre para la marca');
            if(nombreInput) nombreInput.focus();
            return;
        }

        // Validación Tienda
        const tiendaSelect = document.getElementById('id_tienda');
        if (!tiendaSelect || tiendaSelect.value === '') {
            e.preventDefault();
            alert('Por favor, selecciona un SPOT / TIENDA para asociar la marca');
            if(tiendaSelect) tiendaSelect.focus();
            return;
        }
    });
});