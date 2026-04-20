import styles from './weekforecast.module.css';
import clsx from 'clsx';
import Container from '../../../Container';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const WeeklyForeCast = ({ weeklyData }) => {
  return (
    <motion.section
      className={clsx(styles.WeeklyForeCast)}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      <Container className={clsx(styles.WeeklyForeCastContent)}>
        <h2 className={clsx(styles.WeeklyForeCastContentTitle)}>
          5-day forecast
        </h2>
        <div className={clsx(styles.weeklyForecastList)}>
          {weeklyData.map((day) => (
            <div className={clsx(styles.weeklyForecastItem)} key={day.date}>
              <h5 className={clsx(styles.weeklyForecastTitle)}>{day.date}</h5>
              <div className={clsx(styles.weeklyForecastIcon)}>
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather.icon}@2x.png`}
                  alt={day.weather.description}
                  className={clsx(styles.weeklyForecastIconImg)}
                />
                <h5 className={clsx(styles.weeklyForecastTitle)}>
                  {Math.round(day.max)} / {Math.round(day.min)}°C
                </h5>
              </div>
              <h5 className={clsx(styles.weeklyForecastTitle)}>
                {day.weather.description}
              </h5>
            </div>
          ))}
        </div>
      </Container>
    </motion.section>
  );
};

export default WeeklyForeCast;
