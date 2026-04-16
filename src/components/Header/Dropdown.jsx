import { useContext } from 'react';
import styles from './dropdown.module.css';
import clsx from 'clsx';
import ModalContext from '../../Contexts/ModalContext';
import { PiUserCircleDuotone } from 'react-icons/pi';
import Container from '../../Container';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const DropdownMenu = () => {
  const { userData, setOpenModal } = useContext(ModalContext);
  return (
    <motion.div
      className={clsx(styles.dropdownMenu)}
      key="dropdown-menu"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Container className={clsx(styles.dropdownMenuContent)}>
        <nav className={clsx(styles.DropdownContentNavBar)}>
          <a href="#" className={clsx(styles.DropdownContentNavBarItem)}>
            Who we are
          </a>
          <a href="#" className={clsx(styles.DropdownContentNavBarItem)}>
            Contacts
          </a>
          <a href="#" className={clsx(styles.DropdownContentNavBarItem)}>
            Menu
          </a>
        </nav>
        <div className={clsx(styles.personalProfile)}>
          {userData.userName ? (
            <h2 className={clsx(styles.personalProfileName)}>
              {userData.userName}
            </h2>
          ) : (
            <button
              className={clsx(styles.personalProfileBtn)}
              onClick={() => setOpenModal(true)}
            >
              Sign Up
            </button>
          )}
          <PiUserCircleDuotone size={50} style={{ cursor: 'pointer' }} />
        </div>
      </Container>
    </motion.div>
  );
};

export default DropdownMenu;
