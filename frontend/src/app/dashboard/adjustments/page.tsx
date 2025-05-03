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

interface AdjustmentEntry {
  id: string;
  date: string;
  account: string;
  description: string;
  debit: number;
  credit: number;
  type: "accrual" | "deferral" | "depreciation" | "inventory" | "other";
  status: "pending" | "approved" | "rejected";
}

const AdjustmentsList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  // Sample data - replace with actual API call
  const entries: AdjustmentEntry[] = [
    {
      id: "1",
      date: "2024-03-15",
      account: "Prepaid Rent",
      description: "Monthly rent adjustment",
      debit: 0,
      credit: 1000.00,
      type: "deferral",
      status: "approved",
    },
    {
      id: "2",
      date: "2024-03-14",
      account: "Accrued Revenue",
      description: "Unbilled services for March",
      debit: 1500.00,
      credit: 0,
      type: "accrual",
      status: "approved",
    },
    {
      id: "3",
      date: "2024-03-13",
      account: "Depreciation Expense",
      description: "Monthly equipment depreciation",
      debit: 200.00,
      credit: 0,
      type: "depreciation",
      status: "pending",
    },
    {
      id: "4",
      date: "2024-03-12",
      account: "Inventory",
      description: "Year-end inventory adjustment",
      debit: 0,
      credit: 500.00,
      type: "inventory",
      status: "approved",
    },
    {
      id: "5",
      date: "2024-03-11",
      account: "Bad Debt Expense",
      description: "Allowance for doubtful accounts",
      debit: 300.00,
      credit: 0,
      type: "other",
      status: "approved",
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
      case "approved":
        return "success";
      case "pending":
        return "warning";
      case "rejected":
        return "error";
      default:
        return "default";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "accrual":
        return "primary";
      case "deferral":
        return "secondary";
      case "depreciation":
        return "info";
      case "inventory":
        return "warning";
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
          Adjustment Entries
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          component={Link}
          href="/dashboard/adjustments/new"
        >
          New Adjustment
        </Button>
      </Box>

      <Paper sx={{ mb: 3 }}>
        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search adjustments..."
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
                <TableCell>Type</TableCell>
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
                  <TableCell>
                    <Chip
                      label={entry.type}
                      color={getTypeColor(entry.type)}
                      size="small"
                    />
                  </TableCell>
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
                      href={`/dashboard/adjustments/${entry.id}`}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      component={Link}
                      href={`/dashboard/adjustments/${entry.id}/edit`}
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

export default AdjustmentsList; 