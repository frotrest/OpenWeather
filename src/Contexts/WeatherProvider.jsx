import WeatherContext from './WeatherContext';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const WeatherProvider = ({ children }) => {
  const [isAlert, setIsAlert] = useState('');
  const [weather, setWeather] = useState(null);
  const [weathers, setWeathers] = useState(() => {
    const saved = localStorage.getItem('weathers');
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem('weathers', JSON.stringify(weathers));
  }, [weathers]);

  const refreshWeather = useCallback(
    async (id) => {
      try {
        const weatherRes = await axios.get(
          'https://api.openweathermap.org/data/2.5/weather',
          {
            params: {
              id,
              appid: import.meta.env.VITE_OPENWEATHER_KEY,
              units: 'metric',
            },
          }
        );

        setWeathers((prev) =>
          prev.map((item) => (item.id === id ? weatherRes.data : item))
        );

        if (weather && weather.id === id) {
          setWeather(weatherRes.data);
        }
      } catch (error) {
        setIsAlert(error.message);
      }
    },
    [weather]
  );
  useEffect(() => {
    const refreshAll = async () => {
      for (const item of weathers) {
        await refreshWeather(item.id);
      }
    };
    if (weathers.length) {
      refreshAll();
    }
  }, []);

  const findWeather = async (city) => {
    try {
      const geoRes = await axios.get(
        'https://api.openweathermap.org/geo/1.0/direct',
        {
          params: {
            q: city,
            appid: import.meta.env.VITE_OPENWEATHER_KEY,
            limit: 1,
          },
        }
      );

      if (!geoRes.data.length) {
        setIsAlert("City hasn't been found");
        return;
      }

      const { lat, lon } = geoRes.data[0];

      const weatherRes = await axios.get(
        'https://api.openweathermap.org/data/2.5/weather',
        {
          params: {
            lat,
            lon,
            appid: import.meta.env.VITE_OPENWEATHER_KEY,
            units: 'metric',
          },
        }
      );

      setWeather(weatherRes.data);
      setWeathers((prev) => {
        const exists = prev.some((item) => item.id === weatherRes.data.id);
        return exists ? prev : [...prev, weatherRes.data];
      });
    } catch (error) {
      setIsAlert(error.message);
    }
  };

  const removeWeather = (id) => {
    setWeathers((prev) => prev.filter((item) => item.id !== id));
  };

  const getDailyMinMax = async (id) => {
    const res = await axios.get(
      'https://api.openweathermap.org/data/2.5/forecast',
      {
        params: {
          id,
          appid: import.meta.env.VITE_OPENWEATHER_KEY,
          units: 'metric',
        },
      }
    );

    const today = new Date().toDateString();

    const todayTemps = res.data.list
      .filter((item) => new Date(item.dt * 1000).toDateString() === today)
      .map((item) => item.main.temp);

    return {
      min: todayTemps.length ? Math.min(...todayTemps) : null,
      max: todayTemps.length ? Math.max(...todayTemps) : null,
    };
  };

  const hourlyForecast = async (id) => {
    const hourlyResponse = await axios.get(
      'https://api.openweathermap.org/data/2.5/forecast',
      {
        params: {
          id,
          appid: import.meta.env.VITE_OPENWEATHER_KEY,
          units: 'metric',
        },
      }
    );
    return hourlyResponse.data.list;
  };

  const getWeeklyForecast = async (lat, lon) => {
    const res = await axios.get(
      'https://api.openweathermap.org/data/2.5/forecast',
      {
        params: {
          lat,
          lon,
          appid: import.meta.env.VITE_OPENWEATHER_KEY,
          units: 'metric',
        },
      }
    );

    const dailyMap = {};
    res.data.list.forEach((item) => {
      const dateObj = new Date(item.dt * 1000);

      const weekday = dateObj.toLocaleDateString('en-US', { weekday: 'short' }); // Fri
      const month = dateObj.toLocaleDateString('en-US', { month: 'short' }); // Oct
      const day = dateObj.getDate(); // 13

      const date = `${weekday}, ${month} ${day}`;

      if (!dailyMap[date]) {
        dailyMap[date] = { temps: [], weather: item.weather[0] };
      }
      dailyMap[date].temps.push(item.main.temp);
    });

    return Object.entries(dailyMap).map(([date, data]) => ({
      date,
      min: data.temps.length ? Math.min(...data.temps) : null,
      max: data.temps.length ? Math.max(...data.temps) : null,
      weather: data.weather,
    }));
  };

  return (
    <WeatherContext.Provider
      value={{
        weather,
        weathers,
        isAlert,
        findWeather,
        refreshWeather,
        removeWeather,
        setIsAlert,
        getDailyMinMax,
        hourlyForecast,
        getWeeklyForecast,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;
