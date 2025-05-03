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
  TablePagination,
  Button,
  TextField,
  InputAdornment,
  Chip,
} from "@mui/material";
import {
  Search as SearchIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import Link from "next/link";

interface TrialBalanceEntry {
  id: string;
  account: string;
  accountType: string;
  debit: number;
  credit: number;
  balance: number;
  status: "balanced" | "unbalanced";
}

const TrialBalanceList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  // Sample data - replace with actual API call
  const entries: TrialBalanceEntry[] = [
    {
      id: "1",
      account: "Cash Account",
      accountType: "Asset",
      debit: 5000.00,
      credit: 0,
      balance: 5000.00,
      status: "balanced",
    },
    {
      id: "2",
      account: "Accounts Receivable",
      accountType: "Asset",
      debit: 2500.00,
      credit: 0,
      balance: 2500.00,
      status: "balanced",
    },
    {
      id: "3",
      account: "Equipment",
      accountType: "Asset",
      debit: 2000.00,
      credit: 0,
      balance: 2000.00,
      status: "balanced",
    },
    {
      id: "4",
      account: "Accounts Payable",
      accountType: "Liability",
      debit: 0,
      credit: 1500.00,
      balance: -1500.00,
      status: "balanced",
    },
    {
      id: "5",
      account: "Service Revenue",
      accountType: "Revenue",
      debit: 0,
      credit: 7500.00,
      balance: -7500.00,
      status: "balanced",
    },
    {
      id: "6",
      account: "Rent Expense",
      accountType: "Expense",
      debit: 1200.00,
      credit: 0,
      balance: 1200.00,
      status: "balanced",
    },
    {
      id: "7",
      account: "Office Supplies",
      accountType: "Expense",
      debit: 150.00,
      credit: 0,
      balance: 150.00,
      status: "balanced",
    },
  ];

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStatusColor = (status: string) => {
    return status === "balanced" ? "success" : "error";
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // Calculate totals
  const totalDebit = entries.reduce((sum, entry) => sum + entry.debit, 0);
  const totalCredit = entries.reduce((sum, entry) => sum + entry.credit, 0);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" component="h1">
          Trial Balance
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          component={Link}
          href="/dashboard/trial-balance/new"
        >
          New Entry
        </Button>
      </Box>

      <Paper sx={{ mb: 3 }}>
        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search accounts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Account</TableCell>
                <TableCell>Account Type</TableCell>
                <TableCell align="right">Debit</TableCell>
                <TableCell align="right">Credit</TableCell>
                <TableCell align="right">Balance</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {entries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>{entry.account}</TableCell>
                  <TableCell>{entry.accountType}</TableCell>
                  <TableCell align="right">{formatCurrency(entry.debit)}</TableCell>
                  <TableCell align="right">{formatCurrency(entry.credit)}</TableCell>
                  <TableCell align="right">{formatCurrency(entry.balance)}</TableCell>
                  <TableCell>
                    <Chip
                      label={entry.status}
                      color={getStatusColor(entry.status)}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={2} align="right">
                  <Typography variant="subtitle1">Total</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="subtitle1">{formatCurrency(totalDebit)}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="subtitle1">{formatCurrency(totalCredit)}</Typography>
                </TableCell>
                <TableCell colSpan={2} />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={entries.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default TrialBalanceList;