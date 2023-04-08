import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';

import MainPage from '@/pages/MainPage';
import SecondPage from '@/pages/SecondPage';
import {
  BUILDING_PAGE_ROUTE,
  Colors,
  MAIN_PAGE_ROUTE,
  SECOND_PAGE_ROUTE,
} from '@/consts';
import PageLayout from '@/modules/PageLayout';
import BuildingPage from '@/pages/BuildingPage';

function App() {
  return (
    // <div className='App'>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: Colors.PRIMARY,
          },
        }}
      >
        <BrowserRouter>
          <PageLayout>
            <Routes>
              <Route
                path={MAIN_PAGE_ROUTE}
                element={
                  <MainPage />
                }
              />
              <Route
                path={SECOND_PAGE_ROUTE}
                element={
                  <SecondPage />
                }
              />
              <Route
                path={BUILDING_PAGE_ROUTE}
                element={
                  <BuildingPage />
                }
              />
            </Routes>
          </PageLayout>
        </BrowserRouter>
      </ConfigProvider>
    // </div>
  );
}

export default App;
