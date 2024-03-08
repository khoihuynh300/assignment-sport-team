import checkboxStyles from './Checkbox.module.scss';

const Checkbox = ({ children, onChange = () => {}, style, ...rests }) => {
  return (
    <label className={`${checkboxStyles['checkbox-container']} no-select`}>
      <input type="checkbox" onChange={onChange} {...rests} />
      <span className={checkboxStyles['checkmark']} style={style}></span>
      {children && <span className={checkboxStyles['title']}>{children}</span>}
    </label>
  );
};

export default Checkbox;
