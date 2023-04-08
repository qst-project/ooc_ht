import { ReactNode, useState } from 'react';
import { Layout } from 'antd';

import AppHeader from '@/components/Header/Header';
import NotoficationsList from '@/components/NotificationsList/NotificationsList';


const { Header, Content } = Layout;

type PropsWithChildren<P> = P & { children: ReactNode };

function PageLayout({ children }: PropsWithChildren<any>) {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout
            style={{
                height: '100%',
            }}>
            <Header style={{
                background: '#FFFFFF',
                padding: 0,
                height: '100px',
                borderBottom: '1px solid #D9D9D9',
            }}>
                <AppHeader
                    setCollapsed={setCollapsed}
                    collapsed={collapsed}
                />
            </Header>
            <Layout>
                <Content className='site-layout' style={{
                    padding: '1rem',
                    width: '100%',
                    overflow: 'auto',
                    background: '#FFFFFF',
                }}>
                    {children}
                </Content>
                <Layout.Sider
                    collapsed={collapsed}
                    collapsedWidth={'300px'}
                    width={0}
                    style={{
                        background: 'none',
                    }}
                >
                    <NotoficationsList />
                </Layout.Sider>
            </Layout>
        </Layout>
    );
}

export default PageLayout;