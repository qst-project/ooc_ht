import React, { ReactNode, useState } from 'react';
import { Layout, theme } from 'antd';

import Sidebar from '@/components/Sidebar';
import AppHeader from '@/components/Header';

const { Header, Content } = Layout;

type PropsWithChildren<P> = P & { children: ReactNode };

function PageLayout({ children }: PropsWithChildren<any>) {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorFillContent },
    } = theme.useToken();

    return (
        <Layout style={{ height: '100%' }}>
            <Sidebar
                collapsed={collapsed}
            />
            <Layout style={{ height: '100%' }}>
                <Header style={{ padding: '0 10px', background: colorFillContent }}>
                    <AppHeader setCollapsed={setCollapsed} collapsed={collapsed} />
                </Header>
                <Content className='site-layout'>
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}

export default PageLayout;