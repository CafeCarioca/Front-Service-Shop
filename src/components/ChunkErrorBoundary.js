import React from "react";

// Las rutas lazy pueden fallar al descargar su chunk (ej: un deploy borró
// los archivos hasheados viejos mientras el usuario tenía la app abierta).
// Sin esto, React desmonta todo el árbol y queda la pantalla en blanco —
// el peor caso es volviendo de MercadoPago a /thank-you.
// Ante un error de chunk recargamos la página una sola vez para tomar la
// versión nueva; si vuelve a fallar, mostramos un botón de reintentar.
class ChunkErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    const isChunkError = /Loading chunk|ChunkLoadError|Loading CSS chunk/i.test(
      error?.message || ""
    );
    if (isChunkError && !sessionStorage.getItem("chunk_reload")) {
      sessionStorage.setItem("chunk_reload", "1");
      window.location.reload();
    }
  }

  handleRetry = () => {
    sessionStorage.removeItem("chunk_reload");
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "4rem 1rem", textAlign: "center" }}>
          <p>Ocurrió un error al cargar la página.</p>
          <button onClick={this.handleRetry}>Reintentar</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ChunkErrorBoundary;
