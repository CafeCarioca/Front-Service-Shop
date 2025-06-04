# Café Carioca ☕

Aplicación de e‑commerce desarrollada con **React** para la venta de cafés de especialidad.

## Características

- Navegación con **React Router 6**.
- Estilos con **styled-components** y **Bootstrap**.
- Integración con **MercadoPago** para pagos.
- Carrito de compras persistente mediante `localStorage`.
- Componentes reutilizables y diseño responsive.

## Instalación

```bash
npm install
npm start
```

Esto levantará la aplicación en `http://localhost:3000`.

Para generar la versión de producción:

```bash
npm run build
```

## Despliegue

El proyecto cuenta con un workflow de GitHub Actions que publica el contenido de `build/` en un bucket de **AWS S3** cada vez que se actualiza la rama `main`.

## Créditos

Proyecto realizado por [Tirelo Mputle](https://github.com/Tirelo-Mputle) y adaptado para Café Carioca.
