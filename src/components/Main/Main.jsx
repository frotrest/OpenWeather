import Hero from './Hero/Hero';
import WeatherInfo from './WeatherInfo/WeatherInfo';
import News from './News/News';
import Nature from './Nature/Nature';

const Main = () => {
  return (
    <main>
      <Hero />
      <WeatherInfo />
      {/* <News /> */}
      <Nature />
    </main>
  );
};

export default Main;
