import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';

import MainPage from '@/pages/MainPage';
import SecondPage from '@/pages/SecondPage';
import {
  BUILDINGS_PAGE_ROUTE,
  Colors,
  MAIN_PAGE_ROUTE,
  SECOND_PAGE_ROUTE,
  NEW_BUILDING_PAGE_ROUTE,
<<<<<<< HEAD
  TASKS_PAGE_ROUTE,
=======
  PARLEY_PAGE_ROUTE,
>>>>>>> db8092e9308b5e4d8904150c30d2406abf1aff2b
} from '@/consts';
import PageLayout from '@/modules/PageLayout';
import BuildingPage from '@/pages/BuildingPage';
import NewBuildingPage from '@/pages/NewBuildingPage/NewBuildingPage';
<<<<<<< HEAD
import TaskPage from '@/pages/TaskPage';
=======
import ParleyPage from '@/pages/ParleyPage';
>>>>>>> db8092e9308b5e4d8904150c30d2406abf1aff2b

function App() {
  return (
    <div className='App'>
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
                path={`${BUILDINGS_PAGE_ROUTE}/:id`}
                element={
                  <BuildingPage />
                }
              />
              <Route
<<<<<<< HEAD
                path={TASKS_PAGE_ROUTE}
                element={
                  <TaskPage />
                }
              />
              <Route
                path={NEW_BUILDING_PAGE_ROUTE}
                element={
                  <NewBuildingPage />
                }
              />
=======
                path={`${PARLEY_PAGE_ROUTE}/:id`}
                element={
                  <ParleyPage />
                }
              />
                <Route
                  path={NEW_BUILDING_PAGE_ROUTE}
                  element={
                    <NewBuildingPage />
                  }
                />
>>>>>>> db8092e9308b5e4d8904150c30d2406abf1aff2b
            </Routes>
          </PageLayout>
        </BrowserRouter>
      </ConfigProvider>
    </div>
  );
}

export default App;
