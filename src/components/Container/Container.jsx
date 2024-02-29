import containerStyles from './Container.module.scss';

const Container = ({ children }) => {
  return <div className={containerStyles['container']}>{children}</div>;
};

export default Container;
