import { useState, useContext } from 'react';
import { FinanceContext } from './context/FinanceContext';
import Layout from './components/layout/Layout';
import SummaryCards from './components/dashboard/SummaryCards';
import BalanceChart from './components/dashboard/BalanceChart';
import SpendingBreakdown from './components/dashboard/SpendingBreakdown';
import InsightsPanel from './components/insights/InsightsPanel';
import TransactionList from './components/transactions/TransactionList';
import TransactionFormModal from './components/transactions/TransactionFormModal';

function DashboardContent() {
  const { isLoading, addTransaction, editTransaction } = useContext(FinanceContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);

  if (isLoading) {
    return (
      <div className="flex-col gap-4">
        <div className="skeleton" style={{ height: '120px', width: '100%' }}></div>
        <div className="grid gap-4 charts-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          <div className="skeleton" style={{ height: '350px' }}></div>
          <div className="skeleton" style={{ height: '350px' }}></div>
        </div>
        <div className="skeleton" style={{ height: '400px', width: '100%' }}></div>
      </div>
    );
  }

  const handleOpenAdd = () => {
    setEditingData(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (data) => {
    setEditingData(data);
    setIsModalOpen(true);
  };

  const handleSaveTransaction = (data) => {
    if (editingData) {
      editTransaction(data);
    } else {
      addTransaction(data);
    }
  };

  return (
    <>
      <SummaryCards />
      
      <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', marginBottom: '2rem' }}>
        <div style={{ flex: '2 1 500px' }}>
          <BalanceChart />
        </div>
        <div style={{ flex: '1 1 300px' }}>
          <SpendingBreakdown />
        </div>
      </div>

      <InsightsPanel />

      <TransactionList onAdd={handleOpenAdd} onEdit={handleOpenEdit} />

      <TransactionFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveTransaction}
        initialData={editingData}
      />
    </>
  );
}

function App() {
  return (
    <Layout>
      <DashboardContent />
    </Layout>
  );
}

export default App;
