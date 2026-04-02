import { useState, useEffect } from 'react';
import { CATEGORIES } from '../../utils/mockData';
import { X } from 'lucide-react';

const TransactionFormModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: CATEGORIES[0],
    type: 'expense',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        description: '',
        amount: '',
        category: CATEGORIES[0],
        type: 'expense',
        date: new Date().toISOString().split('T')[0]
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description || !formData.amount || !formData.date) return;
    
    onSave({
      ...formData,
      amount: Number(formData.amount)
    });
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <div className="flex justify-between items-center" style={{ marginBottom: '1.5rem' }}>
          <h2 className="text-xl font-bold">{initialData ? 'Edit Transaction' : 'Add Transaction'}</h2>
          <button onClick={onClose} className="btn-icon" style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-col gap-4">
          <div className="flex-col gap-2">
            <label className="text-sm font-bold">Type</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2" style={{ cursor: 'pointer' }}>
                <input type="radio" name="type" value="income" checked={formData.type === 'income'} onChange={handleChange} />
                Income
              </label>
              <label className="flex items-center gap-2" style={{ cursor: 'pointer' }}>
                <input type="radio" name="type" value="expense" checked={formData.type === 'expense'} onChange={handleChange} />
                Expense
              </label>
            </div>
          </div>

          <div className="flex-col gap-2">
            <label className="text-sm font-bold">Amount</label>
            <input type="number" name="amount" className="input" value={formData.amount} onChange={handleChange} required min="0" step="0.01" />
          </div>

          <div className="flex-col gap-2">
            <label className="text-sm font-bold">Description</label>
            <input type="text" name="description" className="input" value={formData.description} onChange={handleChange} required />
          </div>

          <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="flex-col gap-2">
              <label className="text-sm font-bold">Category</label>
              <select name="category" className="select" value={formData.category} onChange={handleChange}>
                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            
            <div className="flex-col gap-2">
              <label className="text-sm font-bold">Date</label>
              <input type="date" name="date" className="input" value={formData.date} onChange={handleChange} required />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4" style={{ marginTop: '1rem' }}>
            <button type="button" onClick={onClose} className="btn btn-secondary">Cancel</button>
            <button type="submit" className="btn btn-primary">Save Transaction</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionFormModal;
