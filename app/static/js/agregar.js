/* ARCHIVO: agregar.js */
/* RUTA: static/js/agregar.js */

document.addEventListener('DOMContentLoaded', function() {
    // 1. REFERENCIAS A ELEMENTOS DEL DOM
    // Django genera automáticamente el ID 'id_nombrecampo' para los inputs
    const selectTipo = document.getElementById('id_tipo');
    
    // Contenedores de campos condicionales (Coinciden con los IDs del HTML nuevo)
    const containerAccesorio = document.getElementById('tipo-accesorio-field');
    const containerTronco = document.getElementById('subcategoria-tronco-field');
    const containerPiernas = document.getElementById('subcategoria-piernas-field');
    const containerZapatos = document.getElementById('subcategoria-zapatos-field');

    // 2. FUNCIÓN DE LÓGICA DE VISUALIZACIÓN
    function actualizarCampos() {
        if (!selectTipo) return;

        // Obtenemos el texto de la opción seleccionada para ser flexibles
        // (Podrías usar .value si conoces las claves exactas de tu base de datos ej: 'AC', 'RS')
        const seleccion = selectTipo.options[selectTipo.selectedIndex].text.toLowerCase();
        
        // --- RESET: Ocultar todo primero ---
        const todosLosCampos = [containerAccesorio, containerTronco, containerPiernas, containerZapatos];
        todosLosCampos.forEach(campo => {
            if (campo) {
                campo.style.display = 'none';
                // Opcional: Limpiar el valor de los selects ocultos para evitar errores al enviar
                // const selectInterno = campo.querySelector('select');
                // if(selectInterno) selectInterno.selectedIndex = 0; 
            }
        });

        // --- MOSTRAR: Según la palabra clave ---
        // Ajusta estas palabras clave según cómo hayas nombrado tus Tipos en el Admin de Django
        
        if (seleccion.includes('accesorio') || seleccion.includes('lentes') || seleccion.includes('joya')) {
            if (containerAccesorio) containerAccesorio.style.display = 'block';

        } else if (seleccion.includes('superior') || seleccion.includes('camisa') || seleccion.includes('polera') || seleccion.includes('chaqueta')) {
            if (containerTronco) containerTronco.style.display = 'block';

        } else if (seleccion.includes('inferior') || seleccion.includes('pantalón') || seleccion.includes('jeans') || seleccion.includes('fald')) {
            if (containerPiernas) containerPiernas.style.display = 'block';

        } else if (seleccion.includes('calzado') || seleccion.includes('zapatilla') || seleccion.includes('bota')) {
            if (containerZapatos) containerZapatos.style.display = 'block';
        }
    }

    // 3. EVENT LISTENERS
    if (selectTipo) {
        // Escuchar cambios en el selector
        selectTipo.addEventListener('change', actualizarCampos);
        
        // Ejecutar al cargar la página (Crucial para cuando hay errores de validación y la página se recarga)
        actualizarCampos();
    }
});