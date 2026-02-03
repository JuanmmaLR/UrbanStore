document.addEventListener('DOMContentLoaded', function() {
    // --- ELEMENTOS DEL DOM ---
    const btnModificar = document.getElementById('btnModificar');
    const confirmationModal = document.getElementById('confirmationModal');
    const cancelModal = document.getElementById('cancelModal');
    const confirmModify = document.getElementById('confirmModify');
    const modificationForm = document.getElementById('modificationForm');
    const cancelEdit = document.getElementById('cancelEdit');
    
    // Grupos condicionales
    const subcategoriaGroup = document.getElementById('subcategoriaGroup');
    const tipoAccesorioGroup = document.getElementById('tipoAccesorioGroup');

    // --- FUNCIONES DE MODAL ---

    // 1. Abrir Modal de Confirmación
    if (btnModificar) {
        btnModificar.addEventListener('click', function() {
            const selectedProduct = document.querySelector('input[name="producto_id"]:checked');
            
            if (!selectedProduct) {
                alert('⚠️ Por favor, selecciona un producto del catálogo para editar.');
                return;
            }
            
            // Efecto visual simple
            confirmationModal.style.display = 'flex';
            confirmationModal.classList.add('fade-in');
        });
    }
    
    // 2. Cerrar Modal
    if (cancelModal) {
        cancelModal.addEventListener('click', function() {
            confirmationModal.style.display = 'none';
        });
    }

    // --- LÓGICA DE EXTRACCIÓN Y POBLADO DE DATOS ---

    if (confirmModify) {
        confirmModify.addEventListener('click', function() {
            confirmationModal.style.display = 'none';
            
            // Obtener inputs base
            const selectedRadio = document.querySelector('input[name="producto_id"]:checked');
            const tipoProductoInput = document.querySelector('input[name="tipo_producto"]'); // El hidden del listado
            const tipoProducto = tipoProductoInput ? tipoProductoInput.value : '';
            
            // Localizar el Wrapper de la tarjeta seleccionada
            const cardWrapper = selectedRadio.closest('.product-card-wrapper');
            
            if (!cardWrapper) return;

            // --- EXTRACCIÓN DE DATOS DE LA TARJETA ---
            // Datos visibles
            const modeloText = cardWrapper.querySelector('.card-title').textContent.trim();
            const precioText = cardWrapper.querySelector('.card-price').textContent.replace(/[^\d]/g, ''); // Solo números
            
            // Stock (extraído de los detalles visibles)
            let cantidadText = "0";
            const detailsSpans = cardWrapper.querySelectorAll('.card-details span');
            detailsSpans.forEach(span => {
                if (span.textContent.includes('Stock:')) {
                    cantidadText = span.textContent.replace('Stock:', '').trim();
                }
            });

            // Datos ocultos (Data Store)
            const dataStore = cardWrapper.querySelector('.data-store');
            const marcaText = dataStore.querySelector('.data-marca').textContent.trim();
            const generoText = dataStore.querySelector('.data-genero').textContent.trim();
            const colorText = dataStore.querySelector('.data-color').textContent.trim();
            const descText = dataStore.querySelector('.data-desc').textContent.trim();
            const nuevoBool = dataStore.querySelector('.data-nuevo').textContent.trim() === 'true';
            
            // Subcategorías (pueden no existir según el tipo)
            const subcatElem = dataStore.querySelector('.data-subcat');
            const subcatText = subcatElem ? subcatElem.textContent.trim() : '';
            
            const tipoAccesorioElem = dataStore.querySelector('.data-tipo');
            const tipoAccesorioText = tipoAccesorioElem ? tipoAccesorioElem.textContent.trim() : '';

            // --- POBLADO DEL FORMULARIO DE EDICIÓN ---
            
            // IDs ocultos
            document.getElementById('editTipoProducto').value = tipoProducto;
            document.getElementById('editProductoId').value = selectedRadio.value;

            // Campos de texto y número
            document.getElementById('editModelo').value = (modeloText === 'Sin Modelo') ? '' : modeloText;
            document.getElementById('editPrecio').value = precioText;
            document.getElementById('editCantidad').value = cantidadText;
            document.getElementById('editDescripcion').value = descText;
            document.getElementById('editNuevo').checked = nuevoBool;

            // --- SELECCIÓN EN DROPDOWNS (MATCH POR TEXTO) ---
            setSelectedByText('editMarca', marcaText);
            setSelectedByText('editGenero', generoText);
            setSelectedByText('editColor', colorText);

            // --- VISIBILIDAD Y CAMPOS CONDICIONALES ---
            
            // Resetear visibilidad
            subcategoriaGroup.style.display = 'none';
            tipoAccesorioGroup.style.display = 'none';

            if (tipoProducto === 'Complemento') {
                // Lógica para Accesorios
                tipoAccesorioGroup.style.display = 'block';
                // Mapeo especial para tipos de accesorios (si el texto difiere del value)
                // Intentamos match por texto primero
                setSelectedByText('editTipoAccesorio', tipoAccesorioText);
                
                // Si el match por texto falla (ej: data dice "Reloj" y value es "REL"),
                // usamos la función auxiliar si es necesario, pero el setSelectedByText suele bastar 
                // si el backend renderiza el nombre completo en .data-store
            } else {
                // Lógica para Ropa/Zapatos
                subcategoriaGroup.style.display = 'block';
                setSelectedByText('editSubcategoria', subcatText);
            }

            // --- MOSTRAR FORMULARIO Y SCROLL ---
            modificationForm.style.display = 'block';
            modificationForm.classList.add('fade-in');
            
            // Scroll suave hacia el formulario
            setTimeout(() => {
                modificationForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        });
    }
    
    // Cancelar Edición (Ocultar formulario)
    if (cancelEdit) {
        cancelEdit.addEventListener('click', function() {
            modificationForm.style.display = 'none';
            // Scroll de vuelta arriba
            document.querySelector('.urban-title').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // --- FUNCIONES AUXILIARES ---

    /**
     * Selecciona una opción en un <select> basándose en el texto visible de la opción.
     * Útil cuando tenemos el nombre ("Nike") pero necesitamos enviar el ID ("1").
     */
    function setSelectedByText(selectId, textToMatch) {
        const select = document.getElementById(selectId);
        if (!select) return;

        let found = false;
        for (let i = 0; i < select.options.length; i++) {
            if (select.options[i].text.trim() === textToMatch.trim()) {
                select.selectedIndex = i;
                found = true;
                break;
            }
        }
        
        // Fallback: Si no encuentra match exacto, intenta match parcial o log
        if (!found && textToMatch) {
            console.warn(`No se encontró coincidencia exacta para: "${textToMatch}" en #${selectId}`);
        }
    }
});