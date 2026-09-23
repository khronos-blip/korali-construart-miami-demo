# Auditoría del paquete social — Constru-Art Miami

**Estado:** APROBADO PARA REVISIÓN INTERNA · propuesta no oficial · no publicado

## Alcance verificado

- `bio.md` y `captions.md` presentes.
- `avatar.png`, seis posts en `posts/`, `profile-grid mockup.png` y `comparison/before-after.png` presentes.
- Los nueve PNG finales son PNG sRGB de **1080 × 1080 px**.
- Nueve fuentes SVG reproducibles están en `sources/`; el generador está en `scripts/generate.mjs`.
- Regeneración disponible con `npm run social:generate`; requiere Node.js e ImageMagick (`magick`).

## Trazabilidad de hechos y activos

- Marca, Miami, servicios y teléfonos: `README.md` y `public/index.html`.
- Fotografías: únicamente `assets/images/project-01.jpg` a `project-06.jpg`.
- Post 01: `project-02.jpg`, baño residencial e instalación/terminaciones.
- Post 03: `project-03.jpg`, interior comercial.
- Post 04: `project-01.jpg`, trabajo visible en proceso.
- Post 05 y comparación: `project-04.jpg`, que ya contiene evidencia “Before / After” en la propia imagen entregada.
- Post 06: `project-06.jpg`, closet con almacenamiento e iluminación visibles.
- No se añadieron precios, licencias, premios, garantías, antigüedad, testimonios ni tiempos de entrega.
- Las piezas y el mockup indican **“propuesta no oficial”**; la comparación no presenta un rediseño oficial.

## QA ejecutado

1. Regeneración completa dos veces y comparación SHA-256 de todos los PNG: **idéntica entre ejecuciones**.
2. Validación automática de existencia, formato, dimensiones, variación visual y ausencia de marcadores (`lorem ipsum`, `example.com`, `@handle`, `TBD`): **PASS**.
3. Comprobación de sintaxis del generador con `node --check`: **PASS**.
4. Revisión visual individual y en hoja de contacto: **PASS** en clipping, contraste, superposición y legibilidad.
5. Se corrigió durante QA el corte de texto del post 04; la versión final mantiene todo el titular dentro del panel.

Evidencia visual: `audit/contact-sheet.jpg`.

## Límites de uso

Material preparado únicamente como propuesta interna. Requiere aprobación del negocio antes de publicar o adoptar bio, captions, avatar o sistema visual. No se desplegó, contactó ni publicó nada.
