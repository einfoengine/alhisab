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

export default function AccountingPage() {
  // Example data
  const kpi = {
    sales: 6390.8,
    orders: 90,
    avgOrder: 348,
    salesChange: 2.5,
    ordersChange: 2.5,
    avgOrderChange: 2.5,
  };
  const lineData1 = [32000, 31000, 30000, 29500, 31000, 33000, 34000, 35000, 37000, 42000, 39000, 37000, 36000, 35000, 34000, 33000, 32000, 31000, 30000, 29500, 31000, 33000, 34000, 35000, 37000, 42000, 39000, 37000, 36000, 35000];
  const barData = [12, 18, 22, 30, 25, 40, 55, 38, 44, 60, 80, 70, 60, 50, 40, 30, 20, 18, 22, 30, 25, 40, 55, 38, 44, 60, 80, 70, 60, 50];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Sales KPI */}
        <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-sm">Sales</span>
            <ModernBarChart data={[4, 8, 12, 8, 16, 12, 18]} color="#6366f1" height={32} />
          </div>
          <div className="text-2xl font-bold text-gray-900">${kpi.sales.toLocaleString()}</div>
          <div className="text-xs text-blue-600 font-medium">+{kpi.salesChange}% <span className="text-gray-400 font-normal">vs. last month</span></div>
        </div>
        {/* Orders KPI */}
        <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-sm">Orders</span>
            <ModernBarChart data={[2, 4, 8, 6, 10, 8, 12]} color="#6366f1" height={32} />
          </div>
          <div className="text-2xl font-bold text-gray-900">{kpi.orders}</div>
          <div className="text-xs text-blue-600 font-medium">+{kpi.ordersChange}% <span className="text-gray-400 font-normal">vs. last month</span></div>
        </div>
        {/* Avg Order Value KPI */}
        <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-sm">Avg orders value</span>
            <ModernBarChart data={[8, 12, 10, 14, 12, 16, 18]} color="#6366f1" height={32} />
          </div>
          <div className="text-2xl font-bold text-gray-900">${kpi.avgOrder}</div>
          <div className="text-xs text-blue-600 font-medium">+{kpi.avgOrderChange}% <span className="text-gray-400 font-normal">vs. last month</span></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Performance Line Chart */}
        <div className="bg-white rounded-2xl shadow-sm p-6 md:col-span-2 flex flex-col gap-2">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-gray-700 font-medium">Performance</span>
              <span className="ml-2 text-xs text-gray-400">Real time updates</span>
            </div>
            <span className="text-gray-400 text-xs">This month</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-2">$6,390.80</div>
          <ModernLineChart data={lineData1} color="#6366f1" height={80} />
          <div className="flex gap-4 mt-2 text-xs">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-indigo-500 inline-block"></span> This month</span>
            <span className="flex items-center gap-1 text-gray-400"><span className="w-2 h-2 rounded-full bg-indigo-200 inline-block"></span> Last month</span>
          </div>
        </div>
        {/* Transactions Bar Chart */}
        <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-700 font-medium">Transactions</span>
            <span className="text-xs text-gray-400">153 previous period</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-2">168</div>
          <ModernBarChart data={barData} color="#6366f1" height={80} />
          <div className="flex gap-6 mt-2 text-xs text-gray-500">
            <span><span className="text-gray-900 font-semibold">125</span> Succeeded</span>
            <span><span className="text-gray-900 font-semibold">13</span> Failed</span>
            <span><span className="text-gray-900 font-semibold">30</span> Refunded</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Market Channel (stub) */}
        <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-2">
          <span className="text-gray-700 font-medium mb-2">Market Channel</span>
          <ModernLineChart data={[37, 40, 45, 60, 100]} color="#6366f1" height={60} />
          <div className="flex gap-2 mt-2 text-xs text-gray-500">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-indigo-500 inline-block"></span> Instagram</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-indigo-200 inline-block"></span> Facebook</span>
          </div>
        </div>
        {/* Amount (stub) */}
        <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-2 items-center justify-center">
          <span className="text-gray-700 font-medium mb-2">Amount</span>
          <div className="relative flex items-center justify-center mb-2">
            <svg width={120} height={120}>
              <circle cx={60} cy={60} r={54} stroke="#e0e7ef" strokeWidth={8} fill="none" />
              <circle cx={60} cy={60} r={54} stroke="#6366f1" strokeWidth={8} fill="none" strokeDasharray={339.292} strokeDashoffset={60} strokeLinecap="round" />
            </svg>
            <span className="absolute text-2xl font-bold text-gray-900">$16.8 M</span>
          </div>
          <div className="flex gap-4 text-xs text-gray-500">
            <span><span className="text-gray-900 font-semibold">$13.8 M</span> Earned</span>
            <span><span className="text-gray-900 font-semibold">$2.4 M</span> Converted</span>
          </div>
        </div>
        {/* Net Volume (stub) */}
        <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-2">
          <span className="text-gray-700 font-medium mb-2">Net Volume</span>
          <ModernLineChart data={[30, 40, 60, 80, 100, 90, 70]} color="#6366f1" height={60} />
          <div className="flex gap-4 mt-2 text-xs text-gray-500">
            <span><span className="text-gray-900 font-semibold">$6,390.80</span> Today</span>
            <span><span className="text-gray-900 font-semibold">$2,340.23</span> Expected</span>
          </div>
        </div>
      </div>
    </div>
  );
} 