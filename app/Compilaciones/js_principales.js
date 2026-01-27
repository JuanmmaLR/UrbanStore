// ==========================================
// COMPILACION AUTOMATICA JAVASCRIPT
// GRUPO: PRINCIPALES
// FECHA: 2026-01-26 15:12:18
// ==========================================

////////////////////////////////////////////////////////////
// ARCHIVO: Administracion.js
// RUTA: C:\Users\juanl\Git\PROYECTOS\UrbanStore\UStore\app\static\js\Administracion.js
////////////////////////////////////////////////////////////

 

////////////////////////////////////////////////////////////
// ARCHIVO: agregar.js
// RUTA: C:\Users\juanl\Git\PROYECTOS\UrbanStore\UStore\app\static\js\agregar.js
////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', function() {
    const tipoProducto = document.getElementById('id_tipo');
    const tipoAccesorioField = document.getElementById('tipo-accesorio-field');
    const tipoSelect = document.getElementById('id_tipo');
    const subcategoriaFields = {
        'Tronco': document.getElementById('subcategoria-tronco-field'),
        'Piernas': document.getElementById('subcategoria-piernas-field'),
        'Zapatos': document.getElementById('subcategoria-zapatos-field'),
        'Complemento': document.getElementById('tipo-accesorio-field')
    };

    
    function toggleAccesorioField() {
        if (tipoProducto.value === 'Complemento') {
            tipoAccesorioField.style.display = 'block';
        } else {
            tipoAccesorioField.style.display = 'none';
        }
    }
    
    // Mostrar/ocultar al cargar la página
    toggleAccesorioField();
    
    // Mostrar/ocultar cuando cambia el tipo de producto
    tipoProducto.addEventListener('change', toggleAccesorioField);

    function toggleSubcategoria() {
        // Ocultar todos los campos primero
        Object.values(subcategoriaFields).forEach(field => {
            if(field) field.style.display = 'none';
        });
        
        // Mostrar el campo correspondiente al tipo seleccionado
        const selectedType = tipoSelect.value;
        if(subcategoriaFields[selectedType]) {
            subcategoriaFields[selectedType].style.display = 'block';
        }
    }

    // Inicializar y añadir listener
    toggleSubcategoria();
    tipoSelect.addEventListener('change', toggleSubcategoria);

    // Validación adicional del formulario antes de enviar
    const form = document.querySelector('form');
    form.addEventListener('submit', function(e) {
        let isValid = true;
        
        // Validar que el precio sea positivo
        const precio = document.getElementById('id_precio').value;
        if (precio <= 0) {
            alert('El precio debe ser un valor positivo');
            isValid = false;
        }
        
        // Validar que se haya seleccionado un tipo de accesorio si corresponde
        if (tipoProducto.value === 'Complemento') {
            const tipoAccesorio = document.getElementById('id_tipo_accesorio').value;
            if (!tipoAccesorio) {
                alert('Por favor seleccione un tipo de accesorio');
                isValid = false;
            }
        }
        
        if (!isValid) {
            e.preventDefault();
        }
    });
});

////////////////////////////////////////////////////////////
// ARCHIVO: agregar_tienda.js
// RUTA: C:\Users\juanl\Git\PROYECTOS\UrbanStore\UStore\app\static\js\agregar_tienda.js
////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////
// ARCHIVO: agrega_marca.js
// RUTA: C:\Users\juanl\Git\PROYECTOS\UrbanStore\UStore\app\static\js\agrega_marca.js
////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////
// ARCHIVO: carrito.js
// RUTA: C:\Users\juanl\Git\PROYECTOS\UrbanStore\UStore\app\static\js\carrito.js
////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', function() {
    // Habilitar/deshabilitar botón de pago según checkbox
    const termsCheck = document.getElementById('termsCheck');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    if (termsCheck && checkoutBtn) {
        termsCheck.addEventListener('change', function() {
            checkoutBtn.disabled = !this.checked;
        });

        // Manejador del botón de envío
        checkoutBtn.addEventListener('click', function() {
            if (!termsCheck.checked) {
                alert('Debes aceptar los términos y condiciones para continuar.');
                return;
            }
            window.location.href = "{% url 'Ventas' %}";
        });
    }

    // Manejar incremento de cantidad
    document.querySelectorAll('.increment').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.productId;
            const productType = this.dataset.productType;
            const max = parseInt(this.dataset.max);
            const quantityElement = this.parentElement.querySelector('.quantity');
            let quantity = parseInt(quantityElement.textContent);
            
            if (quantity < max) {
                quantity++;
                updateCartItem(productId, productType, quantity);
            } else {
                alert('No hay suficiente stock disponible');
            }
        });
    });

    // Manejar decremento de cantidad
    document.querySelectorAll('.decrement').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.productId;
            const productType = this.dataset.productType;
            const quantityElement = this.parentElement.querySelector('.quantity');
            let quantity = parseInt(quantityElement.textContent);
            
            if (quantity > 1) {
                quantity--;
                updateCartItem(productId, productType, quantity);
            }
        });
    });

    // Manejar eliminación de producto
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.productId;
            const productType = this.dataset.productType;
            
            if (confirm('¿Estás seguro de que deseas eliminar este producto de tu carrito?')) {
                removeCartItem(productId, productType);
            }
        });
    });

    
    // Función para actualizar cantidad en el carrito
    function updateCartItem(productId, productType, quantity) {
        fetch('/update_cart/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken'),
            },
            body: JSON.stringify({
                product_id: productId,
                product_type: productType,
                quantity: quantity,
                action: 'update'
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                location.reload(); // Recargar para ver cambios
            } else {
                alert(data.message || 'Error al actualizar el carrito');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al actualizar el carrito');
        });
    }

    // Función para eliminar item del carrito
    function removeCartItem(productId, productType) {
        fetch('/update_cart/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken'),
            },
            body: JSON.stringify({
                product_id: productId,
                product_type: productType,
                action: 'remove'
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                location.reload(); // Recargar para ver cambios
            } else {
                alert(data.message || 'Error al eliminar el producto');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al eliminar el producto');
        });
    }

    // Función para proceder al pago
    function proceedToCheckout() {
        fetch('/proceed_to_checkout/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken'),
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Compra realizada con éxito');
                window.location.href = '/'; // Redirigir a página principal
            } else {
                alert(data.message || 'Error al procesar el pago');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al procesar el pago');
        });
    }

    // Función auxiliar para obtener el token CSRF
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
});

////////////////////////////////////////////////////////////
// ARCHIVO: eliminar.js
// RUTA: C:\Users\juanl\Git\PROYECTOS\UrbanStore\UStore\app\static\js\eliminar.js
////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', function() {
    const eliminarForm = document.getElementById('eliminarForm');
    const eliminarSeleccionadosBtn = document.getElementById('eliminarSeleccionados');
    const eliminarTodosBtn = document.getElementById('eliminarTodos');
    
    // Confirmación para eliminar productos seleccionados
    if (eliminarSeleccionadosBtn) {
        eliminarSeleccionadosBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const checkedBoxes = document.querySelectorAll('input[name="seleccionados"]:checked');
            
            if (checkedBoxes.length === 0) {
                alert('Por favor, selecciona al menos un producto para eliminar.');
                return;
            }
            
            if (confirm(`¿Estás seguro de que deseas eliminar los ${checkedBoxes.length} productos seleccionados? Esta acción no se puede deshacer.`)) {
                const hiddenInput = document.createElement('input');
                hiddenInput.type = 'hidden';
                hiddenInput.name = 'eliminar_seleccionados';
                hiddenInput.value = '1';
                eliminarForm.appendChild(hiddenInput);
                eliminarForm.submit();
            }
        });
    }
    
    // Confirmación para eliminar todos los productos
    if (eliminarTodosBtn) {
        eliminarTodosBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const totalProductos = document.querySelectorAll('tbody tr').length;
            
            if (totalProductos === 0) {
                alert('No hay productos para eliminar.');
                return;
            }
            
            if (confirm(`¿Estás seguro de que deseas eliminar TODOS los ${totalProductos} productos? Esta acción no se puede deshacer.`)) {
                const hiddenInput = document.createElement('input');
                hiddenInput.type = 'hidden';
                hiddenInput.name = 'eliminar_todos';
                hiddenInput.value = '1';
                eliminarForm.appendChild(hiddenInput);
                eliminarForm.submit();
            }
        });
    }
    
    // Cerrar mensajes de alerta automáticamente después de 5 segundos
    const alertMessages = document.querySelectorAll('.alert');
    alertMessages.forEach(alert => {
        setTimeout(() => {
            const bsAlert = new bootstrap.Alert(alert);
            bsAlert.close();
        }, 5000);
    });
});

////////////////////////////////////////////////////////////
// ARCHIVO: formulario.js
// RUTA: C:\Users\juanl\Git\PROYECTOS\UrbanStore\UStore\app\static\js\formulario.js
////////////////////////////////////////////////////////////

$(document).ready(function() {
    // Validación del formulario
    $("#contactForm").validate({
        rules: {
            nombre: {
                required: true,
                minlength: 3
            },
            email: {
                required: true,
                email: true
            },
            mensaje: {
                required: true,
                minlength: 10
            }
        },
        messages: {
            nombre: {
                required: "Por favor ingresa tu nombre",
                minlength: "Tu nombre debe tener al menos 3 caracteres"
            },
            email: {
                required: "Por favor ingresa tu email",
                email: "Por favor ingresa un email válido"
            },
            mensaje: {
                required: "Por favor escribe tu mensaje",
                minlength: "Tu mensaje debe tener al menos 10 caracteres"
            }
        },
        errorElement: "div",
        errorPlacement: function(error, element) {
            error.addClass("error");
            error.insertAfter(element);
        },
        highlight: function(element, errorClass) {
            $(element).addClass("is-invalid");
        },
        unhighlight: function(element, errorClass) {
            $(element).removeClass("is-invalid");
        },
        submitHandler: function(form) {
            // Puedes añadir aquí código adicional antes del envío si es necesario
            form.submit();
        }
    });
});

////////////////////////////////////////////////////////////
// ARCHIVO: FormularioEnvio.js
// RUTA: C:\Users\juanl\Git\PROYECTOS\UrbanStore\UStore\app\static\js\FormularioEnvio.js
////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////
// ARCHIVO: Herencia.js
// RUTA: C:\Users\juanl\Git\PROYECTOS\UrbanStore\UStore\app\static\js\Herencia.js
////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', function() {

  // ==== Agregar al carrito ====
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const productId = this.dataset.productId;
      const productType = this.dataset.productType;

      fetch('/update_cart/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken'),
        },
        body: JSON.stringify({
          product_id: productId,
          product_type: productType,
          quantity: 1,
          action: 'add'
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          const notification = document.createElement('div');
          notification.className = 'alert alert-success position-fixed top-0 end-0 m-3';
          notification.style.zIndex = '9999';
          notification.textContent = 'Producto agregado al carrito';
          document.body.appendChild(notification);
          updateCartCounter(data.cart_count || 0);
          setTimeout(() => notification.remove(), 3000);
          
          // Si el sidebar está abierto, actualizarlo
          const sidebar = document.getElementById('cart-sidebar');
          if (sidebar && sidebar.classList.contains('active')) {
            loadCartData();
          }
        } else {
          alert(data.message || 'Error al agregar al carrito');
        }
      })
      .catch(() => alert('Error al agregar al carrito'));
    });
  });

  // ==== Menú hamburguesa MEJORADO ====
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navOverlay = document.getElementById("nav-overlay");

  if (menuToggle && navMenu && navOverlay) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isActive = navMenu.classList.contains("active");
      
      // Toggle menú
      navMenu.classList.toggle("active");
      menuToggle.classList.toggle("open");
      navOverlay.classList.toggle("active");
      
      // Prevenir scroll cuando el menú está abierto
      document.body.style.overflow = isActive ? "auto" : "hidden";
    });

    // Cerrar menú al hacer clic en overlay
    navOverlay.addEventListener("click", () => {
      closeMobileMenu();
    });

    // Cerrar menú al hacer clic en un enlace
    navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        closeMobileMenu();
      });
    });

    // Cerrar menú al presionar tecla Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeMobileMenu();
      }
    });

    // Cerrar menú al redimensionar la ventana (si se vuelve a desktop)
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        closeMobileMenu();
      }
    });

    // Función para cerrar el menú móvil
    function closeMobileMenu() {
      navMenu.classList.remove("active");
      menuToggle.classList.remove("open");
      navOverlay.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  }

  // ==== LOGICA SIDEBAR CARRITO (OFF-CANVAS) ====
  const cartToggle = document.getElementById('cart-sidebar-toggle');
  const cartSidebar = document.getElementById('cart-sidebar');
  const cartOverlay = document.getElementById('cart-overlay');
  const closeCartBtn = document.getElementById('close-cart');
  const cartBody = document.getElementById('cart-sidebar-body');
  const cartTotalDisplay = document.getElementById('cart-sidebar-total');
  const btnCheckout = document.getElementById('btn-sidebar-checkout');

  if (cartToggle && cartSidebar) {
    // Abrir Sidebar
    cartToggle.addEventListener('click', function(e) {
      e.preventDefault();
      openCartSidebar();
    });

    // Cerrar Sidebar
    closeCartBtn.addEventListener('click', closeCartSidebar);
    cartOverlay.addEventListener('click', closeCartSidebar);
  }

  function openCartSidebar() {
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = "hidden"; // Bloquear scroll
    loadCartData(); // Cargar datos via AJAX
  }

  function closeCartSidebar() {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = "auto";
  }

  // Función para cargar datos del carrito via AJAX
  function loadCartData() {
    // Mostrar spinner
    cartBody.innerHTML = `
      <div class="text-center py-5">
        <div class="spinner-border text-success" role="status">
          <span class="visually-hidden">Cargando...</span>
        </div>
      </div>
    `;

    fetch('/api/cart_details/')
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          renderCartItems(data.items);
          // Formatear precio
          const formattedTotal = new Intl.NumberFormat('es-CL', { 
            style: 'currency', 
            currency: 'CLP' 
          }).format(data.total);
          
          cartTotalDisplay.textContent = formattedTotal;
          
          // Deshabilitar botón de pago si está vacío
          if (data.total === 0) {
             btnCheckout.classList.add('disabled');
             btnCheckout.setAttribute('href', '#');
          } else {
             btnCheckout.classList.remove('disabled');
             btnCheckout.setAttribute('href', '/Ventas/Envio/'); // Hardcoded url based on urls.py
          }

        } else {
          cartBody.innerHTML = '<p class="text-center text-danger">Error al cargar el carrito</p>';
        }
      })
      .catch(err => {
        console.error(err);
        cartBody.innerHTML = '<p class="text-center text-danger">Error de conexión</p>';
      });
  }

  function renderCartItems(items) {
    if (items.length === 0) {
      cartBody.innerHTML = `
        <div class="text-center py-5">
            <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
            <p class="text-muted">Tu carrito está vacío</p>
        </div>
      `;
      return;
    }

    let html = '';
    items.forEach(item => {
      // Imagen placeholder si no hay imagen
      const imgUrl = item.imagen ? item.imagen : 'https://via.placeholder.com/60';
      
      html += `
        <div class="sidebar-item">
            <img src="${imgUrl}" alt="${item.modelo}" class="sidebar-item-img">
            <div class="sidebar-item-info w-100">
                <div class="d-flex justify-content-between">
                    <h5>${item.modelo}</h5>
                </div>
                <p class="mb-1 text-muted small">${item.marca}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <span class="text-white small">Cant: ${item.cantidad}</span>
                    <span class="sidebar-item-price">$${new Intl.NumberFormat('es-CL').format(item.subtotal)}</span>
                </div>
            </div>
        </div>
      `;
    });

    cartBody.innerHTML = html;
  }


  // ==== Actualizar contador del carrito ====
  function updateCartCounter(count) {
    const counter = document.querySelector('.cart-counter');
    if (counter) {
      counter.textContent = count;
      if (count > 0) {
        counter.classList.remove('d-none');
        counter.style.display = 'flex'; // Flex para centrar número
      } else {
        counter.classList.add('d-none');
        counter.style.display = 'none';
      }
    }
  }

  // ==== Helper para obtener CSRF token ====
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.startsWith(name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  // ==== Inicializar contador del carrito al cargar la página ====
  function initializeCartCounter() {
    const counter = document.querySelector('.cart-counter');
    if (counter) {
      // Si el contador ya tiene un número, asegurarnos de que se vea bien
      if (counter.textContent.trim() !== '' && parseInt(counter.textContent) > 0) {
        counter.classList.remove('d-none');
      }
    }
  }

  // Inicializar cuando carga la página
  initializeCartCounter();

});

////////////////////////////////////////////////////////////
// ARCHIVO: index.js
// RUTA: C:\Users\juanl\Git\PROYECTOS\UrbanStore\UStore\app\static\js\index.js
////////////////////////////////////////////////////////////

// static/js/index.js
document.addEventListener('DOMContentLoaded', function() {
    // Manejador para los botones de agregar al carrito
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.productId;
            const productType = this.dataset.productType;
            
            fetch('/update_cart/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken')
                },
                body: JSON.stringify({
                    product_id: productId,
                    product_type: productType,
                    action: 'add'
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Actualizar contador del carrito
                    const cartCount = document.getElementById('cart-count');
                    if (cartCount) {
                        cartCount.textContent = data.cart_count;
                    }
                    
                    // Mostrar notificación
                    alert('Producto agregado al carrito');
                }
            });
        });
    });
    
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
});

////////////////////////////////////////////////////////////
// ARCHIVO: modificar.js
// RUTA: C:\Users\juanl\Git\PROYECTOS\UrbanStore\UStore\app\static\js\modificar.js
////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const btnModificar = document.getElementById('btnModificar');
    const confirmationModal = document.getElementById('confirmationModal');
    const cancelModal = document.getElementById('cancelModal');
    const confirmModify = document.getElementById('confirmModify');
    const modificationForm = document.getElementById('modificationForm');
    const cancelEdit = document.getElementById('cancelEdit');
    const tipoAccesorioGroup = document.getElementById('tipoAccesorioGroup');
    const subcategoriaGroup = document.getElementById('subcategoriaGroup');
    
    // Mostrar modal de confirmación al hacer clic en Modificar
    if (btnModificar) {
        btnModificar.addEventListener('click', function() {
            const selectedProduct = document.querySelector('input[name="producto_id"]:checked');
            
            if (!selectedProduct) {
                alert('Por favor selecciona un producto para modificar');
                return;
            }
            
            confirmationModal.style.display = 'flex';
        });
    }
    
    // Ocultar modal al hacer clic en Cancelar
    if (cancelModal) {
        cancelModal.addEventListener('click', function() {
            confirmationModal.style.display = 'none';
        });
    }
    
    // Confirmar modificación y mostrar formulario de edición
    if (confirmModify) {
        confirmModify.addEventListener('click', function() {
            confirmationModal.style.display = 'none';
            
            const selectedProduct = document.querySelector('input[name="producto_id"]:checked');
            const tipoProducto = document.querySelector('input[name="tipo_producto"]').value;
            
            // Obtener datos del producto seleccionado
            const productCard = selectedProduct.closest('.product-card');
            const modelo = productCard.querySelector('p:nth-of-type(1)').textContent.replace('Modelo: ', '').trim();
            const precio = productCard.querySelector('p:nth-of-type(2)').textContent.replace('Precio: $', '').trim();
            const marcaTexto = productCard.querySelector('p:nth-of-type(3)').textContent.replace('Marca: ', '').trim();
            const generoTexto = productCard.querySelector('p:nth-of-type(4)').textContent.replace('Género: ', '').trim();
            const colorTexto = productCard.querySelector('p:nth-of-type(5)').textContent.replace('Color: ', '').trim();
            let subcategoriaTexto = '';
            
            // Obtener subcategoría solo si no es Complemento
            if (tipoProducto !== 'Complemento') {
                const subcategoriaElem = productCard.querySelector('p:nth-of-type(6)');
                if (subcategoriaElem) {
                    subcategoriaTexto = subcategoriaElem.textContent.replace('Subcategoría: ', '').trim();
                }
            }
            
            // Rellenar formulario de edición
            document.getElementById('editModelo').value = modelo === '-' ? '' : modelo;
            document.getElementById('editPrecio').value = precio;
            
            // Seleccionar la marca correcta en el dropdown
            const marcaSelect = document.getElementById('editMarca');
            for (let i = 0; i < marcaSelect.options.length; i++) {
                if (marcaSelect.options[i].text === marcaTexto) {
                    marcaSelect.selectedIndex = i;
                    break;
                }
            }
            
            // Seleccionar género
            const generoSelect = document.getElementById('editGenero');
            for (let i = 0; i < generoSelect.options.length; i++) {
                if (generoSelect.options[i].text === generoTexto) {
                    generoSelect.selectedIndex = i;
                    break;
                }
            }
            
            // Seleccionar color
            const colorSelect = document.getElementById('editColor');
            for (let i = 0; i < colorSelect.options.length; i++) {
                if (colorSelect.options[i].text === colorTexto) {
                    colorSelect.selectedIndex = i;
                    break;
                }
            }
            
            // Seleccionar subcategoría si aplica
            if (tipoProducto !== 'Complemento' && subcategoriaTexto) {
                const subcategoriaSelect = document.getElementById('editSubcategoria');
                for (let i = 0; i < subcategoriaSelect.options.length; i++) {
                    if (subcategoriaSelect.options[i].text === subcategoriaTexto) {
                        subcategoriaSelect.selectedIndex = i;
                        break;
                    }
                }
            }
            
            document.getElementById('editTipoProducto').value = tipoProducto;
            document.getElementById('editProductoId').value = selectedProduct.value;
            
            // Mostrar campo de tipo de accesorio si es necesario
            if (tipoProducto === 'Complemento') {
                tipoAccesorioGroup.style.display = 'block';
                const tipoAccesorio = productCard.querySelector('p:nth-of-type(6)').textContent.replace('Tipo: ', '').trim();
                const tipoValue = getTipoValue(tipoAccesorio);
                document.getElementById('editTipoAccesorio').value = tipoValue;
            } else {
                tipoAccesorioGroup.style.display = 'none';
            }
            
            // Mostrar campo de subcategoría si es necesario
            if (tipoProducto === 'Tronco' || tipoProducto === 'Piernas' || tipoProducto === 'Zapatos') {
                subcategoriaGroup.style.display = 'block';
            } else {
                subcategoriaGroup.style.display = 'none';
            }
            
            // Mostrar formulario de edición
            modificationForm.style.display = 'block';
            
            // Desplazarse al formulario
            modificationForm.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Cancelar edición
    if (cancelEdit) {
        cancelEdit.addEventListener('click', function() {
            modificationForm.style.display = 'none';
        });
    }
    
    // Función auxiliar para obtener el valor del tipo de accesorio
    function getTipoValue(tipoText) {
        const tipos = {
            'Reloj': 'REL',
            'Bufanda': 'BUF',
            'Cinturón': 'CIN',
            'Collar': 'COL',
            'Gorra': 'GOR',
            'Pulseras': 'PUL'
        };
        return tipos[tipoText] || 'REL';
    }
});

////////////////////////////////////////////////////////////
// ARCHIVO: Productos.js
// RUTA: C:\Users\juanl\Git\PROYECTOS\UrbanStore\UStore\app\static\js\Productos.js
////////////////////////////////////////////////////////////

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

