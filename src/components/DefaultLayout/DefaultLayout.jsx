import Container from '../Container';
import Header from '../Header';
import Footer from '../Footer';

const DefaultLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <Container>{children}</Container>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
