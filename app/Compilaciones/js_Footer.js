// ==========================================
// COMPILACION AUTOMATICA JAVASCRIPT
// GRUPO: FOOTER
// FECHA: 2026-01-26 15:12:18
// ==========================================

////////////////////////////////////////////////////////////
// ARCHIVO: QuienesSomos.js
// RUTA: C:\Users\juanl\Git\PROYECTOS\UrbanStore\UStore\app\static\js\Footer\QuienesSomos.js
////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', function() {
    // Animación de scroll suave para los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Efecto parallax para las secciones hero
    const heroSection = document.querySelector('.about-us-hero');
    const futureSection = document.querySelector('.our-future');
    
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        });
    }
    
    if (futureSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            const futureOffset = futureSection.offsetTop;
            const windowHeight = window.innerHeight;
            
            if (scrollPosition > futureOffset - windowHeight) {
                futureSection.style.backgroundPositionY = (scrollPosition - futureOffset) * 0.3 + 'px';
            }
        });
    }

    // Animación de aparición de elementos al hacer scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.philosophy-item, .category-card, .member-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Establecer estado inicial para la animación
    document.querySelectorAll('.philosophy-item, .category-card, .member-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Ejecutar al cargar y al hacer scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);

    // Efecto hover para las tarjetas de equipo
    const teamCards = document.querySelectorAll('.member-card');
    teamCards.forEach(card => {
        const img = card.querySelector('img');
        
        card.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.1)';
            img.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
        });
    });
});


////////////////////////////////////////////////////////////
// ARCHIVO: SeSocio.js
// RUTA: C:\Users\juanl\Git\PROYECTOS\UrbanStore\UStore\app\static\js\Footer\SeSocio.js
////////////////////////////////////////////////////////////

// js/Footer/SeSocio.js
document.addEventListener('DOMContentLoaded', function() {
    // Validación del formulario
    const forms = document.querySelectorAll('.needs-validation');
    
    Array.prototype.slice.call(forms).forEach(function(form) {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }

            form.classList.add('was-validated');
            
            // Validación personalizada del RUT
            const rutInput = document.getElementById('id_rut_comercial');
            if (rutInput) {
                if (!validarRUT(rutInput.value)) {
                    rutInput.classList.add('is-invalid');
                    rutInput.nextElementSibling.textContent = 'Por favor ingresa un RUT válido (ej: 12.345.678-9)';
                    event.preventDefault();
                } else {
                    rutInput.classList.remove('is-invalid');
                }
            }
        }, false);
    });

    // Función para validar RUT chileno
    function validarRUT(rut) {
        if (!rut || rut.trim() === '') return false;
        
        // Limpiar el RUT
        rut = rut.replace(/\./g, '').replace(/-/g, '').toUpperCase();
        const cuerpo = rut.slice(0, -1);
        const dv = rut.slice(-1);
        
        // Validar que el cuerpo sea numérico
        if (!/^\d+$/.test(cuerpo)) return false;
        
        // Calcular DV esperado
        let suma = 0;
        let multiplo = 2;
        
        for (let i = cuerpo.length - 1; i >= 0; i--) {
            suma += parseInt(cuerpo.charAt(i)) * multiplo;
            multiplo = multiplo === 7 ? 2 : multiplo + 1;
        }
        
        const dvEsperado = 11 - (suma % 11);
        let dvCalculado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();
        
        return dvCalculado === dv;
    }

    // Opcional: Formatear RUT mientras se escribe
    const rutInput = document.getElementById('id_rut_comercial');
    if (rutInput) {
        rutInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\./g, '').replace(/-/g, '');
            
            if (value.length > 1) {
                value = value.slice(0, -1).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '-' + value.slice(-1);
            }
            
            e.target.value = value;
        });
    }
});

////////////////////////////////////////////////////////////
// ARCHIVO: TerminosCondiciones.js
// RUTA: C:\Users\juanl\Git\PROYECTOS\UrbanStore\UStore\app\static\js\Footer\TerminosCondiciones.js
////////////////////////////////////////////////////////////

// TerminosCondiciones.js
document.addEventListener('DOMContentLoaded', function() {
    // Puedes añadir funcionalidad JS aquí si es necesario
    console.log('Términos y Condiciones cargado');
    
    // Ejemplo: Acordeón para secciones en móvil
    const terminosSections = document.querySelectorAll('.terminos-section');
    
    if (window.innerWidth < 768) {
        terminosSections.forEach(section => {
            const heading = section.querySelector('h2');
            const content = section.querySelector('ul, p, div');
            
            if (heading && content) {
                // Ocultar contenido inicialmente
                content.style.display = 'none';
                
                // Añadir evento click al heading
                heading.addEventListener('click', () => {
                    if (content.style.display === 'none') {
                        content.style.display = 'block';
                    } else {
                        content.style.display = 'none';
                    }
                });
                
                // Añadir estilo para indicar que es clickeable
                heading.style.cursor = 'pointer';
                heading.style.padding = '10px';
                heading.style.backgroundColor = '#f5f5f5';
                heading.style.borderRadius = '4px';
            }
        });
    }
});


////////////////////////////////////////////////////////////
// ARCHIVO: TrabajaConNosotros.js
// RUTA: C:\Users\juanl\Git\PROYECTOS\UrbanStore\UStore\app\static\js\Footer\TrabajaConNosotros.js
////////////////////////////////////////////////////////////

// TrabajaConNosotros.js
document.addEventListener('DOMContentLoaded', function() {
    // Validación del formulario
    const form = document.getElementById('workWithUsForm');
    const fileInput = document.getElementById('id_cv');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            // Validación simple del archivo
            if (fileInput.files.length > 0) {
                const file = fileInput.files[0];
                const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
                
                if (!validTypes.includes(file.type)) {
                    e.preventDefault();
                    alert('Por favor, sube un archivo PDF o Word.');
                    fileInput.focus();
                }
                
                if (file.size > 5 * 1024 * 1024) { // 5MB
                    e.preventDefault();
                    alert('El archivo es demasiado grande. El tamaño máximo es 5MB.');
                    fileInput.focus();
                }
            }
        });
    }
    
    // Mostrar nombre del archivo seleccionado
    if (fileInput) {
        fileInput.addEventListener('change', function() {
            const fileName = this.files[0] ? this.files[0].name : 'Ningún archivo seleccionado';
            document.getElementById('file-name').textContent = fileName;
        });
    }
});

