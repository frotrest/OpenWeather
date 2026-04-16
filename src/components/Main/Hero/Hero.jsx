import clsx from 'clsx';
import styles from './hero.module.css';
import Container from '../../../Container';
import { FaSearch } from 'react-icons/fa';
import { useState, useContext } from 'react';
import WeatherContext from '../../../Contexts/WeatherContext';
import { Alert, Snackbar, Fade } from '@mui/material';

const Hero = () => {
  const [searcher, setSearcher] = useState('');
  const { isAlert, findWeather, setIsAlert } = useContext(WeatherContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    findWeather(searcher);
  };
  return (
    <section className={clsx(styles.hero)}>
      <Container className={clsx(styles.heroContent)} dataAnimate="fadeIn">
        <h1 className={clsx(styles.heroContentTitle)}>Weather dashboard</h1>
        <div className={clsx(styles.heroAdditionalInformation)}>
          <h5 className={clsx(styles.heroAdditionalInformationTitle)}>
            Create your personal list of favorite cities and always be aware of
            the weather.
          </h5>
          <div className={clsx(styles.heroAdditionalInformationLine)}></div>
          <h5 className={clsx(styles.heroAdditionalInformationTitle)}>
            {new Date().toLocaleDateString('en-GB', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </h5>
        </div>
        <form className={clsx(styles.heroForm)} onSubmit={handleSubmit}>
          <label htmlFor="heroFormField">
            <input
              type="text"
              name=""
              id="heroFormField"
              className={clsx(styles.heroFormFieldInput)}
              placeholder="Search location..."
              value={searcher}
              onChange={(e) => setSearcher(e.target.value)}
            />
          </label>
          <button type="submit" className={clsx(styles.heroFormBtn)}>
            <FaSearch className={clsx(styles.heroFormBtnImg)} />
          </button>
        </form>
        <Snackbar
          open={Boolean(isAlert)}
          autoHideDuration={3000}
          onClose={() => setIsAlert('')}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          TransitionComponent={Fade}
        >
          <Alert
            variant="filled"
            severity="error"
            onClose={() => setIsAlert('')}
          >
            {isAlert}
          </Alert>
        </Snackbar>
      </Container>
    </section>
  );
};

export default Hero;
