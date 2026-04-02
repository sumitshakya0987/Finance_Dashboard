import { useContext } from 'react';
import { FinanceContext } from '../../context/FinanceContext';
import Header from './Header';

const Layout = ({ children }) => {
  const { theme } = useContext(FinanceContext);

  return (
    <div className={`app-container ${theme}`}>
      <Header />
      <main className="container main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;
