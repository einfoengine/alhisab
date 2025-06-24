"use client";

import React from "react";
import { useRouter } from "next/navigation";

// Type definitions for chart data
interface ChartDataPoint {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

interface PieDataPoint {
  category?: string;
  source?: string;
  amount: number;
}

interface BarDataPoint {
  month: string;
  inflow: number;
  outflow: number;
  net: number;
}

interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
  type: string;
  status: string;
  category: string;
}

interface Alert {
  title: string;
  description: string;
}

interface QuickAction {
  title: string;
  icon: React.ReactNode;
}

// Chart stubs (replace with real chart libs or keep as SVG for now)
const MiniBar = ({ value, max, color }: { value: number; max: number; color: string }) => (
  <div className="w-8 h-12 flex items-end">
    <div style={{ height: `${(value / max) * 100}%`, background: color }} className="w-full rounded-t-md transition-all"></div>
  </div>
);

const ModernLineChart = ({ data, color, height = 80 }: { data: number[]; color: string; height?: number }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 180;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * width},${height - ((v - min) / range) * height}`).join(" ");
  const area = `0,${height} ${points} ${width},${height}`;
  return (
    <svg width={width} height={height} className="block">
      <defs>
        <linearGradient id="modernArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor={color} stopOpacity="0.01" />
        </linearGradient>
      </defs>
      <polygon fill="url(#modernArea)" points={area} />
      <polyline fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" points={points} />
    </svg>
  );
};

const ModernBarChart = ({ data, color, height = 80 }: { data: number[]; color: string; height?: number }) => {
  const max = Math.max(...data);
  const width = data.length * 12;
  return (
    <svg width={width} height={height} className="block">
      {data.map((v, i) => (
        <rect
          key={i}
          x={i * 12}
          y={height - (v / max) * height}
          width={8}
          height={(v / max) * height}
          rx={3}
          fill={color}
          opacity={0.7}
        />
      ))}
    </svg>
  );
};

// --- Mock Data ---
const cashflow = {
  income: 10345,
  incomeChange: 5.37,
  expenses: 3526,
  expensesChange: -5.69,
  months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  incomeData: [5000, 4200, 3900, 4100, 5200, 6100],
  expensesData: [3200, 2800, 2500, 3000, 3400, 3500],
};
const expenses = {
  total: 5301,
  categories: [
    { label: "Food & Groceries", value: 1800, color: "#60a5fa" },
    { label: "Housing", value: 1200, color: "#818cf8" },
    { label: "Utilities", value: 900, color: "#6366f1" },
    { label: "Transportation", value: 800, color: "#38bdf8" },
    { label: "Healthcare", value: 601, color: "#5eead4" },
  ],
};
const goals = [
  { icon: "🏖️", label: "Vacation", percent: 56, saved: 6100 },
  { icon: "🎓", label: "Education", percent: 28, saved: 2250 },
  { icon: "💻", label: "New Laptop", percent: 24, saved: 1500 },
  { icon: "🎫", label: "Concert DAY6", percent: 50, saved: 2500 },
];
const transactions = [
  { date: "Jan 18, 2025", category: "Transport", amount: -24, status: "Completed", merchant: "Gojek" },
  { date: "Jan 14, 2025", category: "Entertainment", amount: -59, status: "Pending", merchant: "Crunchyroll" },
  { date: "Jan 17, 2025", category: "Shopping", amount: -73, status: "Completed", merchant: "Tokopedia" },
  { date: "Jan 16, 2025", category: "Transport", amount: -12.99, status: "Completed", merchant: "Gojek" },
  { date: "Jan 13, 2025", category: "Entertainment", amount: -48, status: "Failed", merchant: "Youtube" },
];

// --- Chart Components ---
const LineChart = ({ income, expenses, months }: { income: number[]; expenses: number[]; months: string[] }) => {
  const width = 420, height = 180, pad = 32;
  const max = Math.max(...income, ...expenses, 8000);
  const min = 0;
  const getPoints = (data: number[]) =>
    data.map((v, i) => `${pad + (i / (data.length - 1)) * (width - 2 * pad)},${height - pad - ((v - min) / (max - min)) * (height - 2 * pad)}`).join(" ");
  return (
    <svg width={width} height={height} className="w-full h-44">
      {/* Grid */}
      {[0, 0.25, 0.5, 0.75, 1].map((p, i) => (
        <line key={i} x1={pad} x2={width - pad} y1={pad + p * (height - 2 * pad)} y2={pad + p * (height - 2 * pad)} stroke="#e5e7eb" strokeWidth={1} />
      ))}
      {/* Income line */}
      <polyline points={getPoints(income)} fill="none" stroke="#38bdf8" strokeWidth={2} />
      {/* Expenses line */}
      <polyline points={getPoints(expenses)} fill="none" stroke="#6366f1" strokeWidth={2} />
      {/* Dots */}
      {income.map((v, i) => (
        <circle key={i} cx={pad + (i / (income.length - 1)) * (width - 2 * pad)} cy={height - pad - ((v - min) / (max - min)) * (height - 2 * pad)} r={4} fill="#38bdf8" stroke="#fff" strokeWidth={2} />
      ))}
      {expenses.map((v, i) => (
        <circle key={i} cx={pad + (i / (expenses.length - 1)) * (width - 2 * pad)} cy={height - pad - ((v - min) / (max - min)) * (height - 2 * pad)} r={4} fill="#6366f1" stroke="#fff" strokeWidth={2} />
      ))}
    </svg>
  );
};

const DonutChart = ({ data, total }: { data: { value: number; color: string }[]; total: number }) => {
  const radius = 54, stroke = 18, C = 2 * Math.PI * radius;
  let offset = 0;
  return (
    <svg width={140} height={140} className="block mx-auto">
      {data.map((d, i) => {
        const val = d.value / total;
        const dash = val * C;
        const el = (
          <circle
            key={i}
            cx={70}
            cy={70}
            r={radius}
            fill="none"
            stroke={d.color}
            strokeWidth={stroke}
            strokeDasharray={`${dash} ${C - dash}`}
            strokeDashoffset={-offset}
            strokeLinecap="round"
          />
        );
        offset += dash;
        return el;
      })}
      <circle cx={70} cy={70} r={radius - stroke / 2} fill="#fff" />
      <text x={70} y={76} textAnchor="middle" fontSize={22} fontWeight={700} fill="#334155">${total.toLocaleString()}</text>
    </svg>
  );
};

// --- Main Page ---
export default function AccountingPage() {
  return (
    <div className="min-h-screen bg-[#f6fafe] p-4 md:p-8">
      {/* Header Card */}
      <div className="bg-gradient-to-r from-blue-100 to-blue-50 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between mb-8 shadow-sm">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <div className="bg-white rounded-xl px-4 py-2 flex flex-col items-center shadow">
            <span className="text-xs text-gray-400">Apple</span>
            <span className="font-bold text-blue-700">$180.50</span>
            <span className="text-xs text-green-500">+2.30 (1.3%)</span>
          </div>
          <div>
            <div className="text-lg font-semibold text-blue-900 mb-1">Now your account isn't just for saving</div>
            <div className="text-gray-500 text-sm">Start growing your wealth by investing directly from your balance. <a href="#" className="text-blue-600 font-medium hover:underline">Start Investing →</a></div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Money Cashflow Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm md:col-span-2 flex flex-col gap-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-gray-800">Money Cashflow</span>
            <select className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-500">
              <option>Last 6 months</option>
            </select>
          </div>
          <div className="flex gap-8 mb-2">
            <div>
              <div className="text-gray-400 text-xs">Income</div>
              <div className="text-2xl font-bold text-gray-900">${cashflow.income.toLocaleString()}</div>
              <div className="text-xs text-green-500 font-medium flex items-center gap-1">{cashflow.incomeChange > 0 ? '▲' : '▼'} {Math.abs(cashflow.incomeChange)}%</div>
            </div>
            <div>
              <div className="text-gray-400 text-xs">Expenses</div>
              <div className="text-2xl font-bold text-gray-900">${cashflow.expenses.toLocaleString()}</div>
              <div className="text-xs text-red-500 font-medium flex items-center gap-1">{cashflow.expensesChange < 0 ? '▼' : '▲'} {Math.abs(cashflow.expensesChange)}%</div>
            </div>
          </div>
          <LineChart income={cashflow.incomeData} expenses={cashflow.expensesData} months={cashflow.months} />
        </div>
        {/* Expenses Donut Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-gray-800">Expenses</span>
            <select className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-500">
              <option>Last 6 months</option>
            </select>
          </div>
          <DonutChart data={expenses.categories} total={expenses.total} />
          <div className="flex flex-wrap gap-2 justify-center mt-2">
            {expenses.categories.map((cat, i) => (
              <span key={i} className="flex items-center gap-1 text-xs text-gray-600">
                <span className="w-3 h-3 rounded-full" style={{ background: cat.color }}></span>
                {cat.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Lower Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Saving Goals */}
        <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4">
          <div className="font-semibold text-gray-800 mb-2">Saving Goals</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {goals.map((goal, i) => (
              <div key={i} className="flex flex-col gap-1 bg-blue-50 rounded-xl p-3">
                <span className="text-lg">{goal.icon}</span>
                <span className="font-medium text-gray-700">{goal.label}</span>
                <div className="w-full bg-blue-100 rounded-full h-2 mt-1 mb-1">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${goal.percent}%` }}></div>
                </div>
                <span className="text-xs text-gray-500">{goal.percent}%</span>
                <span className="text-xs text-gray-500">${goal.saved.toLocaleString()} saved so far</span>
              </div>
            ))}
          </div>
          <a href="#" className="text-blue-600 text-xs font-medium mt-2 hover:underline">Show all →</a>
        </div>
        {/* Transactions Table */}
        <div className="bg-white rounded-2xl p-6 shadow-sm md:col-span-2 flex flex-col gap-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-gray-800">Transactions</span>
            <div className="flex gap-2 items-center">
              <input type="text" placeholder="Search..." className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-500" />
              <button className="text-xs text-gray-500 border border-gray-200 rounded-lg px-2 py-1">Filter</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
              <thead>
                <tr className="text-gray-400 text-left">
                  <th className="py-2 px-2 font-medium">DATE</th>
                  <th className="py-2 px-2 font-medium">CATEGORY</th>
                  <th className="py-2 px-2 font-medium">AMOUNT</th>
                  <th className="py-2 px-2 font-medium">STATUS</th>
                  <th className="py-2 px-2 font-medium">MERCHANT</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, i) => (
                  <tr key={i} className="border-t border-gray-100 hover:bg-blue-50">
                    <td className="py-2 px-2 whitespace-nowrap">{tx.date}</td>
                    <td className="py-2 px-2 whitespace-nowrap">{tx.category}</td>
                    <td className="py-2 px-2 whitespace-nowrap">{tx.amount < 0 ? '-' : ''}${Math.abs(tx.amount).toLocaleString()}</td>
                    <td className="py-2 px-2 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${tx.status === 'Completed' ? 'bg-green-100 text-green-700' : tx.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{tx.status}</span>
                    </td>
                    <td className="py-2 px-2 whitespace-nowrap">{tx.merchant}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 