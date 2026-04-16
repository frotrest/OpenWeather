import ModalContext from './ModalContext';
import { useEffect, useState } from 'react';

const ModalProvider = ({ children }) => {
  const [openModal, setOpenModal] = useState(false);
  const [userData, setUserData] = useState({
    userName: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (userData.userName || userData.email || userData.password) {
      localStorage.setItem('userWeatherData', JSON.stringify(userData));
    }
  }, [userData]);

  useEffect(() => {
    const stored = localStorage.getItem('userWeatherData');
    if (stored) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUserData(JSON.parse(stored));
    }
  }, []);
  return (
    <ModalContext.Provider
      value={{
        openModal,
        setOpenModal,
        setUserData,
        userData,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
