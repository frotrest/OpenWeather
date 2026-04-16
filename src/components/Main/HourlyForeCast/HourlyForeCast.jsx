import styles from './hourlyForeCast.module.css';
import clsx from 'clsx';
import Container from '../../../Container';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const HourlyForeCast = ({ children }) => {
  return (
    <motion.section
      className={clsx(styles.forecast)}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      <Container className={clsx(styles.forecastContent)} dataAnimate="fadeIn">
        <h2 className={clsx(styles.forecastContentTitle)}>Hourly forecast</h2>
        {children}
      </Container>
    </motion.section>
  );
};

export default HourlyForeCast;
