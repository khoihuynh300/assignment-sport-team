import { useEffect } from 'react';
import modalStyles from './Modal.module.scss';

const Modal = ({
  children,
  title,
  footer = <></>,
  open,
  onCancel = () => {},
  bottomSheet = false,
}) => {
  useEffect(() => {
    open ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'auto');
  }, [open]);
  return (
    <div className={`${modalStyles['modal']} ${open && modalStyles['open']}`} onClick={onCancel}>
      <div
        className={`${modalStyles['modal-content']} ${bottomSheet && modalStyles['bottom-sheet']}`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={modalStyles['close']} onClick={onCancel}>
          &times;
        </div>
        {title && <div className={modalStyles['modal-header']}>{title}</div>}
        <div>{children}</div>
        <div className={modalStyles['footer']}>{footer}</div>
      </div>
    </div>
  );
};

export default Modal;
