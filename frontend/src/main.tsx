import React from 'react'
import ReactDOM from 'react-dom/client'
import { HomePage } from '@pages/HomePage';
import './scss/index.scss';
import { ConfigProvider } from 'antd';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ConfigProvider
      theme={{
          token: {},
      }}
  >
      <HomePage />
  </ConfigProvider>,
)
