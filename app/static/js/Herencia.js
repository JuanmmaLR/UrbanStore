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