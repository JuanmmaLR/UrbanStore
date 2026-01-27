 /**
 * ARCHIVO: agregar_tienda.js
 * Lógica de validación y efectos para la vista de Agregar Tienda
 */

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.urban-form');
    const submitBtn = document.querySelector('.urban-btn');
    const checkboxes = document.querySelectorAll('input[name="categorias"]');
    const nombreInput = document.getElementById('nombre_tienda');
    const originalBtnText = submitBtn.innerHTML;

    // Efecto de sonido al hacer click (opcional, simulado visualmente)
    checkboxes.forEach(chk => {
        chk.addEventListener('change', () => {
            if (chk.checked) {
                chk.closest('.custom-checkbox').style.transform = 'scale(1.05)';
                setTimeout(() => {
                    chk.closest('.custom-checkbox').style.transform = 'scale(1)';
                }, 150);
            }
        });
    });

    // Validación al enviar el formulario
    form.addEventListener('submit', (e) => {
        let isValid = true;
        let errors = [];

        // 1. Validar Nombre
        if (!nombreInput.value.trim()) {
            isValid = false;
            errors.push("El nombre del spot es obligatorio.");
            shakeElement(nombreInput.parentElement);
        }

        // 2. Validar Categorías (Al menos 1 seleccionada)
        const checkedCount = document.querySelectorAll('input[name="categorias"]:checked').length;
        if (checkedCount === 0) {
            isValid = false;
            errors.push("Debes seleccionar al menos una categoría (Torso, Pantalones, etc).");
            shakeElement(document.querySelector('.checkbox-grid'));
        }

        if (!isValid) {
            e.preventDefault();
            showUrbanAlert(errors[0]); // Mostrar el primer error encontrado
        } else {
            // Efecto de carga en el botón si todo es válido
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="loading-spinner">⚡</span> PROCESANDO...';
            submitBtn.style.backgroundColor = '#337418';
        }
    });

    // Función para efecto de vibración en error
    function shakeElement(element) {
        element.style.animation = 'none';
        element.offsetHeight; /* trigger reflow */
        element.style.animation = 'shake 0.5s';
        
        // Inyectar keyframes si no existen
        if (!document.getElementById('shake-style')) {
            const style = document.createElement('style');
            style.id = 'shake-style';
            style.innerHTML = `
                @keyframes shake {
                    0% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    50% { transform: translateX(5px); }
                    75% { transform: translateX(-5px); }
                    100% { transform: translateX(0); }
                }
                .loading-spinner {
                    display: inline-block;
                    animation: spin 1s infinite linear;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Alerta personalizada estilo Neón
    function showUrbanAlert(message) {
        // Eliminar alerta previa si existe
        const existingAlert = document.querySelector('.urban-toast');
        if (existingAlert) existingAlert.remove();

        const toast = document.createElement('div');
        toast.className = 'urban-toast';
        toast.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background-color: #202020;
                border-left: 5px solid #5DD62C;
                color: #F8F8F8;
                padding: 1rem 1.5rem;
                border-radius: 4px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.5);
                font-family: 'Roboto', sans-serif;
                z-index: 1000;
                display: flex;
                align-items: center;
                animation: slideIn 0.3s ease-out;
            ">
                <span style="font-size: 1.5rem; margin-right: 10px;">⚠️</span>
                <span>${message}</span>
            </div>
            <style>
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
            </style>
        `;

        document.body.appendChild(toast);

        // Auto eliminar después de 3 segundos
        setTimeout(() => {
            toast.firstChild.style.animation = 'fadeOut 0.5s forwards';
            setTimeout(() => {
                toast.remove();
            }, 500);
        }, 3000);
    }
});