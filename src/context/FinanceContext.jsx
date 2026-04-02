import { createContext, useReducer, useEffect } from 'react';
import { mockTransactions } from '../utils/mockData';

export const FinanceContext = createContext();

const initialState = {
  transactions: [],
  role: 'Viewer',
  theme: 'light', 
  isLoading: true,
};

const financeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_INITIAL_DATA':
      return { ...state, transactions: action.payload, isLoading: false };
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [action.payload, ...state.transactions] };
    case 'EDIT_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };
    case 'SET_ROLE':
      return { ...state, role: action.payload };
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
    default:
      return state;
  }
};

export const FinanceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(financeReducer, initialState);
  useEffect(() => {
    const loadData = async () => {
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const storedTransactions = localStorage.getItem('transactions');
      const storedTheme = localStorage.getItem('theme') || 'light';
      const storedRole = localStorage.getItem('role') || 'Viewer';
      
      let initialData = mockTransactions;
      if (storedTransactions) {
        try {
          initialData = JSON.parse(storedTransactions);
        } catch (e) {
          console.error("Failed to parse stored transactions", e);
        }
      }

      dispatch({ type: 'SET_INITIAL_DATA', payload: initialData });
      dispatch({ type: 'SET_ROLE', payload: storedRole });
      
      if (storedTheme === 'dark') {
          document.documentElement.setAttribute('data-theme', 'dark');
      }
    };
    
    loadData();
  }, []);
  useEffect(() => {
    if (!state.isLoading) {
      localStorage.setItem('transactions', JSON.stringify(state.transactions));
    }
  }, [state.transactions, state.isLoading]);

  useEffect(() => {
    localStorage.setItem('theme', state.theme);
    if (state.theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [state.theme]);

  const addTransaction = (transaction) => {
    dispatch({ type: 'ADD_TRANSACTION', payload: { ...transaction, id: Date.now().toString() } });
  };

  const editTransaction = (transaction) => {
    dispatch({ type: 'EDIT_TRANSACTION', payload: transaction });
  };

  const deleteTransaction = (id) => {
    dispatch({ type: 'DELETE_TRANSACTION', payload: id });
  };

  const setRole = (role) => {
    dispatch({ type: 'SET_ROLE', payload: role });
    localStorage.setItem('role', role);
  };

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  return (
    <FinanceContext.Provider
      value={{
        ...state,
        addTransaction,
        editTransaction,
        deleteTransaction,
        setRole,
        toggleTheme,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};
