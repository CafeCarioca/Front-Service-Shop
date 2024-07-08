import React, { useEffect } from 'react';

const TrustmaryWidget = () => {
  useEffect(() => {
    // Definir la función del script
    const initTrustmary = () => {
      (function (w, d, s, o, r, js, fjs) {
        w[r] = w[r] || function () {
          (w[r].q = w[r].q || []).push(arguments);
        };
        w[r]('app', 'zxCKO8SRRp');
        if (d.getElementById(o)) return;
        js = d.createElement(s);
        fjs = d.getElementsByTagName(s)[0];
        js.id = o;
        js.src = 'https://embed.trustmary.com/embed.js';
        js.async = 1;
        fjs.parentNode.insertBefore(js, fjs);
      }(window, document, 'script', 'trustmary-embed', 'tmary'));
    };

    // Llamar a la función para insertar el script
    initTrustmary();

    // Limpiar el efecto al desmontar el componente
    return () => {
      const script = document.getElementById('trustmary-embed');
      if (script) {
        script.remove();
      }
    };
  }, []);

  return <div data-trustmary-widget="IeCQuQ0yn"></div>;
};

export default TrustmaryWidget;