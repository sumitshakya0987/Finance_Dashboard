import { useState, useContext } from 'react';
import { FinanceContext } from '../../context/FinanceContext';
import { Search, Filter, Plus, Edit2, Trash2 } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';
import { CATEGORIES } from '../../utils/mockData';

const TransactionList = ({ onEdit, onAdd }) => {
  const { transactions, role, deleteTransaction } = useContext(FinanceContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');

  // Filter and Sort Logic
  const filteredTransactions = transactions
    .filter((tx) => {
      const matchesSearch = tx.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            tx.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || tx.type === filterType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      if (sortOrder === 'newest') return new Date(b.date) - new Date(a.date);
      if (sortOrder === 'oldest') return new Date(a.date) - new Date(b.date);
      if (sortOrder === 'highest') return b.amount - a.amount;
      if (sortOrder === 'lowest') return a.amount - b.amount;
      return 0;
    });

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '2rem' }}>
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-bold">Recent Transactions</h3>
          <span className={`badge ${role === 'Admin' ? 'badge-income' : ''}`} style={{ fontSize: '10px', opacity: 0.8 }}>
            {role} mode
          </span>
        </div>
        
        {role === 'Admin' ? (
          <button className="btn btn-primary" onClick={onAdd}>
            <Plus size={18} /> Add Transaction
          </button>
        ) : (
          <button className="btn btn-secondary" style={{ opacity: 0.6, cursor: 'not-allowed' }} title="Admin role required">
             <Plus size={18} /> Add (Admin only)
          </button>
        )}
      </div>

      {/* Filters & Search */}
      <div className="flex gap-4 flex-wrap">
        <div style={{ position: 'relative', flex: '1 1 200px' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <input 
            type="text" 
            className="input" 
            placeholder="Search transactions..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '2.5rem' }}
          />
        </div>
        <select className="select" style={{ width: 'auto' }} value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select className="select" style={{ width: 'auto' }} value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="highest">Highest Amount</option>
          <option value="lowest">Lowest Amount</option>
        </select>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((tx) => (
                <tr key={tx.id}>
                  <td>{new Date(tx.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                  <td className="font-bold">{tx.description}</td>
                  <td>{tx.category}</td>
                  <td className={tx.type === 'income' ? 'text-success font-bold' : ''}>
                    {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                  </td>
                  <td>
                     <span className={`badge badge-${tx.type}`}>{tx.type}</span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {role === 'Admin' ? (
                      <div className="flex justify-end gap-2">
                        <button onClick={() => onEdit(tx)} className="btn-icon text-secondary" style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => deleteTransaction(tx.id)} className="btn-icon text-danger" style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-secondary">ReadOnly</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-secondary)' }}>
                  No transactions found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionList;
