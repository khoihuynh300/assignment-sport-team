import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import routes from './routes';
import DefaultLayout from './components/DefaultLayout';
import ToastMessage from './components/ToastMessage/ToastMessage';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.component;
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <DefaultLayout>
                    <Page />
                  </DefaultLayout>
                }
              />
            );
          })}
        </Routes>
      </Router>
      {/* Toast message */}
      <ToastMessage />
    </div>
  );
}

export default App;
