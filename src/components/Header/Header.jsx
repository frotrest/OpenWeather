import clsx from 'clsx';
import styles from './header.module.css';
import Container from '../../Container';
import Logo from '@assets/logo.png';
import { PiUserCircleDuotone } from 'react-icons/pi';
import ModalContext from '../../Contexts/ModalContext';
import { useContext, useState } from 'react';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import { MdOutlineArrowDownward } from 'react-icons/md';
import { AnimatePresence } from 'framer-motion';
import DropdownMenu from './Dropdown';

const Header = () => {
  const { userData, setOpenModal } = useContext(ModalContext);
  const [dropDown, setDropDown] = useState(false);
  return (
    <header className={clsx(styles.header)}>
      <Container className={clsx(styles.headerContent)} dataAnimate="fadeIn">
        <div className={clsx(styles.logoBar)}>
          <img
            src={Logo}
            alt="logo"
            className={clsx(styles.headerContentLogo)}
          />
          <nav className={clsx(styles.headerContentNavBar)}>
            <a href="#" className={clsx(styles.headerContentNavBarItem)}>
              Who we are
            </a>
            <a href="#" className={clsx(styles.headerContentNavBarItem)}>
              Contacts
            </a>
            <a href="#" className={clsx(styles.headerContentNavBarItem)}>
              Menu
            </a>
          </nav>
        </div>
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
        <div className={clsx(styles.dropMenu)}>
          <button
            className={clsx(styles.dropDown)}
            onClick={() => setDropDown((prev) => !prev)}
          >
            Menu
            {dropDown ? (
              <MdOutlineArrowForwardIos color="black" size={15} />
            ) : (
              <MdOutlineArrowDownward color="black" size={17} />
            )}
          </button>
        </div>
        <AnimatePresence>
          {dropDown && (
            <DropdownMenu dropDown={dropDown} setDropDown={setDropDown} />
          )}
        </AnimatePresence>
      </Container>
    </header>
  );
};

export default Header;
