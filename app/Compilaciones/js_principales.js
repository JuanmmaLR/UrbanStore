// ==========================================
// COMPILACION AUTOMATICA JAVASCRIPT
// GRUPO: PRINCIPALES
// FECHA: 2026-02-01 22:20:33
// ==========================================

////////////////////////////////////////////////////////////
// ARCHIVO: Administracion.js
// RUTA: C:\Users\juanl\Git\PROYECTOS\UrbanStore\UStore\app\static\js\Administracion.js
////////////////////////////////////////////////////////////

 

////////////////////////////////////////////////////////////
// ARCHIVO: agregar.js
// RUTA: C:\Users\juanl\Git\PROYECTOS\UrbanStore\UStore\app\static\js\agregar.js
////////////////////////////////////////////////////////////

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

