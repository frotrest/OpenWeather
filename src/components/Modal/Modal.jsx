import clsx from 'clsx';
import styles from './modal.module.css';
import { useContext, useState, useEffect } from 'react';
import ModalContext from '../../Contexts/ModalContext';

const Modal = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { openModal, setOpenModal, setUserData } = useContext(ModalContext);
  useEffect(() => {
    document.body.style.overflow = openModal ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [openModal]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData({ userName, email, password });
    setUserName('');
    setEmail('');
    setPassword('');
    setOpenModal(false);
  };
  return (
    <>
      {openModal && (
        <div
          className={clsx(styles.modalOverlay)}
          onClick={() => setOpenModal(false)}
        >
          <div
            className={clsx(styles.modalContent)}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className={clsx(styles.modalContentTitle)}>Sign up</h2>
            <form className={clsx(styles.modalForm)} onSubmit={handleSubmit}>
              <label className={clsx(styles.modalFormLabel)}>
                Username
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className={clsx(styles.modalFormInput)}
                  required
                  placeholder="Username"
                />
              </label>
              <label className={clsx(styles.modalFormLabel)}>
                E-Mail
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={clsx(styles.modalFormInput)}
                  required
                  placeholder="E-Mail"
                />
              </label>
              <label className={clsx(styles.modalFormLabel)}>
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={clsx(styles.modalFormInput)}
                  required
                  placeholder="Password"
                />
              </label>
              <button className={clsx(styles.modalFormBtn)} type="submit">
                Sign up
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
