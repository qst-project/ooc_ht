import { ReactNode } from 'react';
import { Layout } from 'antd';

import AppHeader from '@/components/Header/Header';

const { Header, Content } = Layout;

type PropsWithChildren<P> = P & { children: ReactNode };

function PageLayout({ children }: PropsWithChildren<any>) {
    return (
        <Layout style={{
            height: '100%',
        }}>
            <Header style={{
                background: '#FFFFFF',
                padding: 0,
                height: '100px',
                borderBottom: '1px solid #D9D9D9',
            }}>
                <AppHeader />
            </Header>
            <Content className='site-layout' style={{
                padding: '1rem',
                height: '100%',
                overflow: 'auto',
                background: '#FFFFFF',
            }}>
                {children}
            </Content>
        </Layout>
    );
}

export default PageLayout;