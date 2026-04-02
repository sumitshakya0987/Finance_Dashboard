import { useContext } from 'react';
import { FinanceContext } from '../../context/FinanceContext';
import { Moon, Sun, User, Shield, Download } from 'lucide-react';
import { exportToCSV } from '../../utils/helpers';

const Header = () => {
  const { role, setRole, theme, toggleTheme, transactions } = useContext(FinanceContext);

  const handleExport = () => {
    if (transactions.length > 0) {
      exportToCSV(transactions, 'my_finance_data.csv');
    } else {
      alert("No data to export");
    }
  };

  return (
    <header className="card main-header">
      <div className="flex items-center gap-4 title-group">
        <div style={{
          width: '40px', height: '40px', borderRadius: '12px',
          background: 'linear-gradient(135deg, var(--primary-color), #8b5cf6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold',
          flexShrink: 0
        }}>
          FD
        </div>
        <h1 className="text-xl font-bold" style={{ margin: 0 }}>Finance <span className="hidden-mobile">Dashboard</span></h1>
      </div>

      <div className="flex items-center gap-4 actions-group">
        <button onClick={handleExport} className="btn btn-secondary" title="Export CSV">
          <Download size={18} /> <span className="hidden-mobile">Export</span>
        </button>

        <select 
          className="select" 
          value={role} 
          onChange={(e) => setRole(e.target.value)} 
          style={{ width: 'auto', padding: '0.4rem 0.5rem', cursor: 'pointer', fontSize: '0.8rem' }}
        >
          <option value="Viewer">Viewer</option>
          <option value="Admin">Admin</option>
        </select>
        
        <div className="flex items-center gap-2 text-sm text-secondary" style={{ borderLeft: '1px solid var(--border-solid)', paddingLeft: '1rem' }}>
          {role === 'Admin' ? <Shield size={16} className="text-primary" /> : <User size={16} />}
          <span className="hidden-mobile" style={{ fontWeight: '500' }}>{role}</span>
        </div>

        <button onClick={toggleTheme} className="btn-icon btn-secondary" title="Toggle Theme" style={{ width: '36px', height: '36px', flexShrink: 0 }}>
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
