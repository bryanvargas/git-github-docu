# Git & GitHub Cheat Sheet — SAAS 2026 PRO

Una guía rápida y completa de comandos Git y GitHub, diseñada para equipos de desarrollo que trabajan con flujos de trabajo modernos.

## Características

- **Búsqueda en tiempo real** de comandos
- **Copiado con un clic** al portapapeles
- **Navegación rápida** por categorías
- **Barró de progreso** de lectura
- **Modo oscuro** optimizado
- **Diseño responsive** para móviles y desktop
- **Impresión optimizada** para referencia física

## Categorías

| Categoría | Color | Descripción |
|-----------|-------|-------------|
| Básicos | `#0B7C6B` | Comandos fundamentales de Git |
| Remotos | `#219FFF` | Gestión de repositorios remotos |
| Ramas | `#17BDBD` | Creación y manejo de branches |
| Avanzados | `#FF4E3E` | Comandos avanzados y reescritura de historia |
| Stash | `#FF6320` | Guardado temporal de cambios |
| Emergencia | `#FFA914` | Recuperación y resolución de problemas |
| Workflows | `#17BDBD` | Flujos de trabajo recomendados |
| Buenas Prácticas | `#219FFF` | Alias y consejos de equipo |

## Paleta de Colores

### Primary Color
- `#0B7C6B` — Verde principal
- `#E4FFFB` — Verde claro de acento

### Secondary Color
- `#FF6320` — Naranja vibrante
- `#FFECE3` — Naranja claro

### Dark Color
- `#101313` — Fondo principal oscuro
- `#383A3A` — Fondo secundario
- `#848786` — Texto muted
- `#CCCCCC` — Bordes y divisores
- `#E4E9E8` — Fondo de filas alternas
- `#F4F9F8` — Hover de tarjetas
- `#F9FCFB` — Fondo de tarjetas

### Status Color
- `#219FFF` — Azul informativo
- `#E4F4FF` — Azul claro
- `#17BDBD` — Cian de éxito
- `#DFFEF5` — Cian claro
- `#FFA914` — Amarillo de advertencia
- `#FFF1DC` — Amarillo claro
- `#FF4E3E` — Rojo de error
- `#FFECEB` — Rojo claro

## Estructura del Proyecto

```
SHINGOGIT/
├── index.html      # Página principal
├── styles.css      # Estilos con paleta de colores personalizada
├── script.js       # Funcionalidad interactiva
└── README.md       # Documentación
```

## Tecnologías

- **HTML5** — Estructura semántica
- **CSS3** — Variables personalizadas, Grid, Flexbox
- **JavaScript** — Vanilla JS (sin dependencias)
- **Fuentes** — Inter + JetBrains Mono (Google Fonts)

## Cómo Ejecutar en Localhost

### Opción 1: Python (recomendado si tienes Python)
```bash
python -m http.server 8000
```
Abre `http://localhost:8000` en tu navegador.

### Opción 2: Node.js (si tienes npm/npx)
```bash
npx serve
```
Abre la URL que aparezca en la terminal (usualmente `http://localhost:3000`).

### Opción 3: Abrir directamente
Haz doble clic en `index.html` o arrástralo a tu navegador.
> Nota: Algunas funciones pueden no funcionar sin un servidor local.

## Funcionalidades Interactivas

- **Copiar comandos**: Haz clic en cualquier comando para copiarlo al portapapeles
- **Búsqueda**: Usa la barra de búsqueda para filtrar comandos en tiempo real
- **Navegación sticky**: El menú de navegación se mantiene visible al hacer scroll
- **Scroll to top**: Botón flotante para volver al inicio
- **Toast notifications**: Confirmación visual al copiar comandos

## Secciones Incluidas

1. **Comandos Básicos** — init, clone, add, commit, push, pull, etc.
2. **Comandos Remotos** — remote, fetch, pull, push, upstream
3. **Gestión de Ramas** — branch, checkout, merge, rebase
4. **Comandos Avanzados** — reset, revert, cherry-pick, reflog
5. **Stash** — Guardar y recuperar cambios temporales
6. **Emergencias** — Resolución de conflictos y recuperación
7. **Workflows** — Flujos de trabajo recomendados para equipos
8. **Aliases** — Atajos útiles para aumentar productividad
9. **Tips y Buenas Prácticas** — Consejos para equipos SaaS

## Impresión

El sitio está optimizado para impresión. Usa `Ctrl + P` para generar una versión PDF o imprimir la guía.

## Licencia

MIT License — Libre para uso personal y comercial.

---

*Diseñado para equipos SaaS que valoran la eficiencia y la claridad en sus flujos de trabajo con Git y GitHub.*
