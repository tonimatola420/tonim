import { ReactNode, useContext, useEffect } from 'react';
import Header from '@/components/Header/Header.component';
import PageTitle from './PageTitle.component';
import Footer from '@/components/Footer/Footer.component';
import Navigation from './Navigation';
import { Typography, Space, Divider, } from 'antd';
const { Title } = Typography;
import HeaderContent from '@/components/Layout/LogoutMenu';

interface ILayoutProps { children?: ReactNode, title: string, frmwidth: string, }

const ERPLayout = ({ children, title, frmwidth }: ILayoutProps) => {
  // console.log('balisagu ', `w-[${frmwidth}%]`);
  return (
    // <div className="flex items-start gap-x-1 bg-red-400 text-black w-[100%]">
      <div className="flex items-start gap-x-1 bg-white text-black">
      <Navigation />
      {/* <div className="min-h-screen bg-white text-black pl-2 w-[80%]"> */}
      <div className="min-h-screen bg-white text-black pl-2">
        {/* <Header title={title} /> */}
        {/* <PageTitle title={title} /> */}
        {/* <div className={`w-[98%]`}> */}
        <div className={`w-[${frmwidth}%]`}>
          <section className='flex justify-between items-center' style={{ textAlign: 'center', marginTop: 2, marginBottom: 20 }}>
            {/* <Space align='start'>
              <img
                style={{ width: 40, height: 40 }}
                src='/images/logo-icon.png'
                alt='Enterprise ERP'
              />
              <Title level={2} style={{ marginBottom: 0, color: 'teal', fontWeight: "normal", }}>
                Enterprise ERP
              </Title>
            </Space> */}
            <Divider style={{ marginBottom: 0 }}>{title}</Divider>
            <HeaderContent />
          </section>
          
        
        {children}
        </div>
        <Footer />
      </div>
    </div>

  );
};

export default ERPLayout;
