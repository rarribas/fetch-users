import { useState, useEffect } from 'react';
import styles from './Modal.module.scss';

export default function Modal({ showModal, onModalClosed, children }) {
  const [show, setShow] = useState(showModal);

  useEffect(() => {
    setShow(showModal);
  },[showModal])

  const onOverlayClicked = () => {
    setShow(false);
    onModalClosed();
    console.log("overlay clicked");
  }

  return (
    <>
      {show && (
        <>
          <div onClick={onOverlayClicked} className={styles['overlay']}></div>
          <div className={styles['modal']}>
            {children}
          </div>
        </>
      )}
    </>
  );
}
