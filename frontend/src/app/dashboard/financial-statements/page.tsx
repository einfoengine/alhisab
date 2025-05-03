"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  Button,
} from "@mui/material";
import {
  Download as DownloadIcon,
  Print as PrintIcon,
} from "@mui/icons-material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`financial-statement-tabpanel-${index}`}
      aria-labelledby={`financial-statement-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const FinancialStatements = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // Sample data for Income Statement
  const incomeStatementData = {
    revenue: [
      { account: "Service Revenue", amount: 75000 },
      { account: "Interest Income", amount: 500 },
    ],
    expenses: [
      { account: "Salaries and Wages", amount: 35000 },
      { account: "Rent Expense", amount: 12000 },
      { account: "Utilities", amount: 3000 },
      { account: "Office Supplies", amount: 1500 },
      { account: "Depreciation", amount: 2000 },
    ],
  };

  // Sample data for Balance Sheet
  const balanceSheetData = {
    assets: [
      { account: "Cash", amount: 25000 },
      { account: "Accounts Receivable", amount: 15000 },
      { account: "Inventory", amount: 10000 },
      { account: "Equipment", amount: 30000 },
      { account: "Accumulated Depreciation", amount: -5000 },
    ],
    liabilities: [
      { account: "Accounts Payable", amount: 8000 },
      { account: "Accrued Expenses", amount: 3000 },
      { account: "Notes Payable", amount: 20000 },
    ],
    equity: [
      { account: "Common Stock", amount: 50000 },
      { account: "Retained Earnings", amount: 10000 },
    ],
  };

  // Sample data for Cash Flow Statement
  const cashFlowData = {
    operating: [
      { activity: "Net Income", amount: 20000 },
      { activity: "Depreciation", amount: 2000 },
      { activity: "Changes in Accounts Receivable", amount: -5000 },
      { activity: "Changes in Inventory", amount: -3000 },
      { activity: "Changes in Accounts Payable", amount: 2000 },
    ],
    investing: [
      { activity: "Purchase of Equipment", amount: -10000 },
      { activity: "Sale of Equipment", amount: 5000 },
    ],
    financing: [
      { activity: "Issuance of Common Stock", amount: 10000 },
      { activity: "Payment of Dividends", amount: -5000 },
      { activity: "Borrowing from Bank", amount: 15000 },
    ],
  };

  const renderIncomeStatement = () => {
    const totalRevenue = incomeStatementData.revenue.reduce(
      (sum, item) => sum + item.amount,
      0
    );
    const totalExpenses = incomeStatementData.expenses.reduce(
      (sum, item) => sum + item.amount,
      0
    );
    const netIncome = totalRevenue - totalExpenses;

    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Account</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Revenue
                </Typography>
              </TableCell>
            </TableRow>
            {incomeStatementData.revenue.map((item) => (
              <TableRow key={item.account}>
                <TableCell>{item.account}</TableCell>
                <TableCell align="right">{formatCurrency(item.amount)}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Total Revenue
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {formatCurrency(totalRevenue)}
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Expenses
                </Typography>
              </TableCell>
            </TableRow>
            {incomeStatementData.expenses.map((item) => (
              <TableRow key={item.account}>
                <TableCell>{item.account}</TableCell>
                <TableCell align="right">{formatCurrency(item.amount)}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Total Expenses
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {formatCurrency(totalExpenses)}
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Net Income
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {formatCurrency(netIncome)}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const renderBalanceSheet = () => {
    const totalAssets = balanceSheetData.assets.reduce(
      (sum, item) => sum + item.amount,
      0
    );
    const totalLiabilities = balanceSheetData.liabilities.reduce(
      (sum, item) => sum + item.amount,
      0
    );
    const totalEquity = balanceSheetData.equity.reduce(
      (sum, item) => sum + item.amount,
      0
    );

    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Account</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Assets
                </Typography>
              </TableCell>
            </TableRow>
            {balanceSheetData.assets.map((item) => (
              <TableRow key={item.account}>
                <TableCell>{item.account}</TableCell>
                <TableCell align="right">{formatCurrency(item.amount)}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Total Assets
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {formatCurrency(totalAssets)}
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Liabilities
                </Typography>
              </TableCell>
            </TableRow>
            {balanceSheetData.liabilities.map((item) => (
              <TableRow key={item.account}>
                <TableCell>{item.account}</TableCell>
                <TableCell align="right">{formatCurrency(item.amount)}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Total Liabilities
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {formatCurrency(totalLiabilities)}
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Equity
                </Typography>
              </TableCell>
            </TableRow>
            {balanceSheetData.equity.map((item) => (
              <TableRow key={item.account}>
                <TableCell>{item.account}</TableCell>
                <TableCell align="right">{formatCurrency(item.amount)}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Total Equity
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {formatCurrency(totalEquity)}
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Total Liabilities and Equity
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {formatCurrency(totalLiabilities + totalEquity)}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const renderCashFlowStatement = () => {
    const operatingCashFlow = cashFlowData.operating.reduce(
      (sum, item) => sum + item.amount,
      0
    );
    const investingCashFlow = cashFlowData.investing.reduce(
      (sum, item) => sum + item.amount,
      0
    );
    const financingCashFlow = cashFlowData.financing.reduce(
      (sum, item) => sum + item.amount,
      0
    );
    const netCashFlow = operatingCashFlow + investingCashFlow + financingCashFlow;

    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Activity</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Operating Activities
                </Typography>
              </TableCell>
            </TableRow>
            {cashFlowData.operating.map((item) => (
              <TableRow key={item.activity}>
                <TableCell>{item.activity}</TableCell>
                <TableCell align="right">{formatCurrency(item.amount)}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Net Cash from Operating Activities
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {formatCurrency(operatingCashFlow)}
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Investing Activities
                </Typography>
              </TableCell>
            </TableRow>
            {cashFlowData.investing.map((item) => (
              <TableRow key={item.activity}>
                <TableCell>{item.activity}</TableCell>
                <TableCell align="right">{formatCurrency(item.amount)}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Net Cash from Investing Activities
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {formatCurrency(investingCashFlow)}
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Financing Activities
                </Typography>
              </TableCell>
            </TableRow>
            {cashFlowData.financing.map((item) => (
              <TableRow key={item.activity}>
                <TableCell>{item.activity}</TableCell>
                <TableCell align="right">{formatCurrency(item.amount)}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Net Cash from Financing Activities
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {formatCurrency(financingCashFlow)}
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Net Increase in Cash
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {formatCurrency(netCashFlow)}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Box sx={{ p: 3, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" component="h1">
          Financial Statements
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
          >
            Download
          </Button>
          <Button
            variant="outlined"
            startIcon={<PrintIcon />}
          >
            Print
          </Button>
        </Box>
      </Box>

      <Paper sx={{ width: "100%", flex: 1 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Income Statement" />
          <Tab label="Balance Sheet" />
          <Tab label="Cash Flow Statement" />
        </Tabs>

        <TabPanel value={value} index={0}>
          {renderIncomeStatement()}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {renderBalanceSheet()}
        </TabPanel>
        <TabPanel value={value} index={2}>
          {renderCashFlowStatement()}
        </TabPanel>
      </Paper>

      <Box 
        sx={{ 
          mt: 4, 
          py: 2, 
          textAlign: "center",
          borderTop: "1px solid",
          borderColor: "divider"
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Designed and developed by nodes theme, all rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default FinancialStatements; 