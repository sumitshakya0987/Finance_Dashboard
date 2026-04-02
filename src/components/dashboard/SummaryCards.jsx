import { useContext, useMemo } from 'react';
import { FinanceContext } from '../../context/FinanceContext';
import { formatCurrency } from '../../utils/helpers';
import { ArrowUpRight, ArrowDownRight, Wallet } from 'lucide-react';

const SummaryCards = () => {
  const { transactions } = useContext(FinanceContext);

  const { totalIncome, totalExpense, totalBalance } = useMemo(() => {
    let income = 0;
    let expense = 0;

    transactions.forEach((tx) => {
      const amount = Number(tx.amount);
      if (tx.type === 'income') {
        income += amount;
      } else {
        expense += amount;
      }
    });

    return {
      totalIncome: income,
      totalExpense: expense,
      totalBalance: income - expense,
    };
  }, [transactions]);

  return (
    <div className="summary-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
      
      {/* Total Balance Card */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: 'linear-gradient(135deg, var(--primary-color), #8b5cf6)', color: 'white' }}>
        <div className="flex justify-between items-center">
          <span style={{ opacity: 0.9, fontWeight: 500 }}>Total Balance</span>
          <div className="btn-icon" style={{ background: 'rgba(255,255,255,0.2)' }}>
            <Wallet size={20} />
          </div>
        </div>
        <div className="text-2xl font-bold">{formatCurrency(totalBalance)}</div>
      </div>

      {/* Total Income Card */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div className="flex justify-between items-center text-secondary">
          <span style={{ fontWeight: 500 }}>Total Income</span>
          <div className="btn-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success-color)' }}>
            <ArrowUpRight size={20} />
          </div>
        </div>
        <div className="text-2xl font-bold">{formatCurrency(totalIncome)}</div>
      </div>

      {/* Total Expense Card */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div className="flex justify-between items-center text-secondary">
          <span style={{ fontWeight: 500 }}>Total Expense</span>
          <div className="btn-icon" style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger-color)' }}>
            <ArrowDownRight size={20} />
          </div>
        </div>
        <div className="text-2xl font-bold">{formatCurrency(totalExpense)}</div>
      </div>

    </div>
  );
};

export default SummaryCards;
