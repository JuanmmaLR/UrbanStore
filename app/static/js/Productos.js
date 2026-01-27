// static/js/Productos.js

// Comportamiento para agregar al carrito
document.addEventListener('DOMContentLoaded', function() {
    // Función para obtener el token CSRF
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    // Función para mostrar notificación suave
    function showNotification(message, isSuccess = true) {
        const notification = document.getElementById('cart-notification');
        notification.textContent = message;
        notification.className = `alert ${isSuccess ? 'alert-success' : 'alert-danger'}`;
        
        // Animación para mostrar y ocultar
        notification.style.display = 'block';
        notification.style.opacity = '1';
        
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                notification.style.display = 'none';
            }, 500);
        }, 2000);
    }

    // Agregar al carrito
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            const productType = this.getAttribute('data-product-type');
            
            fetch('/update_cart/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken')
                },
                body: JSON.stringify({
                    'product_id': productId,
                    'product_type': productType,
                    'action': 'add'
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Actualizar contador de carrito
                    const cartCountElements = document.querySelectorAll('.cart-count');
                    if (cartCountElements.length) {
                        cartCountElements.forEach(element => {
                            element.textContent = data.cart_count;
                        });
                    }
                    
                    // Mostrar feedback suave
                    showNotification('Producto agregado al carrito!');
                } else {
                    // Mostrar error
                    showNotification('Error: ' + data.message, false);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showNotification('Error en la solicitud', false);
            });
        });
    });

    // Limpiar filtros
    document.querySelectorAll('.btn-outline-secondary').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = window.location.pathname;
        });
    });
    
    // Envío automático del formulario al cambiar ciertos filtros
    const autoSubmitFilters = ['orden', 'genero', 'color'];
    autoSubmitFilters.forEach(filterId => {
        const element = document.getElementById(filterId);
        if (element) {
            element.addEventListener('change', function() {
                this.form.submit();
            });
        }
    });
});