import { useContext, useMemo } from 'react';
import { FinanceContext } from '../../context/FinanceContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const BalanceChart = () => {
  const { transactions, theme } = useContext(FinanceContext);

  const chartData = useMemo(() => {
    const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    let currentBalance = 0;
    const dataByDate = {}; 

    sorted.forEach((tx) => {
      if (tx.type === 'income') {
        currentBalance += Number(tx.amount);
      } else {
        currentBalance -= Number(tx.amount);
      }
      dataByDate[tx.date] = currentBalance;
    });

    return Object.entries(dataByDate).map(([date, balance]) => ({
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      balance,
    }));
  }, [transactions]);

  const textColor = theme === 'dark' ? '#94a3b8' : '#64748b';
  const gridColor = theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';

  return (
    <div className="card" style={{ height: '350px', display: 'flex', flexDirection: 'column' }}>
      <h3 className="text-lg font-bold" style={{ marginBottom: '1.5rem' }}>Balance Trend</h3>
      <div style={{ flex: 1, minHeight: 0 }}>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary-color)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--primary-color)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: textColor, fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: textColor, fontSize: 12 }} tickFormatter={(val) => `$${val}`} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--surface-color-solid)', 
                  borderColor: 'var(--border-solid)',
                  borderRadius: '8px',
                  color: 'var(--text-primary)'
                }} 
                itemStyle={{ color: 'var(--primary-color)', fontWeight: 'bold' }}
              />
              <Area type="monotone" dataKey="balance" stroke="var(--primary-color)" strokeWidth={3} fillOpacity={1} fill="url(#colorBalance)" />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-secondary">
            No data available
          </div>
        )}
      </div>
    </div>
  );
};

export default BalanceChart;
