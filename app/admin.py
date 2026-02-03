from django.contrib import admin
from .models import (
    Marca, Tronco, Piernas, Zapatos, Complemento, 
    Contacto, TrabajaConNosotros, SeSocio, Envio, 
    Tienda, PreferenciasUsuario, HistorialModificacion,
    HistorialEliminacion
)

# Configuración del encabezado del Admin
admin.site.site_header = "Administración Urban Store"
admin.site.site_title = "Portal Urban Store"
admin.site.index_title = "Bienvenido al Panel de Control"

class MarcaAdmin(admin.ModelAdmin):
    list_display = ['id', 'nombre', 'usuario', 'tienda']
    search_fields = ['nombre']
    list_filter = ['tienda']

class TroncoAdmin(admin.ModelAdmin):
    list_display = ['id', 'modelo', 'marca', 'precio', 'cantidad', 'subcategoria', 'nuevo', 'usuario']
    list_editable = ['precio', 'cantidad', 'nuevo']
    list_filter = ['marca', 'genero', 'subcategoria', 'nuevo', 'usuario']
    search_fields = ['modelo', 'marca__nombre']
    list_per_page = 10
    
    def save_model(self, request, obj, form, change):
        obj.usuario = request.user
        super().save_model(request, obj, form, change)

class PiernasAdmin(admin.ModelAdmin):
    list_display = ['id', 'modelo', 'marca', 'precio', 'cantidad', 'subcategoria', 'nuevo', 'usuario']
    list_editable = ['precio', 'cantidad', 'nuevo']
    list_filter = ['marca', 'genero', 'subcategoria', 'nuevo', 'usuario']
    search_fields = ['modelo', 'marca__nombre']
    list_per_page = 10

    def save_model(self, request, obj, form, change):
        obj.usuario = request.user
        super().save_model(request, obj, form, change)

class ZapatosAdmin(admin.ModelAdmin):
    list_display = ['id', 'modelo', 'marca', 'precio', 'cantidad', 'subcategoria', 'nuevo', 'usuario']
    list_editable = ['precio', 'cantidad', 'nuevo']
    list_filter = ['marca', 'genero', 'subcategoria', 'nuevo', 'usuario']
    search_fields = ['modelo', 'marca__nombre']
    list_per_page = 10

    def save_model(self, request, obj, form, change):
        obj.usuario = request.user
        super().save_model(request, obj, form, change)

class ComplementoAdmin(admin.ModelAdmin):
    list_display = ['id', 'modelo', 'marca', 'precio', 'cantidad', 'subcategoria', 'nuevo', 'usuario']
    list_editable = ['precio', 'cantidad', 'nuevo', 'subcategoria'] 
    list_filter = ['marca', 'genero', 'subcategoria', 'nuevo', 'usuario']
    search_fields = ['modelo', 'marca__nombre']
    list_per_page = 10

    def save_model(self, request, obj, form, change):
        obj.usuario = request.user
        super().save_model(request, obj, form, change)

class ContactoAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'email', 'fecha', 'leido']
    list_editable = ['leido']
    list_filter = ['leido', 'fecha']
    search_fields = ['nombre', 'email', 'mensaje']
    readonly_fields = ['fecha']

class TrabajaConNosotrosAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'puesto', 'email', 'fecha', 'leido']
    list_editable = ['leido']
    list_filter = ['puesto', 'leido']
    search_fields = ['nombre', 'email']

class SeSocioAdmin(admin.ModelAdmin):
    list_display = ['nombre_marca', 'nombre', 'rubro', 'fecha', 'contacto']
    list_editable = ['contacto']
    list_filter = ['rubro', 'contacto']
    search_fields = ['nombre_marca', 'nombre']

class EnvioAdmin(admin.ModelAdmin):
    list_display = ['id', 'nombre', 'region', 'courier', 'total_pagar', 'procesado', 'fecha']
    list_editable = ['procesado']
    list_filter = ['region', 'courier', 'procesado', 'fecha']
    search_fields = ['nombre', 'id']
    readonly_fields = ['fecha', 'monto_carrito', 'costo_envio', 'total_pagar']

class TiendaAdmin(admin.ModelAdmin):
    list_display = ['nombre_tienda', 'categorias']
    search_fields = ['nombre_tienda']

class PreferenciasUsuarioAdmin(admin.ModelAdmin):
    list_display = ['user', 'tienda_asociada', 'recibir_notificaciones']
    list_filter = ['tienda_asociada', 'recibir_notificaciones']
    search_fields = ['user__username']

class HistorialModificacionAdmin(admin.ModelAdmin):
    list_display = ['prenda', 'usuario', 'tienda', 'fecha']
    list_filter = ['usuario', 'tienda', 'fecha']
    search_fields = ['prenda', 'usuario__username', 'tienda']
    readonly_fields = ['fecha']

class HistorialEliminacionAdmin(admin.ModelAdmin):
    list_display = ['fecha', 'producto_modelo', 'marca', 'tipo_producto', 'usuario', 'motivo']
    list_filter = ['tipo_producto', 'fecha', 'usuario']
    search_fields = ['producto_modelo', 'marca', 'usuario__username']
    readonly_fields = ['fecha', 'usuario', 'producto_modelo', 'marca', 'tipo_producto', 'motivo']
    list_per_page = 20
    
    def has_add_permission(self, request):
        return False

# --- REGISTRO DE MODELOS ---
admin.site.register(Marca, MarcaAdmin)
admin.site.register(Tronco, TroncoAdmin)
admin.site.register(Piernas, PiernasAdmin)
admin.site.register(Zapatos, ZapatosAdmin)
admin.site.register(Complemento, ComplementoAdmin)
admin.site.register(Contacto, ContactoAdmin)
admin.site.register(TrabajaConNosotros, TrabajaConNosotrosAdmin)
admin.site.register(SeSocio, SeSocioAdmin)
admin.site.register(Envio, EnvioAdmin)
admin.site.register(Tienda, TiendaAdmin)
admin.site.register(PreferenciasUsuario, PreferenciasUsuarioAdmin)
admin.site.register(HistorialModificacion, HistorialModificacionAdmin)
admin.site.register(HistorialEliminacion, HistorialEliminacionAdmin)