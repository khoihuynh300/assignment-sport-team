import { faCheck, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import styles from './ToastMessage.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { notify, turnOffNotify } from '../../features/toast/toastSlice';

const ToastMessageRender = () => {
  const { message } = useSelector((state) => state.toast);
  let icon = faCheck;

  const dispatch = useDispatch();

  useEffect(() => {
    let timer = setTimeout(() => {
      dispatch(turnOffNotify());
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`${styles['toast']}`}
      onClick={() => {
        dispatch(turnOffNotify());
      }}
    >
      <div className={styles['toast-container']}>
        <div className={styles['toast-icon']}>
          <FontAwesomeIcon className={styles['icon']} icon={icon} />
        </div>
        <div className={styles['toast-text']}>{message}</div>
      </div>
    </div>
  );
};

const ToastMessage = () => {
  const { isShow } = useSelector((state) => state.toast);

  return isShow && <ToastMessageRender />;
};

export default ToastMessage;
