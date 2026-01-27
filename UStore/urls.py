"""
URL configuration for UStore project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from app import views  # Importa views normalmente

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('app.urls')),
    path('Usuarios/IniciarSesion/', views.IniciarSesion, name="IniciarSesion"),
    path('Usuarios/cerrar_sesion/', views.cerrar_sesion, name="cerrar_sesion"),
    path('carrito/', views.carrito, name='carrito'),
    path('update_cart/', views.update_cart, name='update_cart'),
    
    # Rutas actualizadas (sin decoradores externos)
    path('producto/Administracion/', views.Administracion, name="Administracion"),
    path('producto/agregar_producto/', views.agregar_producto, name="agregar_producto"),
    path('producto/agrega_marca/', views.agrega_marca, name="agrega_marca"),
    path('producto/modificar/', views.modificar, name="modificar"),
    path('producto/eliminar/', views.eliminar, name="eliminar"),
    path('Usuarios/Admin_User/', views.Admin_User, name="Admin_User"),
    path('Ventas/Envio/', views.envio_view, name="Envio"),
    path('Ventas/Pago/', views.pago_view, name="Pago"),
    path('commit-pay/', views.commit_pay_view, name="commit_pay"),
    path('Usuarios/FormularioEnvio/', views.FormularioEnvio, name="FormularioEnvio"),
    path('marcar-procesado/<int:envio_id>/', views.marcar_procesado, name='marcar_procesado'),
    path('exportar-envios-no-procesados/', views.exportar_envios_no_procesados, name='exportar_envios_no_procesados'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)