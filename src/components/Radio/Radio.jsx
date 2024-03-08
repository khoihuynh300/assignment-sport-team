import radioStyles from './Radio.module.scss';

const Radio = ({ children, onChange = () => {}, ...rests }) => {
  return (
    <label className={`${radioStyles['radio-container']} no-select`}>
      <input type="radio" onChange={onChange} {...rests} />
      <span className={radioStyles['checkmark']}></span>
      {children && <span className={radioStyles['title']}>{children}</span>}
    </label>
  );
};

export default Radio;
