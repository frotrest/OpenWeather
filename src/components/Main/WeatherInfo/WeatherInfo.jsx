import { useContext, useState, useEffect } from 'react';
import WeatherContext from '../../../Contexts/WeatherContext';
import Container from '../../../Container';
import styles from './weatherInfo.module.css';
import clsx from 'clsx';
import { IoMdRefresh } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import WeatherAdditionalInfo from '../WeatherAdditionalInfo/WeatherAdditionalInfo';
import HourlyForeCast from '../HourlyForeCast/HourlyForeCast';
import { HourlyChart, HourlyChartMobile } from '../HourlyForeCast/Chart';
import WeeklyForeCast from '../WeekForecast/WeeklyForecast';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';

const FavoriteButton = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <button
      className={clsx(styles.weatherActionsBtn)}
      onClick={() => setIsFavorite(!isFavorite)}
    >
      {isFavorite ? (
        <FaHeart size={30} color="red" />
      ) : (
        <FaRegHeart size={30} />
      )}
    </button>
  );
};

const WeatherInfo = () => {
  const {
    weathers,
    removeWeather,
    refreshWeather,
    hourlyForecast,
    getWeeklyForecast,
  } = useContext(WeatherContext);
  const [selectedId, setSelectedId] = useState(null);
  const [hourlyData, setHourlyData] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [showHourly, setShowHourly] = useState(false);
  const [showWeekly, setShowWeekly] = useState(false);
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    if (selectedId && showHourly) {
      hourlyForecast(selectedId).then(setHourlyData);
    }
  }, [selectedId, showHourly, hourlyForecast]);
  useEffect(() => {
    if (selectedId && showWeekly) {
      const city = weathers.find((w) => w.id === selectedId);
      getWeeklyForecast(city.coord.lat, city.coord.lon).then(setWeeklyData);
    }
  }, [selectedId, showWeekly, getWeeklyForecast, weathers]);

  function formatLocalTime(item) {
    const utc = item.dt * 1000;
    const local = utc + item.timezone * 1000;
    return new Date(local).toLocaleString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC',
    });
  }

  if (!weathers.length) {
    return (
      <section className={clsx(styles.weatherCards)}>
        <Container
          className={clsx(styles.weatherCardsContent)}
          dataAnimate="fadeIn"
        >
          <h2 className={clsx(styles.weatherInfoErrorTitle)}>
            There's no weather data yet
          </h2>
        </Container>
      </section>
    );
  }
  return (
    <>
      <section className={clsx(styles.weatherCards)}>
        <Container
          className={clsx(styles.weatherCardsContent)}
          dataAnimate="fadeInLeft"
        >
          <AnimatePresence>
            {weathers.map((item) => {
              return (
                <motion.div
                  layout
                  className={clsx(styles.weatherCard)}
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{
                    opacity: 0,
                    scale: 0.5,
                    transition: { duration: 0.2 },
                  }}
                >
                  <div className={clsx(styles.weatherRegion)}>
                    <h3 className={clsx(styles.weatherRegionTitle)}>
                      {item.name}
                    </h3>
                    <h3 className={clsx(styles.weatherRegionTitle)}>
                      {item.sys.country}
                    </h3>
                  </div>
                  <h2 className={clsx(styles.weatherCardTitle)}>
                    {formatLocalTime(item)}
                  </h2>
                  <div className={clsx(styles.weatherCardForecasts)}>
                    <button
                      className={clsx(styles.weatherCardForecastsBtn)}
                      onClick={() => {
                        setSelectedId(item.id);
                        setShowHourly(true);
                        setShowDetails(false);
                        setShowWeekly(false);
                      }}
                    >
                      Hourly forecast
                    </button>
                    <button
                      className={clsx(styles.weatherCardForecastsBtn)}
                      onClick={() => {
                        setSelectedId(item.id);
                        setShowWeekly(true);
                        setShowHourly(false);
                        setShowDetails(false);
                      }}
                    >
                      Weekly forecast
                    </button>
                  </div>
                  <div className={clsx(styles.weatherMain)}>
                    <img
                      src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                      alt={item.weather[0].description}
                      className={clsx(styles.weatherMainImg)}
                    />
                    <div className={clsx(styles.weatherImgExplanation)}>
                      <p className={clsx(styles.weatherTemp)}>
                        {Math.round(item.main.temp)}°C
                      </p>
                    </div>
                  </div>
                  <div className={clsx(styles.weatherActions)}>
                    <button
                      className={clsx(styles.weatherActionsBtn)}
                      onClick={() => refreshWeather(item.id)}
                    >
                      <IoMdRefresh size={30} />
                    </button>
                    <FavoriteButton />
                    <button
                      className={clsx(styles.weatherActionsBtnMore)}
                      onClick={() => {
                        setSelectedId(item.id);
                        setShowDetails(true);
                        setShowHourly(false);
                        setShowWeekly(false);
                      }}
                    >
                      See more
                    </button>
                    <button
                      className={clsx(styles.weatherActionsBtn)}
                      onClick={() => {
                        removeWeather(item.id);
                        if (selectedId === item.id) {
                          setSelectedId(null);
                        }
                      }}
                    >
                      <MdDelete size={30} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </Container>
      </section>
      <AnimatePresence mode="wait">
        {selectedId && showDetails && (
          <WeatherAdditionalInfo
            key={`details-${selectedId}`}
            data={weathers.find((w) => w.id === selectedId)}
          />
        )}
        {selectedId && showHourly && (
          <HourlyForeCast key={`hourly-${selectedId}`}>
            <HourlyChart forecast={hourlyData.slice(0, 8)} />
            <HourlyChartMobile forecast={hourlyData.slice(0, 3)} />
          </HourlyForeCast>
        )}
        {selectedId && showWeekly && (
          <WeeklyForeCast
            key={`weekly-${selectedId}`}
            weeklyData={weeklyData}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default WeatherInfo;
