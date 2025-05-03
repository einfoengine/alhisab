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

interface LedgerFormData {
  date: string;
  account: string;
  description: string;
  debit: number;
  credit: number;
  status: "posted" | "pending" | "reversed";
}

const NewLedgerEntry = () => {
  const [formData, setFormData] = useState<LedgerFormData>({
    date: new Date().toISOString().split("T")[0],
    account: "",
    description: "",
    debit: 0,
    credit: 0,
    status: "pending",
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
    console.log("Ledger Entry Data:", formData);
    // TODO: Implement API call to save the ledger entry
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" component="h1">
          New Ledger Entry
        </Typography>
      </Box>

      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Basic Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                type="date"
                label="Date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
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

            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                multiline
                rows={3}
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
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
                  <MenuItem value="posted">Posted</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="reversed">Reversed</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                <Button
                  variant="outlined"
                  component={Link}
                  href="/dashboard/ledger"
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

export default NewLedgerEntry; 