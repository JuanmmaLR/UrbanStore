document.addEventListener('DOMContentLoaded', function() {
    const eliminarForm = document.getElementById('eliminarForm');
    const eliminarSeleccionadosBtn = document.getElementById('eliminarSeleccionados');
    const eliminarTodosBtn = document.getElementById('eliminarTodos');
    const selectAllCheckbox = document.getElementById('selectAll');
    const productCheckboxes = document.querySelectorAll('.product-checkbox');

    // Funcionalidad "Seleccionar Todos"
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', function() {
            const isChecked = this.checked;
            productCheckboxes.forEach(checkbox => {
                checkbox.checked = isChecked;
            });
        });
    }

    // Confirmación para eliminar seleccionados
    if (eliminarSeleccionadosBtn) {
        eliminarSeleccionadosBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const checkedBoxes = document.querySelectorAll('input[name="seleccionados"]:checked');
            
            if (checkedBoxes.length === 0) {
                alert('⚠️ Selecciona al menos un item para eliminar.');
                return;
            }
            
            // Confirmación estilizada (usando confirm nativo por ahora pero con texto claro)
            if (confirm(`¿Estás seguro de que deseas ELIMINAR ${checkedBoxes.length} productos? \n\nEsta acción moverá los items al historial de eliminados.`)) {
                const hiddenInput = document.createElement('input');
                hiddenInput.type = 'hidden';
                hiddenInput.name = 'eliminar_seleccionados';
                hiddenInput.value = '1';
                eliminarForm.appendChild(hiddenInput);
                eliminarForm.submit();
            }
        });
    }
    
    // Confirmación para eliminar todos (Categoría completa)
    if (eliminarTodosBtn) {
        eliminarTodosBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const totalProductos = document.querySelectorAll('tbody tr').length;
            
            // Excluir la fila dummy si existe
            if (totalProductos === 0 || document.querySelector('.table-dummy-row')) {
                alert('No hay productos activos para eliminar en esta categoría.');
                return;
            }
            
            const categoria = document.getElementById('tipo_producto').selectedOptions[0].text;

            if (confirm(`⚠️ ALERTA CRÍTICA ⚠️\n\nEstás a punto de borrar TODOS los productos de la categoría: ${categoria}.\n\n¿Confirmas esta acción irreversible?`)) {
                const hiddenInput = document.createElement('input');
                hiddenInput.type = 'hidden';
                hiddenInput.name = 'eliminar_todos';
                hiddenInput.value = '1';
                eliminarForm.appendChild(hiddenInput);
                eliminarForm.submit();
            }
        });
    }
    
    // Auto-cierre de alertas
    const alertMessages = document.querySelectorAll('.alert');
    alertMessages.forEach(alert => {
        setTimeout(() => {
            const bsAlert = new bootstrap.Alert(alert);
            bsAlert.close();
        }, 5000);
    });
});