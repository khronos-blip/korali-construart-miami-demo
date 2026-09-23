# Constru-Art Miami — demo local

Demo premium, no oficial y sin conexión operativa para **Constru-Art Miami LLC**. Presenta Remodeling / Tile / Painting, proyectos y una simulación local de solicitud de alcance. No transmite ni persiste datos.

## Fuente y evidencia

Perfil oficial:

- https://www.instagram.com/construartmiami/

Publicaciones oficiales consultadas como evidencia visual y de servicios:

- Exterior painting: https://www.instagram.com/p/DVqwsGqASuh/
- Proyecto / remodelación: https://www.instagram.com/p/DWZdzlAgcDy/
- Bathroom: https://www.instagram.com/p/DU-_2uukX2P/
- Closet remodeling: https://www.instagram.com/p/DWg448cgV-j/

Las seis imágenes entregadas para esta demo permanecen sin generación ni sustitución en `assets/images/`; la copia servida está en `public/assets/images/`. Los textos se limitan a hechos suministrados o visibles: nombre, Miami, teléfonos, servicios y tipos de transformación. No se presentan licencias, premios, garantías, antigüedad, precios ni testimonios.

## Ejecutar localmente

```bash
npm run serve
```

Abrir `http://127.0.0.1:4173/demos/construart-miami/`.

## QA

```bash
npm run qa:structural  # estructura, disclosure, rutas y cobertura de assets
npm run qa:js          # sintaxis JS del cliente y Worker
npm run qa:browser     # Chromium: desktop + mobile + interacciones + screenshots
npm run qa:worker      # build local de Wrangler, sin despliegue
npm run qa             # suite completa
```

Los resultados quedan en `qa/outputs/`, incluidas capturas y `browser-report.json`.

## Paquete social propuesto

`social/` contiene una bio, seis posts cuadrados, captions, avatar, mockup de cuadrícula y comparación antes/después. Todo está rotulado como propuesta no oficial y se regenera desde SVG con ImageMagick:

```bash
npm run social:generate
```

La auditoría específica del paquete está en `social/AUDIT_REPORT.md`.

## Cloudflare Worker (configurado, no desplegado)

`wrangler.toml` declara Static Assets y estas rutas:

- `koralidigital.com/demos/construart-miami/*`
- `www.koralidigital.com/demos/construart-miami/*`

`worker.js` elimina el prefijo antes de resolver el asset, mantiene rutas absolutas seguras bajo `/demos/construart-miami/` y añade cabeceras de seguridad. Esta entrega es **solo local**: no se creó repositorio, no se hizo push y no se ejecutó deploy.

## Demo pública

- [https://koralidigital.com/demos/construart-miami/](https://koralidigital.com/demos/construart-miami/)
- Demo conceptual no oficial; no procesa compras, pagos ni formularios reales.
