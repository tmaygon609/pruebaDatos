import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div>
        <p>2024 IES Al-Mudeyne.</p>
      </div>
      <div style={styles.contactoCSS}>
        <p>Contacto: <a href="mailto:pmargom596@iesalmudeyne.es">pmargom596@iesalmudeyne.es</a></p>
        <p>Dirección: Plaza España, Sevilla</p>
      </div>
      <div style={styles.navegacionCSS}>
        <a href="/acerca">Acerca de nosotros</a>
        <a href="/servicios">Nuestros Servicios</a>
        <a href="/contact">Contacto</a>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#333',
    color: '#fff',
    textAlign: 'center',
    padding: '20px',
    position: 'fixed',
    bottom: '0',
    width: '100%',
  },
  contactoCSS: {
    marginTop: '10px',
  },
  navegacionCSS: {
    marginTop: '20px',
  },
};

export default Footer;
