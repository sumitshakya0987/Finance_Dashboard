# 💰 Finance Dashboard UI

A clean, responsive, and interactive finance dashboard built with **React** and **Vanilla CSS**. This project serves as a comprehensive tool for users to track their financial activity, visualize spending trends, and manage transactions with built-in Role-Based Access Control (RBAC).

---

## ✨ Features

### 1. Dashboard Overview
- **Summary Cards:** Real-time calculation of Total Balance, Total Income, and Total Expenses.
- **Balance Trend Chart:** Dynamic area chart showing how your balance has evolved over time.
- **Spending Breakdown:** Interactive pie chart categorizing your expenses to help identify spending patterns.

### 2. Transaction Management
- **Detailed List:** View date, description, category, amount, and type for all transactions.
- **Advanced Filtering:** Filter by income/expense type and search by description or category.
- **Smart Sorting:** Sort transactions by Date (Newest/Oldest) or Amount (Highest/Lowest).
- **Add/Edit Transactions:** A custom modal interface for managing your data (Admin only).

### 3. Role-Based UI (RBAC)
- **Viewer Mode:** Read-only access. Summary and insights are visible, but modification buttons are disabled/hidden.
- **Admin Mode:** Full control. Create, edit, and delete any transaction.
- **Role Switcher:** Quickly toggle between roles via the header to demonstrate different UI behaviors.

### 4. Smart Insights
- **Top Category:** Automatically identifies your highest spending category.
- **Largest Transaction:** Highlights your single biggest financial move.
- **Savings Rate:** Calculates an estimated percentage of income saved.

### 5. Premium UX Enhancements
- **Dark Mode:** A sleek, custom theme that persists across sessions.
- **Glassmorphism Design:** Modern, translucent UI components with smooth micro-animations.
- **Data Persistence:** Integrated `localStorage` ensures your data and settings remain safe after a refresh.
- **Export to CSV:** Download your entire transaction history with a single click.
- **Responsive Design:** Optimized for Desktop, Tablet, and Mobile devices.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node)

### Installation
1. Clone the repository or extract the files.
2. Navigate to the project directory:
   ```bash
   cd Finance_Dashboard_UI
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Running Locally
To start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

---

## 🛠️ Tech Stack
- **Framework:** [React.js](https://reactjs.org/) (via Vite)
- **Styling:** **Vanilla CSS** (Custom CSS Variables, Glassmorphism, and Media Queries)
- **State Management:** React **Context API** with `useReducer`
- **Charts:** [Recharts](https://recharts.org/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Data:** Mock API with `localStorage` persistence

---

## 🎨 Design Approach

### Modular Component Architecture
The application is split into focused components (`layout`, `dashboard`, `transactions`, `insights`) to ensure the codebase remains scalable and easy to maintain. 

### Custom Design System
Instead of using a CSS framework like Tailwind, I built a custom design system using **Vanilla CSS Variables**. This allowed for:
- Precision control over the **Glassmorphism** effect.
- Seamless, animated transitions between **Light and Dark modes**.
- Highly responsive layouts using **CSS Grid** and **Flexbox** without the overhead of external libraries.

### State & Persistence
The `FinanceContext` acts as a central source of truth. It handles the loading of initial data (with a simulated API delay for better UX) and ensures every transaction or role change is instantly mirrored in `localStorage`.

---

## 📂 Folder Structure

```text
src/
├── components/
│   ├── dashboard/      # Summary Cards and Charts
│   ├── insights/       # Data analysis panel
│   ├── layout/         # Header and Main Layout wrappers
│   └── transactions/   # List, Filter, and Form Modal
├── context/            # Global State (FinanceContext)
├── utils/              # Helpers (CSV export, formatting) and Mock Data
├── App.jsx             # Root Component Orchestration
├── index.css           # Global Styles & Design System
└── main.jsx            # Entry Point
```

---

*This project was developed as a technical evaluation for building high-quality, interactive frontend interfaces.*
