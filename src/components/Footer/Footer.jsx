import clsx from 'clsx';
import styles from './footer.module.css';
import Container from '../../Container';
import Logo from '@assets/logo.png';
import Facebook from '@assets/facebook.png';
import Instagram from '@assets/instagram.png';
import WhatsApp from '@assets/whatsapp.png';

const Footer = () => {
  return (
    <footer className={clsx(styles.footer)}>
      <Container className={clsx(styles.footerContent)} dataAnimate="fadeInUp">
        <div className={clsx(styles.contactAddress)}>
          <img
            src={Logo}
            alt="logo-footer"
            className={clsx(styles.footerContentLogo)}
          />
          <div className={clsx(styles.footerAddress)}>
            <h2 className={clsx(styles.footerAddressTitle)}>Address</h2>
            <a href="#" className={clsx(styles.footerAddressItem)}>
              Svobody str. 35 Kyiv Ukraine
            </a>
          </div>
        </div>
        <div className={clsx(styles.footerNetworks)}>
          <h2 className={clsx(styles.footerNetworksTitle)}>Contact us</h2>
          <div className={clsx(styles.networks)}>
            <a href="#" className={clsx(styles.networkLink)}>
              <img
                src={Facebook}
                alt="facebook"
                className={clsx(styles.network)}
              />
            </a>
            <a href="#" className={clsx(styles.networkLink)}>
              <img
                src={Instagram}
                alt="instagram"
                className={clsx(styles.network)}
                width={55}
              />
            </a>
            <a href="#" className={clsx(styles.networkLink)}>
              <img
                src={WhatsApp}
                alt="whatsapp"
                className={clsx(styles.network)}
                width={42}
              />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
