// Imports
import { ReactNode, useContext, useEffect } from 'react';

// Components
import Header from '@/components/Header/Header.component';
import PageTitle from './PageTitle.component';
import Footer from '@/components/Footer/Footer.component';
// import Stickynav from '@/components/Footer/Stickynav.component';

// State


interface ILayoutProps {
  children?: ReactNode;
  title: string;
}

/**
 * Renders layout for each page. Also passes along the title to the Header component.
 * @function Layout
 * @param {ReactNode} children - Children to be rendered by Layout component
 * @param {TTitle} title - Title for the page. Is set in <title>{title}</title>
 * @returns {JSX.Element} - Rendered component
 */

const Layout = ({ children, title }: ILayoutProps) => {  

  return (
    <div className="min-h-screen bg-white text-black pb-16">
      <Header title={title} />
      <PageTitle title={title} />
      {children}
      <Footer />
      {/* <Stickynav /> */}
    </div>
  );
};

export default Layout;
