import { useContext, useMemo } from 'react';
import { FinanceContext } from '../../context/FinanceContext';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];

const SpendingBreakdown = () => {
  const { transactions, theme } = useContext(FinanceContext);

  const chartData = useMemo(() => {
    const expenses = transactions.filter(tx => tx.type === 'expense');
    
    // Group by category
    const grouped = expenses.reduce((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + Number(tx.amount);
      return acc;
    }, {});

    // Convert to array and sort by amount descending
    return Object.keys(grouped)
      .map(key => ({ name: key, value: grouped[key] }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  const textColor = theme === 'dark' ? '#f8fafc' : '#1e293b';

  return (
    <div className="card" style={{ height: '350px', display: 'flex', flexDirection: 'column' }}>
      <h3 className="text-lg font-bold" style={{ marginBottom: '1rem' }}>Spending Breakdown</h3>
      <div style={{ flex: 1, minHeight: 0 }}>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => `$${value}`} 
                contentStyle={{ 
                  backgroundColor: 'var(--surface-color-solid)', 
                  borderColor: 'var(--border-solid)',
                  borderRadius: '8px',
                  color: textColor
                }} 
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', color: textColor }} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-secondary">
            No expense data available
          </div>
        )}
      </div>
    </div>
  );
};

export default SpendingBreakdown;
