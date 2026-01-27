from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('Pantalones/', views.Pantalones, name="Pantalones"),
    path('Torso/', views.Torso, name="Torso"),
    path('Calzado/', views.Calzado, name="Calzado"),
    path('Accesorios/', views.Accesorios, name="Accesorios"),
    path('Contacto/', views.Contacto, name="Contacto"),
    path('Ventas/carrito/', views.carrito, name="carrito"),
    path('Ventas/Envio/', views.envio_view, name="Envio"),
    path('Ventas/Pago/', views.pago_view, name="Pago"),
    path('Ventas/commit_pay/', views.commit_pay, name="commit_pay"),
    path('Ventas/pago_error/', views.pago_error, name="pago_error"),
    path('Ventas/send_pay/', views.send_pay, name="send_pay"),
    path('producto/Administracion/', views.Administracion, name="Administracion"),
    path('producto/agregar_producto/', views.agregar_producto, name="agregar_producto"),
    path('producto/agrega_marca/', views.agrega_marca, name="agrega_marca"),
    path('producto/agregar_tienda/', views.agregar_tienda, name="agregar_tienda"),
    path('producto/modificar/', views.modificar, name="modificar"),
    path('producto/eliminar/', views.eliminar, name="eliminar"),
    path('Usuarios/IniciarSesion/', views.IniciarSesion, name="IniciarSesion"),
    path('Usuarios/Registrarse/', views.Registrarse, name="Registrarse"),
    path('Usuarios/Admin_User/', views.Admin_User, name="Admin_User"),
    path('Usuarios/FormularioEnvio/', views.FormularioEnvio, name="FormularioEnvio"),
    path('Footer/QuienesSomos/', views.QuienesSomos, name="QuienesSomos"),
    path('Footer/SeSocio/', views.SeSocio, name="SeSocio"),
    path('Footer/TrabajaConNosotros/', views.TrabajaConNosotros, name="TrabajaConNosotros"),
    path('Footer/TerminosCondiciones/', views.TerminosCondiciones, name="TerminosCondiciones"),
    
    # Rutas para API AJAX
    path('api/cart_details/', views.get_cart_data, name="api_cart_details"),
    path('update_cart/', views.update_cart, name="update_cart"), # Asegurando que esta ruta existe para los botones
]