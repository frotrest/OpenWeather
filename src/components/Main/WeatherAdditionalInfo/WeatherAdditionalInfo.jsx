import { useContext, useState, useEffect } from 'react';
import WeatherContext from '../../../Contexts/WeatherContext';
import Container from '../../../Container';
import styles from './weatherAdditionalInfo.module.css';
import clsx from 'clsx';
import thermometer from '@assets/thermometer.webp';
import cloud from '@assets/cloud.webp';
import calculator from '@assets/calculator.webp';
import wind from '@assets/wind.webp';
import view from '@assets/view.webp';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const WeatherAdditionalInfo = ({ data }) => {
  const { getDailyMinMax } = useContext(WeatherContext);
  const [dailyRange, setDailyRange] = useState(null);

  useEffect(() => {
    if (data.id) {
      getDailyMinMax(data.id).then(setDailyRange);
    }
  }, [data, getDailyMinMax]);
  if (!data) return null;
  return (
    <motion.section
      className={clsx(styles.weatherAdditionalCards)}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      <Container className={clsx(styles.weatherAdditionalCardsContent)}>
        <div className={clsx(styles.weatherAdditionalCard)}>
          <h5 className={clsx(styles.weatherAdditionalCardSubTitle)}>
            Feels like
          </h5>
          <h2 className={clsx(styles.weatherAdditionalCardTitle)}>
            {Math.round(data.main.feels_like)}°C
          </h2>
          <img
            src={thermometer}
            alt="thermometer"
            className={clsx(styles.weatherAdditionalCardImg)}
          />
        </div>
        <div className={clsx(styles.weatherAdditionalCard)}>
          <h5 className={clsx(styles.weatherAdditionalCardSubTitle)}>Min ℃</h5>
          <h2 className={clsx(styles.weatherAdditionalCardTitle)}>
            {dailyRange && isFinite(dailyRange.min)
              ? Math.round(dailyRange.min)
              : '—'}
            °C
          </h2>
          <h5 className={clsx(styles.weatherAdditionalCardSubTitle)}>Max ℃</h5>
          <h2 className={clsx(styles.weatherAdditionalCardTitle)}>
            {dailyRange && isFinite(dailyRange.max)
              ? Math.round(dailyRange.max)
              : '—'}
            °C
          </h2>
        </div>
        <div className={clsx(styles.weatherAdditionalCard)}>
          <h5 className={clsx(styles.weatherAdditionalCardSubTitle)}>
            Humidity
          </h5>
          <h2 className={clsx(styles.weatherAdditionalCardTitle)}>
            {data.main.humidity}%
          </h2>
          <img
            src={cloud}
            alt="cloud"
            className={clsx(styles.weatherAdditionalCardImg)}
          />
        </div>
        <div className={clsx(styles.weatherAdditionalCard)}>
          <h5 className={clsx(styles.weatherAdditionalCardSubTitle)}>
            Pressure
          </h5>
          <h2 className={clsx(styles.weatherAdditionalCardTitle)}>
            {data.main.pressure} hPa
          </h2>
          <img
            src={calculator}
            alt="calculator"
            className={clsx(styles.weatherAdditionalCardImg)}
          />
        </div>
        <div className={clsx(styles.weatherAdditionalCard)}>
          <h5 className={clsx(styles.weatherAdditionalCardSubTitle)}>
            Wind speed
          </h5>
          <h2 className={clsx(styles.weatherAdditionalCardTitle)}>
            {(data.wind.speed * 3.6).toFixed(1)} km/h
          </h2>
          <img
            src={wind}
            alt="wind"
            className={clsx(styles.weatherAdditionalCardImg)}
          />
        </div>
        <div className={clsx(styles.weatherAdditionalCard)}>
          <h5 className={clsx(styles.weatherAdditionalCardSubTitle)}>
            Visibility
          </h5>
          <h2 className={clsx(styles.weatherAdditionalCardTitle)}>
            {(data.visibility / 1000).toFixed(1)} km
          </h2>
          <img
            src={view}
            alt="view"
            className={clsx(styles.weatherAdditionalCardImg)}
          />
        </div>
      </Container>
    </motion.section>
  );
};

export default WeatherAdditionalInfo;
