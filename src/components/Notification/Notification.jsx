import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import styles from './Notification.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Notification = ({ message, type = 'success' }) => {
  return (
    <div className={styles['notify-wrapper']}>
      <div className={styles['icon']}>
        {type == 'success' && <FontAwesomeIcon icon={faCircleCheck} />}
      </div>
      <div className={styles['message']}>{message}</div>
    </div>
  );
};

export default Notification;
