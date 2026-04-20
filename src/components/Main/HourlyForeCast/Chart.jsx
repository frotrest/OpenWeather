import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import styles from './hourlyForeCast.module.css';
import clsx from 'clsx';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const HourlyChart = ({ forecast }) => {
  const labels = forecast.map((item) =>
    new Date(item.dt * 1000).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    })
  );

  const temps = forecast.map((item) => item.main.temp);

  const data = {
    labels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: temps,
        borderColor: 'orange',
        backgroundColor: 'rgba(255,165,0,0.3)',
        tension: 0.3,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        titleFont: { size: 14, family: 'Montserrat' },
        backgroundColor: 'rgba(238, 74, 33, 0.9)',
        titleColor: '#fff',
        bodyColor: '#f0d911',
        borderColor: '#ff868d',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        displayColors: false,
      },
    },
    scales: {
      x: {
        position: 'top',
      },
      y: {
        beginAtZero: false,
        ticks: {
          callback: (value) => `${value}°C`,
        },
      },
    },
  };

  return (
    <Line
      data={data}
      options={options}
      className={clsx(styles.chartForecast)}
    />
  );
};

const HourlyChartMobile = ({ forecast }) => {
  const labels = forecast.map((item) =>
    new Date(item.dt * 1000).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    })
  );
  const temps = forecast.map((item) => item.main.temp);

  const data = {
    labels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: temps,
        borderColor: 'orange',
        tension: 0.3,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        titleFont: { size: 14, family: 'Montserrat' },
        backgroundColor: 'rgba(238, 74, 33, 0.9)',
        titleColor: '#fff',
        bodyColor: '#f0d911',
        borderColor: '#ff868d',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        displayColors: false,
      },
    },
    scales: {
      x: {
        position: 'top',
        ticks: {
          callback: function (val, index, ticks) {
            if (
              index === 0 ||
              index === Math.floor(ticks.length / 2) ||
              index === ticks.length - 1
            ) {
              return this.getLabelForValue(val);
            }
            return '';
          },
        },
      },
      y: {
        beginAtZero: false,
        ticks: {
          stepSize: 3,
          callback: (value) => `${value}°C`,
        },
      },
    },
  };

  return (
    <Line
      data={data}
      options={options}
      className={clsx(styles.chartForecastMobile)}
    />
  );
};

export { HourlyChart, HourlyChartMobile };
