import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import Modal from './components/Modal/Modal';
import WeatherProvider from './Contexts/WeatherProvider';
import ModalProvider from './Contexts/ModalProvider';
import { useAnimateOnScroll } from './AnimateWatcher';

function App() {
  useAnimateOnScroll();
  return (
    <>
      <WeatherProvider>
        <ModalProvider>
          <Modal />
          <Header />
          <Main />
          <Footer />
        </ModalProvider>
      </WeatherProvider>
    </>
  );
}

export default App;
