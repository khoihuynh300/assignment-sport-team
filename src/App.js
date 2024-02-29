import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import routes from './routes';
import DefaultLayout from './components/DefaultLayout';
import { ConfigProvider } from 'antd';

function App() {
  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#3dcbb1',
          },
        }}
      >
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
      </ConfigProvider>
    </div>
  );
}

export default App;
