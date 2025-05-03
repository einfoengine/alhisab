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
  IconButton,
  Chip,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import Link from "next/link";

interface LedgerEntry {
  id: string;
  date: string;
  account: string;
  description: string;
  debit: number;
  credit: number;
  balance: number;
  status: "posted" | "pending" | "reversed";
}

const LedgerList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  // Sample data - replace with actual API call
  const entries: LedgerEntry[] = [
    {
      id: "1",
      date: "2024-03-15",
      account: "Cash Account",
      description: "Office Supplies Purchase",
      debit: 150.00,
      credit: 0,
      balance: 150.00,
      status: "posted",
    },
    {
      id: "2",
      date: "2024-03-14",
      account: "Accounts Receivable",
      description: "Client Payment Received",
      debit: 0,
      credit: 2500.00,
      balance: -2500.00,
      status: "posted",
    },
    {
      id: "3",
      date: "2024-03-13",
      account: "Rent Expense",
      description: "Monthly Rent Payment",
      debit: 1200.00,
      credit: 0,
      balance: 1200.00,
      status: "pending",
    },
    {
      id: "4",
      date: "2024-03-12",
      account: "Service Revenue",
      description: "Project Completion Payment",
      debit: 0,
      credit: 5000.00,
      balance: -5000.00,
      status: "posted",
    },
    {
      id: "5",
      date: "2024-03-11",
      account: "Equipment",
      description: "New Computer Purchase",
      debit: 2000.00,
      credit: 0,
      balance: 2000.00,
      status: "posted",
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
    switch (status) {
      case "posted":
        return "success";
      case "pending":
        return "warning";
      case "reversed":
        return "error";
      default:
        return "default";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" component="h1">
          General Ledger
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          component={Link}
          href="/dashboard/ledger/new"
        >
          New Entry
        </Button>
      </Box>

      <Paper sx={{ mb: 3 }}>
        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search entries..."
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
                <TableCell>Date</TableCell>
                <TableCell>Account</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="right">Debit</TableCell>
                <TableCell align="right">Credit</TableCell>
                <TableCell align="right">Balance</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {entries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell>{entry.account}</TableCell>
                  <TableCell>{entry.description}</TableCell>
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
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      component={Link}
                      href={`/dashboard/ledger/${entry.id}`}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      component={Link}
                      href={`/dashboard/ledger/${entry.id}/edit`}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
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

export default LedgerList;