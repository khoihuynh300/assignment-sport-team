import buttonStyles from './Button.module.scss';

const Button = ({ children, primary, disabled, onClick = () => {}, ...rest }) => {
  if (disabled) {
    onClick = () => {};
  }
  return (
    <button
      className={`${primary && buttonStyles['primary']} ${disabled && buttonStyles['disabled']}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
