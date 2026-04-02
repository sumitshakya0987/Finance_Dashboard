import { useContext, useMemo } from 'react';
import { FinanceContext } from '../../context/FinanceContext';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';

const InsightsPanel = () => {
  const { transactions } = useContext(FinanceContext);

  const insights = useMemo(() => {
    if (transactions.length === 0) return null;

    const expenses = transactions.filter(tx => tx.type === 'expense');
    const income = transactions.filter(tx => tx.type === 'income');

    // 1. Highest Spending Category
    const categoryTotals = expenses.reduce((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + Number(tx.amount);
      return acc;
    }, {});
    
    let highestCategory = { name: 'N/A', amount: 0 };
    Object.entries(categoryTotals).forEach(([name, amount]) => {
      if (amount > highestCategory.amount) {
        highestCategory = { name, amount };
      }
    });

    // 2. Largest Single Transaction
    let largestTx = { amount: 0, description: 'N/A' };
    transactions.forEach(tx => {
      if (Number(tx.amount) > Number(largestTx.amount)) {
        largestTx = tx;
      }
    });

    // 3. Current Month Status vs Previous (Simulated logic, simplistic for demonstration)
    const totalExp = expenses.reduce((sum, tx) => sum + Number(tx.amount), 0);
    const totalInc = income.reduce((sum, tx) => sum + Number(tx.amount), 0);
    const savingsRate = totalInc > 0 ? ((totalInc - totalExp) / totalInc) * 100 : 0;

    return {
      highestCategory,
      largestTx,
      savingsRate,
      isPositive: savingsRate > 0
    };
  }, [transactions]);

  if (!insights) return null;

  return (
    <div className="card" style={{ marginBottom: '2rem' }}>
      <h3 className="text-lg font-bold flex items-center gap-2" style={{ marginBottom: '1.5rem' }}>
        <AlertCircle size={20} className="text-primary" /> Key Insights
      </h3>
      
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
          <div className="btn-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning-color)' }}>
            <TrendingDown size={20} />
          </div>
          <div>
            <div className="text-sm text-secondary">Highest Spending Category</div>
            <div className="font-bold text-lg">{insights.highestCategory.name}</div>
            <div className="text-xs text-secondary">{formatCurrency(insights.highestCategory.amount)} total</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
          <div className="btn-icon" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary-color)' }}>
            <AlertCircle size={20} />
          </div>
          <div>
            <div className="text-sm text-secondary">Largest Single Transaction</div>
            <div className="font-bold text-lg">{insights.largestTx.description || insights.largestTx.category}</div>
            <div className="text-xs text-secondary">{formatCurrency(insights.largestTx.amount)}</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
          <div className="btn-icon" style={{ background: insights.isPositive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', color: insights.isPositive ? 'var(--success-color)' : 'var(--danger-color)' }}>
            {insights.isPositive ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
          </div>
          <div>
            <div className="text-sm text-secondary">Estimated Savings Rate</div>
            <div className={`font-bold text-lg ${insights.isPositive ? 'text-success' : 'text-danger'}`}>
              {insights.savingsRate.toFixed(1)}%
            </div>
            <div className="text-xs text-secondary">Of total income</div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default InsightsPanel;
