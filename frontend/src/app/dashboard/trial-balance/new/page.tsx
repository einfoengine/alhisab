"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Divider,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import Link from "next/link";

interface TrialBalanceFormData {
  account: string;
  accountType: string;
  debit: number;
  credit: number;
  status: "balanced" | "unbalanced";
}

const NewTrialBalanceEntry = () => {
  const [formData, setFormData] = useState<TrialBalanceFormData>({
    account: "",
    accountType: "",
    debit: 0,
    credit: 0,
    status: "balanced",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Trial Balance Entry Data:", formData);
    // TODO: Implement API call to save the trial balance entry
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" component="h1">
          New Trial Balance Entry
        </Typography>
      </Box>

      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Account Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Account</InputLabel>
                <Select
                  name="account"
                  value={formData.account}
                  onChange={handleSelectChange}
                  label="Account"
                >
                  <MenuItem value="Cash Account">Cash Account</MenuItem>
                  <MenuItem value="Accounts Receivable">Accounts Receivable</MenuItem>
                  <MenuItem value="Accounts Payable">Accounts Payable</MenuItem>
                  <MenuItem value="Service Revenue">Service Revenue</MenuItem>
                  <MenuItem value="Rent Expense">Rent Expense</MenuItem>
                  <MenuItem value="Equipment">Equipment</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Account Type</InputLabel>
                <Select
                  name="accountType"
                  value={formData.accountType}
                  onChange={handleSelectChange}
                  label="Account Type"
                >
                  <MenuItem value="Asset">Asset</MenuItem>
                  <MenuItem value="Liability">Liability</MenuItem>
                  <MenuItem value="Equity">Equity</MenuItem>
                  <MenuItem value="Revenue">Revenue</MenuItem>
                  <MenuItem value="Expense">Expense</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Financial Details
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Debit Amount"
                name="debit"
                value={formData.debit}
                onChange={handleChange}
                InputProps={{
                  startAdornment: "$",
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Credit Amount"
                name="credit"
                value={formData.credit}
                onChange={handleChange}
                InputProps={{
                  startAdornment: "$",
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={formData.status}
                  onChange={handleSelectChange}
                  label="Status"
                >
                  <MenuItem value="balanced">Balanced</MenuItem>
                  <MenuItem value="unbalanced">Unbalanced</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                <Button
                  variant="outlined"
                  component={Link}
                  href="/dashboard/trial-balance"
                >
                  Cancel
                </Button>
                <Button type="submit" variant="contained">
                  Create Entry
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default NewTrialBalanceEntry; 